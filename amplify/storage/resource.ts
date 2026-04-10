import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'carpeDiemAssets',
  access: (allow) => ({
    'attachments/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  }),
});
