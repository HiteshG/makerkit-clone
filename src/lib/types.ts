export type WithId<T> = T & { id: string };

type UserId = string;

export enum MemeberShipRole {
  owner = 0,
  admin = 1,
  member = 2,
}

export interface Organization {
  name: string;
  timezone?: string;
  logoURL?: string | null;
  subscription?: OrganizationSubscription;
  customerId?: string;

  members: Record<
    UserId,
    {
      role: MemeberShipRole;
      user: Reference;
    }
  >;
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
