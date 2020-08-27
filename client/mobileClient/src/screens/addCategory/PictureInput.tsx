import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

interface Props {
  readonly photoUri: string;
  readonly onPhotoChosen: (uri: string) => void;
}
//TODO upload photo
const PictureInput: React.FC<Props> = (props) => {
  const onPress = useCallback(() => {
    Permissions.askAsync(Permissions.CAMERA_ROLL).then((result) => {
      if (result.granted) {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: false,
          base64: true,
        }).then(
          (result) => {
            if (result.cancelled === false) {
              props.onPhotoChosen(result.uri);
            }
          },
          (reason) => {
            console.log(reason);
          }
        );
      }
    });
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ fontSize: 14, color: "rgb(80,80,80)" }}>
          New Category Photo (Optional)
        </Text>
      </View>
      {props.photoUri ? (
        <ImageBackground
          style={{ width: 100, height: 100 }}
          borderRadius={50}
          source={{ uri: props.photoUri }}
        >
          <TouchableHighlight
            style={{
              width: 25,
              height: 25,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.1)",
              marginLeft: "auto",
            }}
            underlayColor={"rgba(0,0,0,0.2)"}
            onPress={() => {
              props.onPhotoChosen("");
            }}
          >
            <Icon name={"times"}></Icon>
          </TouchableHighlight>
        </ImageBackground>
      ) : (
        <TouchableHighlight
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "rgba(0,0,0,0.4)",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
          underlayColor={"rgba(0,0,0,0.1)"}
          onPress={onPress}
        >
          <Icon name={"image"} size={40}></Icon>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default PictureInput;
