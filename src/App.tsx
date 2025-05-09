import { Authenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from "../amplify_outputs.json";

const client = generateClient<Schema>();
/*
function handleSignInNextSteps(output: SignInOutput) {
  const { nextStep } = output;
  switch (nextStep.signInStep) {
    case "CONTINUE_SIGN_IN_WITH_MFA_SELECTION":
      const allowedMFATypes = nextStep.allowedMFATypes;
      const mfaType = promptUserForMFAType(allowedMFATypes);
    case "CONFIRM_SIGN_IN_WITH_SMS_CODE":
      break;
    case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
      break;
  }
}

type MfaType = "SMS" | "TOTP" | "EMAIL";

function promptUserForMFAType(allowedMFATypes?: MfaType[]): MfaType {
  return new MfaType();
}

async function handleMFASelection(mfaType: MfaType) {
  try {
    const output = await confirmSignIn({
      challengeResponse: mfaType,
    });
    handleSignInNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements
}
*/
Amplify.configure(outputs);

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  //const { user, signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li
                onClick={() => deleteTodo(todo.id)}
                key={todo.id}
              >{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
