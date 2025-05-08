import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from "./post-confirmation/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    /*externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ["profile"],
        attributeMapping: {
          email: "email",
        }
      },
      callbackUrls: [
        'http://https://main.d2sb99nh81v1rc.amplifyapp.com/profile',
      ],
      logoutUrls: ['https://main.d2sb99nh81v1rc.amplifyapp.com/'],
    },*/
  },
  groups: ["ADMINS", "EDITORS"],
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
  ],
  multifactor: {
    mode: "OPTIONAL",
    totp: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
    birthdate: {
      mutable: true,
      required: false,
    },
    phoneNumber: {
      mutable: true,
      required: false,
    },
    website: {
      mutable: true,
      required: false,
    },
    "custom:display_name": {
      dataType: "String",
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },
    "custom:favorite_number": {
      dataType: "Number",
      mutable: true,
      min: 1,
      max: 100,
    },
    "custom:is_beta_user": {
      dataType: "Boolean",
      mutable: true,
    },
    "custom:started_free_trial": {
      dataType: "DateTime",
      mutable: true,
    },
  }
});
