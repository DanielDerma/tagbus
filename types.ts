import type { UserInfo as User } from "firebase/auth";

type UserInfoType = {
  email: string;
  name: string;
  role: string;
  route: string;
};

type AuthContextValueType = {
  currentUser: User | null | undefined;
  infoUser: UserInfoType | null | undefined;
  isAuthenticated: boolean;
  company: string | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export type { UserInfoType, AuthContextValueType };
