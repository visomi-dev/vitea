import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { generate } from 'generate-password';

type CreateUserParams = {
  userPoolId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  emailVerified: boolean;
};

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

const COGNITO_PROVIDER_NAME = 'Cognito';
const COGNITO_PROVIDER_SUBJECT_NAME = 'Cognito';

/**
 * Create a new user, and update password permanent
 * @param params
 */
export async function createUser({
  userPoolId,
  name,
  email,
  phoneNumber,
  emailVerified,
  password = generate({
    length: 10,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  }),
}: CreateUserParams): Promise<CognitoIdentityServiceProvider.UserType> {
  if (!email && !phoneNumber) {
    throw new Error('email or phoneNumber is required for create a user');
  }

  const userAttributes = [];

  if (name) {
    userAttributes.push({ Name: 'name', Value: name });
  }

  if (email) {
    userAttributes.push({ Name: 'email', Value: email });
  }

  if (phoneNumber) {
    userAttributes.push({ Name: 'phone_number', Value: phoneNumber });
  }

  if (emailVerified) {
    userAttributes.push({
      Name: 'email_verified',
      Value: JSON.stringify(emailVerified),
    });
  }

  const { User: user } = await cognitoIdentityServiceProvider
    .adminCreateUser({
      UserPoolId: userPoolId,
      Username: email || phoneNumber,
      UserAttributes: userAttributes,
      MessageAction: 'SUPPRESS',
    } as CognitoIdentityServiceProvider.AdminCreateUserRequest)
    .promise();

  await cognitoIdentityServiceProvider
    .adminSetUserPassword({
      UserPoolId: userPoolId,
      Username: user!.Username,
      Permanent: true,
      Password: password,
    } as CognitoIdentityServiceProvider.AdminSetUserPasswordRequest)
    .promise();

  return user as CognitoIdentityServiceProvider.UserType;
}

/**
 * Find a cognito user by email
 * @param email the param to search
 * @param userPoolId cognito user pool
 * @returns
 */
export async function findUsersByEmail(
  emailOrPhone: string,
  userPoolId: string,
) {
  const { Users: usersMatch = [] } = await cognitoIdentityServiceProvider
    .listUsers({
      UserPoolId: userPoolId,
      Filter: `email = ${emailOrPhone}`,
    })
    .promise();

  return usersMatch;
}

/**
 * Link already exists user to new federated user
 * @param username already registered user
 * @param federatedUsername the new federated user
 * @param userPoolId cognito user pool id
 * @returns
 */
export async function linkFederatedUser(
  username: string,
  federatedUsername: string,
  userPoolId: string,
) {
  const [provider, providerUsername] = federatedUsername.split('_');

  const { $response: response } = await cognitoIdentityServiceProvider
    .adminLinkProviderForUser({
      UserPoolId: userPoolId,
      DestinationUser: {
        ProviderAttributeValue: username,
        ProviderName: COGNITO_PROVIDER_NAME,
      },
      SourceUser: {
        ProviderAttributeName: COGNITO_PROVIDER_SUBJECT_NAME,
        ProviderName: provider,
        ProviderAttributeValue: providerUsername,
      },
    })
    .promise();

  return response;
}
