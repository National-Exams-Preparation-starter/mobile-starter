import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useValidate, { ValidationRules } from "@/hooks/useValidate";
import FormInput from "./Input";
import { Button } from "./Button";
import { Platform } from "react-native";

const AddContainer = () => {
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const navigate = useRouter();
  const { validate } = useValidate();
  const [error, setError] = useState({
    name: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const validationSchema: ValidationRules = {
    name: {
      type: "string" as const,
      required: true,
      minLength: 3,
      message: "name must be at least 3 characters",
    },
    description: {
      type: "string" as const,
      required: true,
      maxLength: 50,
      message: "Description must be at most 50 characters",
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const uriParts = result.assets[0].uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const imageDetails = {
        uri: result.assets[0].uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
      console.log(imageDetails);

      setImage(imageDetails);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View className="flex-row items-center">
          <Text className="text-lg font-senMedium font-medium">Add New</Text>
        </View>
        
        {/* main content */}
        <View className="gap-2">
          <View className="py-2">
            {image ? (
              <View className="h-[250px] border relative rounded-xl overflow-hidden">
                <Image
                  source={{ uri: image.uri }}
                  className="h-full w-full"
                  alt="postimage"
                />
                <TouchableOpacity
                  className="absolute top-0 right-0 p-4 m-1 rounded-full bg-primary"
                  onPress={() => setImage(null)}
                >
                  <AntDesign name="delete" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="h-[250px] border rounded-xl overflow-hidden items-center justify-center">
                <TouchableOpacity
                  className="p-4 rounded-full"
                  onPress={pickImage}
                >
                  <AntDesign name="plus" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="text-center text-base font-senRegular font-regular">
                  Click here to add image
                </Text>
              </View>
            )}
          </View>
          <View>
            <FormInput
              label="NAME LABEL"
              placeholder="name here"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              errorMessage={error.name}
            />
            <FormInput
              label="Description"
              placeholder="Description here"
              multiline
              numberOfLines={6}
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              errorMessage={error.description}
            />
          </View>
          <View className="py-3">
            <Button title="Add Something" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
