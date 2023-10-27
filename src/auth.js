import awsExports from './aws-exports';
import { Auth, API } from 'aws-amplify';

// Import your GraphQL createUser mutation
import { createUser } from './graphql/mutations';

// Configure Amplify
Auth.configure(awsExports);

export const handleSignUp = async () => {
  try {
    // Wait until the user is authenticated
    const user = await Auth.currentAuthenticatedUser();

    // Create a user object to be added to the database
    const input = {
      id: user.attributes.sub, // Use the user's ID as the database ID
      email: user.attributes.email,
    };

    // Call your GraphQL mutation to create the user in the database
    await API.graphql({ query: createUser, variables: { input } });
  } catch (error) {
    console.error('Error adding user to the database:', error);
  }
};

// Listen for the 'auth' event
Auth.currentSession()
  .then(() => {
    // The user is authenticated, call handleSignUp
    handleSignUp();
  })
  .catch(() => {
    // The user is not authenticated
    console.log('User is not authenticated');
  });
