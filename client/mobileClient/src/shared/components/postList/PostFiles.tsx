import React, { useMemo } from "react";
import { View, Dimensions, Image } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { GetFileUri } from "../../../api/blobs/BlobApiUri";

interface Props {
  readonly files: string[];
}

const PostFiles: React.FC<Props> = (props) => {
  const screenWidth = useMemo(() => {
    return Dimensions.get("screen").width;
  }, []);

  return (
    <View
      style={{
        width: screenWidth - 73,
        height: screenWidth - 73,
        overflow: "hidden",
      }}
    >
      <ViewPager
        style={{ flex: 1 }}
        onMoveShouldSetResponder={() => true}
        onStartShouldSetResponder={() => true}
      >
        {props.files.map((fileId, index) => {
          return (
            <View key={index}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: GetFileUri(fileId) }}
              ></Image>
            </View>
          );
        })}
      </ViewPager>
    </View>
  );
};

export default PostFiles;
