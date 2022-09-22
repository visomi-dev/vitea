export type LayoutComponentProps = {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type CognitoUserAttributes = {
  sub: string;
  name: string;
  email: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
