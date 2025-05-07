import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { signIn } from "aws-amplify/auth";
import { signUp } from "aws-amplify/auth";
import { confirmSignUp } from "aws-amplify/auth";
import { confirmSignIn } from "aws-amplify/auth";
import { updateMFAPreference } from "aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "<your-cognito-user-pool-id>",
      userPoolClientId: ,
      identityPoolId: ,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        }
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
});

await signIn({
  username: "john.doe@example.com",
  password: "hunter2",
});

await signUp({
  username: "hello@mycompany.com",
  password: "hunter2",
  options: {
    userAttributes: {
      phone_number: "+15555555555",
      email: "hello@mycompany.com",
    },
  },
});

await confirmSignUp({
  username: "hello@mycompany.com",
  confirmationCode: "123456",
});

await confirmSignIn({
  challengeResponse: "123456",
});

await updateMFAPreference({
  sms: "PREFERRED",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
