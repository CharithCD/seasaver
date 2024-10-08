import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

interface TextFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}) => {
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-base text-gray-900">{title}</Text>
      <View className="w-full h-12 px-4 rounded-md border-2 border-[#c5c6cc] focus:border-blue-300 flex flex-row items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default TextField;
