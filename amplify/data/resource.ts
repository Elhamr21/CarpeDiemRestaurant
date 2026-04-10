import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Reservation: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.string().required(),
      date: a.date().required(),
      time: a.time().required(),
      guests: a.integer().required(),
      specialRequests: a.string(),
      status: a.string().default('pending'),
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.authenticated('identityPool'),
    ]),

  ContactSubmission: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      subject: a.string().required(),
      message: a.string().required(),
      status: a.string().default('new'),
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.authenticated('identityPool'),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
