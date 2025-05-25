import { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${touchableProps.className}`}
      >
        <Text className={`${styles.buttonText} font-senMedium`}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = {
  button: "items-center bg-[#FF7622] rounded-[28px] shadow-md p-4",
  buttonText: "text-white text-lg font-semibold text-center",
};
