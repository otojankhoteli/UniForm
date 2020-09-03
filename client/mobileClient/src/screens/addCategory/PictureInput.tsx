import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useFileUpload } from "../../api/blobs/BlobApiHook";
import { GetFileUri } from "../../api/blobs/BlobApiUri";

interface Props {
  readonly photoUri: string;
  readonly onPhotoChosen: (uri: string) => void;
}
//TODO upload photo
const PictureInput: React.FC<Props> = (props) => {
  const { post: upload, result, isLoading } = useFileUpload();
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
              const { uri, base64 } = result as any;
              let uriSplited = uri.split(".");
              let type = uriSplited[uriSplited.length - 1];
              upload({
                content: base64,
                type,
              });
            }
          },
          (reason) => {
            console.log(reason);
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (result) {
      props.onPhotoChosen(GetFileUri(result.fileId));
    }
  }, [result]);

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
      ) : isLoading ? (
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            size={"large"}
            color={"rgb(150,200,250)"}
          ></ActivityIndicator>
        </View>
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
