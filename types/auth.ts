export interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
};
