import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import { MainColor } from "../../shared/Const";
import HorizontalLine from "../../shared/components/HorizontalLine";
import { useFileUpload } from "../../api/blobs/BlobApiHook";
import { GetFileUri, FileUploadUri } from "../../api/blobs/BlobApiUri";

export interface UploadedImage {
  fileId: string;
  name: string;
}
interface Props {
  onUploadedContentsChange: (photos: UploadedImage[]) => void;
}
export default function MediaSection({ onUploadedContentsChange }: Props) {
  const [medias, setMedias] = useState<UploadedImage[]>([]);
  const [hasPermission, setHasPermission] = useState(null);

  const { post: upload, result, isError, isLoading } = useFileUpload();

  useEffect(() => {
    onUploadedContentsChange(medias);
  }, [medias]);

  useEffect(() => {
    if (result && !isError) {
      setMedias((prev) => [...prev, result]);
    }
  }, [result, isError]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        const { uri, base64 } = result as any;
        let uriSplited = uri.split(".");
        let type = uriSplited[uriSplited.length - 1];
        upload({
          content: base64,
          type,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const onImagePick = async () => {
    await getPermissionAsync();
    pickImage();
  };

  const removeMedia = (fileId: string) => {
    setMedias((prev) => {
      const filtered = prev.filter((m) => m.fileId !== fileId);
      console.log("filtered", filtered);
      return filtered;
    });
  };

  const onCameraClick = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
    try {
      const result = await ImagePicker.launchCameraAsync({
        base64: true,
      });
      if (!result.cancelled) {
        const { uri, base64 } = result as any;
        let uriSplited = uri.split(".");
        let type = uriSplited[uriSplited.length - 1];
        upload({
          content: base64,
          type,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "rgb(120,120,120)", fontSize: 14, marginLeft: 5 }}>
        Attachments
      </Text>
      <FlatList
        style={{
          height: 120,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "rgba(0,0,0,0.3)",
          marginTop: 5,
        }}
        contentContainerStyle={{ alignItems: "center" }}
        horizontal
        data={medias}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <View key={item.fileId} style={styles.imageContainer}>
              <Image
                source={{ uri: GetFileUri(item.fileId) }}
                style={styles.image}
              />
              <Icon
                onPress={() => removeMedia(item.fileId)}
                containerStyle={styles.removeIconContainer}
                iconStyle={styles.icon}
                color="red"
                name="times"
                type="font-awesome"
                size={25}
              />
            </View>
          );
        }}
        ListFooterComponent={() => {
          return (
            <View style={styles.cameraButtonsContainer}>
              <TouchableHighlight
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  marginLeft: 10,
                  borderColor: "rgba(0,0,0,0.3)",
                  justifyContent: "center",
                }}
                underlayColor={"rgba(0,0,0,0.2)"}
                onPress={onCameraClick}
              >
                <Icon
                  name="camera"
                  type="font-awesome"
                  color="black"
                  size={40}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  marginLeft: 10,
                  marginRight: 10,
                  borderColor: "rgba(0,0,0,0.3)",
                  justifyContent: "center",
                }}
                underlayColor={"rgba(0,0,0,0.2)"}
                onPress={onImagePick}
              >
                <Icon
                  name="image"
                  type="font-awesome"
                  color="black"
                  size={40}
                />
              </TouchableHighlight>
            </View>
          );
        }}
      ></FlatList>
      {/* <ScrollView horizontal contentContainerStyle={styles.mediasContainer}>
        {medias.map((media) => (
          <View key={media.fileId} style={styles.imageContainer}>
            <Image
              source={{ uri: GetFileUri(media.fileId) }}
              style={styles.image}
            />
            <Icon
              onPress={() => removeMedia(media.fileId)}
              containerStyle={styles.removeIconContainer}
              iconStyle={styles.icon}
              color="red"
              name="times"
              type="font-awesome"
              size={25}
            />
          </View>
        ))}
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={MainColor} />
          </View>
        ) : null}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButtonIcon: { marginRight: 10 },
  cameraButtonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  container: { padding: 10 },
  icon: {
    elevation: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    borderColor: MainColor,
    borderWidth: 0.5,
    marginLeft: 10,
  },
  mediasContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: 120,
    width: 100,
  },
  removeIconContainer: {
    position: "absolute",
    right: 2,
    top: 1,
  },
  spinnerContainer: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: 100,
  },
});
