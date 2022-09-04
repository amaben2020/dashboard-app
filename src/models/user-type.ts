export type Subscription = {
  name: string;
  price: number;
  currency: string;
  proposalsLeft: number;
  templatesLeft: number;
  invitesLeft: number;
  adsLeft: number;
  hasAnalytics: boolean;
  hasEmailAlerts: boolean;
};
export type UserType = {
  id: string;
  email: string;
  password: string;
  country: string;
  isPublic: boolean;
  phone: string;
  role: string;
  state: string;
  tier: string;
  name: string;
  avatar: string;
  city: string;
  canHire: boolean;
  subscription?: Subscription;
};

// Users: This is for editing or updating the password of a user. We will allow the user to update or edit their password.
// UsersDb: This is for storing the details of the UserType and the subscription type in our models folder. Ideally, this should be put in a separate database, just like in the real world when we separate the database for the users’ authentication from the users’ profile or subscription.
