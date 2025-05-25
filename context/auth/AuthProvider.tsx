/* eslint-disable react-hooks/exhaustive-deps */
import { authorizedAPI } from "@/config/axios.config";
import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const toast = useToast();
  const [loggingIn, setLoggingIn] = useState(false);
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
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;
        const { data } = await authorizedAPI.get("/users/me");
        setUser(data.user);
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
