import { Loader2 } from "lucide-react-native";
import { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type ButtonProps = {
  title: string;
  textStyle?: string;
  isLoading?:boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, textStyle,isLoading, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${touchableProps.className} flex-row justify-center items-center`}
      >
        {isLoading && <Loader2 className="animate-spin mr-2" color={"#FFF"} />}
        <Text className={`${styles.buttonText} font-senMedium ${textStyle}`}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: "items-center bg-[#FF7622] rounded-[28px] shadow-md p-4",
  buttonText: "text-white text-lg font-semibold text-center",
};
