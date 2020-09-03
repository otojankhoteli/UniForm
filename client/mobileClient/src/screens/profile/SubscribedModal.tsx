import React, { useMemo } from "react";
import { useSubscribedCategories } from "../../api/categories/CategoriesApiHook";
import {
  TouchableOpacity,
  Dimensions,
  View,
  FlatList,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../shared/navigation/ProfileStackScreen";
import CategoryListItem from "../search/categories/CategoryListItem";

interface Props {
  readonly userId: string;
  readonly visible: boolean;
  readonly setVisible: (visible: boolean) => void;
}

const SubscribedModal: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<ProfileStackParamList, "Profile">
  >();

  const { result: categories } = useSubscribedCategories(props.userId);

  const dimensions = useMemo(() => {
    return Dimensions.get("window");
  }, []);

  if (!props.visible) return null;

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        height: dimensions.height,
        width: dimensions.width,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}
      activeOpacity={1}
      onPress={() => props.setVisible(false)}
    >
      <FlatList
        style={{ flex: 1, backgroundColor: "white", borderRadius: 5 }}
        ListHeaderComponent={
          <View
            style={{
              height: 50,
              elevation: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Subscribed</Text>
          </View>
        }
        keyExtractor={(_, index) => index.toString()}
        data={categories}
        renderItem={(item) => {
          return (
            <CategoryListItem categoryData={item.item} onSubscribe={() => {}} />
          );
        }}
      ></FlatList>
    </TouchableOpacity>
  );
};

export default SubscribedModal;
