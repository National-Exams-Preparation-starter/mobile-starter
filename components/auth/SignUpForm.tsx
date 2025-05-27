import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormInput from "../common/Input";
import useValidate, { ValidationRules } from "@/hooks/useValidate";
import { Button } from "../common/Button";
import { useRegister } from "@/hooks/useAuth";
import { useToast } from "react-native-toast-notifications";

interface IRegisterForm {
  className?: string;
}

const RegisterForm = ({ className }: IRegisterForm) => {
  const navigate = useRouter();
  const { validate } = useValidate();
  const registerMutation = useRegister();
  const toast = useToast();

  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const validationSchema: ValidationRules = {
    firstname: {
      type: "string" as const,
      required: true,
      minLength: 3,
      message: "Firstname must be at least 3 characters",
    },
    lastname: {
      type: "string" as const,
      required: true,
      minLength: 3,
      message: "Lastname must be at least 3 characters",
    },
    email: {
      type: "email" as const,
      required: true,
      message: "Please enter a valid email address",
    },
    password: {
      type: "string" as const,
      required: true,
      minLength: 6,
      message: "Password must be at least 6 characters",
    },
  };

  const validateField = (name: string, value: string) => {
    const fieldSchema = { [name]: validationSchema[name] };
    const fieldData = { [name]: value };
    const { errors } = validate(fieldData, fieldSchema);
    setError((prev) => ({
      ...prev,
      [name]: errors[name] || "",
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleRegister = () => {
    const { isValid, errors } = validate(formData, validationSchema);
    setError({
      firstname: errors.firstname || "",
      lastname: errors.lastname || "",
      email: errors.email || "",
      password: errors.password || "",
    });

    if (isValid) {
      registerMutation.mutate(
        {
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          password: formData.password,
        },
        {
          onSuccess: (response) => {
            if (response?.success) {
              toast.show(response.message, { type: "success" });
              navigate.push("/(auth)/login");
            } else {
              toast.show(response?.message, { type: "danger" });
            }
          },
          onError: (error) => {
            toast.show(error.message || "Something went wrong", {
              type: "danger",
            });
          },
        }
      );
    }
  };

  return (
    <View className={`${className} flex flex-col gap-4`}>
      <FormInput
        label="Firstname"
        placeholder="Firstname"
        value={formData.firstname}
        onChangeText={(text) => handleInputChange("firstname", text)}
        errorMessage={error.firstname}
      />
      <FormInput
        label="Lastname"
        placeholder="Lastname"
        value={formData.lastname}
        onChangeText={(text) => handleInputChange("lastname", text)}
        errorMessage={error.lastname}
      />
      <FormInput
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        errorMessage={error.email}
      />
      <FormInput
        label="Password"
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
        isPassword
        errorMessage={error.password}
      />
      <View className="py-3">
        <Button
          title="Register"
          onPress={handleRegister}
          isLoading={registerMutation.isPending}
        />
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-base text-center font-senRegular">
          Already have an account?{"  "}
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

export default RegisterForm;
