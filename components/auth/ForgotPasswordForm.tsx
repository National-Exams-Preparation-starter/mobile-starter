import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import useValidate, { ValidationRules } from "@/hooks/useValidate";
import { Button } from "../common/Button";
import FormInput from "../common/Input";


const ForgotPasswordForm = () => {
  const navigate = useRouter();
  const { validate } = useValidate();
  const [formData, setFormData] = useState({
    email: ""
  });
  const [error, setError] = useState({
    email: "",
  });

  const validationSchema: ValidationRules = {
    email: {
      type: "email",
      required: true,
      message: "Email is required",
    }
  };

  const handleForgot = () => {
    const { isValid, errors } = validate(formData, validationSchema);
    setError({
      email: errors.email || ""
    });

    if (isValid) {
      console.log("Form is valid:", formData);
      navigate.push("/(auth)/reset-password");
    }
  };

  return (
    <View className={`flex flex-col gap-4`}>
      <FormInput
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        errorMessage={error.email}
      />
      <View className="py-3">
        <Button title="Send Code" onPress={handleForgot} />
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-base text-center font-senRegular">
          Return to{"  "}
        </Text>
        <TouchableOpacity onPress={() => navigate.push("/(auth)/login")}>
        <Text className="text-base text-center font-senRegular uppercase text-primary">
            Login
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordForm;
