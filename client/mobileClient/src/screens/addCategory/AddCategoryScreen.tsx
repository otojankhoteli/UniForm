import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import CustomInput from "./CustomInput";
import { ButtonGroup } from "react-native-elements";
import FloatingButton from "../../shared/components/FloatingButton";
import PictureInput from "./PictureInput";

const AddCategoryScreen: React.FC = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryPhotoUri, setNewCategoryPhotoUri] = useState("");

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (newCategoryDescription.length !== 0 && newCategoryName.length !== 0) {
      if (!canSubmit) setCanSubmit(true);
    } else {
      if (canSubmit) setCanSubmit(false);
    }
  }, [newCategoryName, newCategoryDescription]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
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
        <PictureInput
          photoUri={newCategoryPhotoUri}
          onPhotoChosen={(uri) => setNewCategoryPhotoUri(uri)}
        />
      </ScrollView>
      <FloatingButton
        onPress={() => {
          alert("added new category"); //TODO add category
        }}
        color={"rgb(50,255,100)"}
        type={"confirm"}
        disabled={!canSubmit}
      />
    </View>
  );
};

export default AddCategoryScreen;
