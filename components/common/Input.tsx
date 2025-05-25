import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export interface IFormInput extends React.ComponentProps<typeof TextInput> {
  isPassword?: boolean;
  errorMessage?: string;
  label?: string;
}

const FormInput = ({
  isPassword,
  errorMessage,
  label,
  className = "",
  ...props
}: IFormInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full">
      {/* Input Container */}
      {label && (
        <Text className="uppercase text-[#32343E] font-senRegular font-normal my-1">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center h-16 bg-gray-50 rounded-xl border border-gray-200 ${className}`}
      >
        <TextInput
          {...props}
          className="flex-1 px-4  text-base"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="px-4"
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message Display */}
      {errorMessage && (
        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default FormInput;
