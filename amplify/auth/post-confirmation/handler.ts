import type { PostConfirmationTriggerHandler } from "aws-lambda";
import {
    CognitoIdentityProviderClient,
    AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "$amplify/env/post-confirmation";
import { type Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';

const client = new CognitoIdentityProviderClient();

//const client = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
    const command = new AdminAddUserToGroupCommand({
        GroupName: env.GROUP_NAME,
        Username: event.userName,
        UserPoolId: event.userPoolId,
    });
    const response = await client.send(command);
    console.log("processed", response.$metadata.requestId);

    /*await client.models.UserProfile.create({
        email: event.request.userAttributes.email,
        profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
    });*/

    return event;
};

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(
    env
);

Amplify.configure(resourceConfig, libraryOptions);