import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { CfnFunctionConfiguration } from 'aws-cdk-lib/aws-appsync';
import { CLOSED_RESERVATION_DATES, CLOSURE_MESSAGE } from './reservation-dates';
import { Stack } from 'aws-cdk-lib';

const backend = defineBackend({
  auth,
  data,
  storage,
});

const stack = Stack.of(backend.data.resources.graphqlApi);
const region = stack.region;
const account = stack.account;

// Grant the authenticated role SES send permissions for the verified domain
const sesPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ['ses:SendEmail', 'ses:SendRawEmail'],
  resources: [
    `arn:aws:ses:${region}:${account}:identity/ristorante-carpediem.de`,
  ],
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(sesPolicy);
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(sesPolicy);

// Validate before the generated mutation pipeline can write to DynamoDB.
const availabilitySource = backend.data.resources.graphqlApi.addNoneDataSource('ReservationAvailability');
const availabilityCheck = new CfnFunctionConfiguration(stack, 'ReservationAvailabilityCheck', {
  apiId: backend.data.resources.graphqlApi.apiId,
  name: 'ReservationAvailabilityCheck',
  dataSourceName: availabilitySource.name,
  functionVersion: '2018-05-29',
  requestMappingTemplate: `#set($closedDates = ${JSON.stringify(CLOSED_RESERVATION_DATES)})
#if($closedDates.contains($ctx.args.input.date))
  $util.error(${JSON.stringify(CLOSURE_MESSAGE)}, "ReservationDateClosed")
#end
{"version":"2018-05-29","payload":{}}`,
  responseMappingTemplate: '$util.toJson($ctx.prev.result)',
});
availabilityCheck.addDependency(availabilitySource.ds);
for (const fieldName of ['createReservation', 'updateReservation']) {
  const resolver = Object.values(backend.data.resources.cfnResources.cfnResolvers)
    .find((item) => item.typeName === 'Mutation' && item.fieldName === fieldName);
  if (!resolver) throw new Error(`Missing reservation resolver: ${fieldName}`);
  const pipeline = resolver.pipelineConfig as { functions: string[] };
  resolver.pipelineConfig = { functions: [availabilityCheck.attrFunctionId, ...pipeline.functions] };
}

export { backend };
