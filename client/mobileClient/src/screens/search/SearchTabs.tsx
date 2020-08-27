import React from "react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  readonly tabIndex: number;
  readonly onPress: (index: number) => void;
}

const SearchTabs: React.FC<Props> = (props) => {
  return (
    <View style={{ width: "100%", elevation: 5 }}>
      <ButtonGroup
        buttons={[
          {
            element: () => {
              return (
                <FontAwesome5 size={22} name={"layer-group"}></FontAwesome5>
              );
            },
          },
          {
            element: () => {
              return <FontAwesome5 size={22} name={"users"}></FontAwesome5>;
            },
          },
          {
            element: () => {
              return (
                <MaterialCommunityIcon
                  size={25}
                  name={"newspaper"}
                ></MaterialCommunityIcon>
              );
            },
          },
        ]}
        selectedIndex={props.tabIndex}
        onPress={props.onPress}
        containerStyle={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
          borderWidth: 0,
          borderRadius: 0,
        }}
        selectedButtonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
    </View>
  );
};

export default SearchTabs;
