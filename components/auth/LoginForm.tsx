import { useRouter } from "expo-router";
import { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import useValidate, { ValidationRules } from "@/hooks/useValidate";
import { Button } from "../common/Button";
import FormInput from "../common/Input";

interface ILoginForm {
  className?: string;
}

const LoginForm = ({ className }: ILoginForm) => {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { validate } = useValidate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validationSchema: ValidationRules = {
    email: {
      type: "email",
      required: true,
      message: "Email is required",
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
      message: "Password is required",
    },
  };

  const handleLogin = () => {
    const { isValid, errors } = validate(formData, validationSchema);
    setError({
      email: errors.email || "",
      password: errors.password || "",
    });

    if (isValid) {
      console.log("Form is valid:", formData);
      router.push("/(tabs)");
    }
  };

  return (
    <View className={`${className} flex flex-col gap-4`}>
      <FormInput
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        errorMessage={error.email}
      />
      <FormInput
        label="Password"
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        isPassword
        errorMessage={error.password}
      />
      <View className="flex flex-row items-center justify-between">
        <Text className="text">
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            className="flex flex-row items-center"
          >
            <Switch
              thumbColor="#fff"
              trackColor={{ true: "#FF7622" }}
              value={rememberMe}
              onValueChange={() => setRememberMe(!rememberMe)}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
            <Text className="text-[#7E8A97] font-senRegular">Remember Me</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity onPress={()=>router.push("/(auth)/forgot-password")}>
          <Text className="font-normal font-senRegular text-primary">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View className="py-3">
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-base text-center font-senRegular">
          Don't have an account?{"  "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text className="text-base text-center font-senRegular uppercase text-primary">
            Sign up
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
