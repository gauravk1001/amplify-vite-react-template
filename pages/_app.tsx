import type { AppProps } from "next/app";
import { Authenticator, useTheme } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import React from "react";

Amplify.configure(outputs);

/*const components = {
    Header() {
        const { tokens } = useTheme();
    

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                alt="Amplify logo"
                src="https://docs.amplify.aws/assets/logo-dark.svg"
                />
            </View>
        );
    },
    Footer() {

    },
};*/

export default function App({ Component, pageProps}: AppProps) {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <h1>Hello {user?.username}</h1>
                    <button onClick={signOut}>Sign Out</button>
                    <Component {...pageProps} />
                </main>
            )}
        </Authenticator>
    );
};