import { apiClient } from "@/config/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
  try {
    // Fetch the user with the given email
    const response = await apiClient.get(
      `/users?username=${encodeURIComponent(email)}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const users = response.data;

    // Check if user with that email exists
    if (users.length === 0) {
      return {
        success: false,
        message: "invalid email or password",
        user: null,
      };
    }

    const user = users[0];

    // Compare the password
    if (user.password === password) {
      return {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          createdAt: user.createdAt,
        },
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password",
        user: null,
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong", user: null };
  }
};

export const getUserInfo = async () => {
  try {
    const email = await AsyncStorage.getItem("username");
    if (!email) {
      return null;
    }
    const response = await apiClient.get(
      `/users?username=${encodeURIComponent(email)}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const users = response.data;

    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    return {
      id: user.id,
      email: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    await apiClient.post(`/users`, {
      username: email,
      password,
      firstname: firstName,
      lastname: lastName,
    });

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};
