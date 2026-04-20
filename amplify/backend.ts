import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
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
    `arn:aws:ses:${region}:${account}:identity/restaurant-carpe-diem.de`,
  ],
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(sesPolicy);
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(sesPolicy);

export { backend };