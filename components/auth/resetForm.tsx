import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import useValidate, { ValidationRules } from "@/hooks/useValidate";
import { useToast } from "react-native-toast-notifications";
import { Button } from "../common/Button";
import FormInput from "../common/Input";

const ResetForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { validate } = useValidate();
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema: ValidationRules = {
    code: {
      type: "email",
      required: true,
      message: "code is required",
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
      message: "new password is required",
    },
    confirmPassword: {
      type: "string",
      required: true,
      minLength: 6,
      message: "confirm your password",
    },
  };

  const handleReset = () => {
    const { isValid, errors } = validate(formData, validationSchema);
    setError({
      code: errors.code || "",
      password: errors.password || "",
      confirmPassword: errors.confirmPassword || "",
    });

    if (formData.password !== formData.confirmPassword) {
      return toast.show("please password must match confirm password", {
        type: "danger",
      });
    }

    if (isValid) {
      console.log("Form is valid:", formData);
      router.push("/(auth)/login");
    }
  };

  return (
    <View className={`flex flex-col gap-4`}>
      <FormInput
        label="Code"
        placeholder="Code"
        value={formData.code}
        onChangeText={(text) => setFormData({ ...formData, code: text })}
        errorMessage={error.code}
      />
      <FormInput
        label="New Password"
        placeholder="new Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        isPassword
        errorMessage={error.password}
      />
      <FormInput
        label="Confirm Password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        secureTextEntry
        isPassword
        errorMessage={error.confirmPassword}
      />
      <View className="py-3">
        <Button title="Reset Password" onPress={handleReset} />
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-base text-center font-senRegular">
          Return to{"  "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-base text-center font-senRegular uppercase text-primary">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetForm;
