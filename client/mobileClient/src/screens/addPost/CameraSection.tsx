import { View, StyleSheet, Image, Text } from "react-native"
import { Icon } from "react-native-elements"
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { ScrollView } from "react-native-gesture-handler";
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
export default function CameraSection({ onUploadedContentsChange }: Props) {
  const [medias, setMedias] = useState<UploadedImage[]>([]);
  const { post: upload, result, isError, isLoading } = useFileUpload();

  useEffect(() => {
    onUploadedContentsChange(medias);
  }, [medias])

  useEffect(() => {
    if (result && !isError) {
      setMedias(prev => [...prev, result]);
    }
  }, [result, isError])


  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!result.cancelled) {
        const { uri, base64 } = result as any;
        let uriSplited = uri.split('.');
        let type = uriSplited[uriSplited.length - 1];
        upload({
          content: base64,
          type
        });

        // let data = new FormData();
        // data.append('files', base64);


        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', FileUploadUri, true);
        // xhr.onprogress = function () {
        //   console.log('LOADING', xhr.status);
        // };

        // xhr.onerror = (e) => {
        //   console.log("error")
        // };

        // xhr.onload = function () {
        //   console.log('DONE', xhr.status);
        // };
        // xhr.send(data);

      }

    } catch (e) {
      console.log(e);
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const onImagePick = async () => {
    await getPermissionAsync();
    pickImage();
  }

  const removeMedia = (fileId: string) => {
    setMedias(prev => prev.filter(m => m.fileId !== fileId));
  }

  return <View style={styles.container}>
    <View style={styles.cameraButtonsContainer}>
      <Icon
        name="camera"
        type="font-awesome"
        color="gray"
        size={50}
        onPress={() => { console.log("on camera click") }}
        containerStyle={styles.cameraButtonIcon}
      />
      <Icon
        name="image"
        type="font-awesome"
        color="gray"
        size={50}
        onPress={onImagePick}
      />
    </View>
    <HorizontalLine style={{ marginBottom: 5 }} mode="short" />
    {medias && <ScrollView horizontal contentContainerStyle={styles.mediasContainer}>
      {medias.map(media => (<View key={media.fileId} style={styles.imageContainer}>
        <Image source={{ uri: GetFileUri(media.fileId) }} style={styles.image} />
        <Icon onPress={() => removeMedia(media.fileId)}
          containerStyle={styles.removeIconContainer}
          iconStyle={styles.icon} color={MainColor} name="times" type="font-awesome" size={25} />
      </View>))}
    </ScrollView>}
  </View>
}

const styles = StyleSheet.create({
  cameraButtonIcon: { marginRight: 10 },
  cameraButtonsContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    // position: "absolute",
    width: "100%"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    elevation: 10
  },
  image: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    borderColor: MainColor,
    borderWidth: 0.5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 10,
    position: "relative",
  },
  mediasContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: 110,
    width: 100,
  },
  removeIconContainer: {
    position: "absolute",
    right: 2,
    top: 1
  },
});