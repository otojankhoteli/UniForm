import React, { useState, useRef } from "react";
import { View, TextInput, ScrollView, StatusBar } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import CategoryList from "./categories/CategoryList";
import UserList from "./users/UserList";
import PostSearchList from "./posts/PostList";
import ViewPager from "@react-native-community/viewpager";
import SearchTabs from "./SearchTabs";

const SearchScreen: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 24,
      }}
    >
      <View
        style={{
          height: 50,
          margin: 10,
          borderWidth: 0.5,
          borderColor: "black",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <FeatherIcon name={"search"} size={30} />
        <TextInput
          style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
          placeholder={"Search Categories..."}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
          }}
          onSubmitEditing={() => {
            alert("search for " + inputText);
          }}
        />
      </View>
      <SearchTabs
        tabIndex={tabIndex}
        onPress={(index) => {
          console.log(index);
          setTabIndex(index);
        }}
      />
      <ViewPager
        style={{ flex: 1 }}
        onPageSelected={(e) => {
          setTabIndex(e.nativeEvent.position);
        }}
      >
        <View key="1">
          <CategoryList searchTerm={""} visible={tabIndex == 0} />
        </View>
        <View key={"2"}>
          <UserList searchTerm={""} visible={tabIndex == 1} />
        </View>
        <View key={"3"}>
          <PostSearchList searchTerm={""} visible={tabIndex == 2} />
        </View>
      </ViewPager>
    </View>
  );
};

export default SearchScreen;
