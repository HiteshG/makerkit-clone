export type WithId<T> = T & { id: string };

export interface Organization {
  name: string;
  owner: string;
}

export interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

export interface Task {
  name: string;
  description: string;
  organizationId: string;
  dueDate: string;
  done: boolean;
}

export interface PageProps {
  session?: Maybe<AuthUser>;
  user?: Maybe<UserData>;
  organization?: Maybe<WithId<Organization>>;
  csrfToken?: string;
  // ui?: UIState;
}
