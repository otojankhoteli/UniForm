import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView } from "react-native";
import CustomInput from "./CustomInput";
import { ButtonGroup } from "react-native-elements";
import FloatingButton from "../../shared/components/FloatingButton";
import PictureInput from "./PictureInput";
import { useCreateCategory } from "../../api/categories/CategoriesApiHook";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../../shared/navigation/SearchStackScreen";

const AddCategoryScreen: React.FC = () => {
  const [{ account }, dispatch] = useGlobalState();
  const route = useRoute<RouteProp<SearchStackParamList, "AddCategory">>();
  const navigation = useNavigation<
    StackNavigationProp<SearchStackParamList, "AddCategory">
  >();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryPhotoUri, setNewCategoryPhotoUri] = useState("");

  const [canSubmit, setCanSubmit] = useState(false);

  const {
    post: submit,
    result,
    error,
    isError,
    isLoading,
  } = useCreateCategory();

  useEffect(() => {
    if (result && !isError) {
      navigation.navigate("Search");
    }
  }, [result, isError])

  useEffect(() => {
    if (newCategoryDescription.length !== 0 && newCategoryName.length !== 0) {
      if (!canSubmit) setCanSubmit(true);
    } else {
      if (canSubmit) setCanSubmit(false);
    }
  }, [newCategoryName, newCategoryDescription]);

  const onSubmit = useCallback(() => {
    if (canSubmit) {
      submit({
        author: account.user,
        description: newCategoryDescription,
        name: newCategoryName,
        id: "",
        isVerified: account.user.role == "academicAuthority",
        memberCount: 0,
        imgUrl: newCategoryPhotoUri,
        postCount: 0,
        isSubscribed: false,
      });
    }
  }, [canSubmit, newCategoryName, newCategoryDescription, newCategoryPhotoUri]);

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
        onPress={onSubmit}
        color={"rgb(50,255,100)"}
        type={"confirm"}
        disabled={!canSubmit}
        loading={isLoading}
      />
    </View>
  );
};

export default AddCategoryScreen;
