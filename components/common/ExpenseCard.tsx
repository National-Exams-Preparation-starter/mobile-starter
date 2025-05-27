// components/ExpenseCard.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";

type ExpenseCardProps = {
  id: string;
  name: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  onDelete?: () => void;
};

const ExpenseCard = ({
  id,
  category,
  amount,
  description,
  date,
  onDelete,
}: ExpenseCardProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(tabs)/home/${id}`)}
      className="bg-white rounded-2xl px-4 py-3 mx-4 mb-4 shadow shadow-black/5 border border-gray-200"
    >
      {/* Header row */}
      <View className="flex-row justify-between items-center mb-1">
        <View className="flex-row items-center space-x-2">
          <View className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2" />
          <Text className="text-sm font-semibold text-black">{category}</Text>
        </View>
        <Text className="text-base font-bold text-black">{amount} frw</Text>
      </View>

      {/* Description */}
      <Text className="text-sm text-gray-500 mb-1">{description}</Text>

      {/* Footer row */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xs text-gray-400">
          {new Date(date).toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseCard;
