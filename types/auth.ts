export interface User {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
};
