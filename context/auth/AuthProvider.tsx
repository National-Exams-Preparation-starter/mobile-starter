/* eslint-disable react-hooks/exhaustive-deps */
import { getUserInfo } from "@/services/auth.service";
import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        if (!username) return;
        const response = await getUserInfo();
        setUser(response);

      } catch (error) {
        setUser(null);
        if (!["/", "/login", "/signup"].includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [pathname, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
