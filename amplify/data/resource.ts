import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== SCHEMA DEL FESTIVAL ====================================================
Define la tabla Event para gestionar las actuaciones del festival en tiempo real.
Permite acceso público/invitado para visualizar y operar según se configure.
===========================================================================*/
const schema = a.schema({
  Event: a
    .model({
      artist: a.string().required(),
      space: a.string().required(),
      time: a.string().required(),
      status: a.enum(['CONFIRMED', 'DELAYED', 'CANCELLED']),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
