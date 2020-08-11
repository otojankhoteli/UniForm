import React, { useState } from "react";
import { View } from "react-native";
import CustomInput from "./CustomInput";
import { ButtonGroup } from "react-native-elements";
import FloatingButton from "../../shared/components/FloatingButton";

const AddCategoryScreen: React.FC = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryPrivacyIndex, setNewCategoryPrivacyIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <CustomInput
        text={"New Category Name"}
        placeholder={"Category Name..."}
        value={newCategoryName}
        onChangeText={(text) => {
          setNewCategoryName(text);
        }}
        multiline={false}
      />
      <CustomInput
        text={"New Category Description"}
        placeholder={"Category Description..."}
        value={newCategoryDescription}
        onChangeText={(text) => {
          setNewCategoryDescription(text);
        }}
        multiline={true}
        characterLimit={200}
      />
      <ButtonGroup
        buttons={["Public", "Private"]}
        selectedIndex={newCategoryPrivacyIndex}
        onPress={(selectedIndex) => {
          setNewCategoryPrivacyIndex(selectedIndex);
        }}
      />
      <FloatingButton
        onPress={() => {
          alert("added new category");
        }}
        color={"rgb(50,255,100)"}
        type={"confirm"}
      />
    </View>
  );
};

export default AddCategoryScreen;
