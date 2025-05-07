import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from "./post-confirmation/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    //phone: true,
  },
  groups: ["EVERYONE"],
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
  ],
  userAttributes: {
    address: {
      mutable: true,
      required: true,
    },
    birthdate: {
      mutable: true,
      required: false,
    },
    email: {
      mutable: true,
      required: true,
    },
    familyName: {
      mutable: true,
      required: false,
    },
    gender: {
      mutable: true,
      required: false,
    },
    givenName: {
      mutable: true,
      required: false,
    },
    locale: {
      mutable: true,
      required: false,
    },
    middleName: {
      mutable: true,
      required: false,
    },
    fullname: {
      mutable: true,
      required: false,
    },
    nickname: {
      mutable: true,
      required: false,
    },
    phoneNumber: {
      mutable: true,
      required: false,
    },
    profilePicture: {
      mutable: true,
      required: false,
    },
    preferredUsername: {
      mutable: true,
      required: false,
    },
    profilePage: {
      mutable: true,
      required: false,
    },
    timezone: {
      mutable: true,
      required: false,
    },
    lastUpdateTime: {
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
      max: 100,
      min: 1,
    },
    "custom:is_beta_user": {
      dataType: "Boolean",
      mutable: true,
    },
    "custom:started_free_trial": {
      dataType: "DateTime",
      mutable: true,
    },
  },
});
