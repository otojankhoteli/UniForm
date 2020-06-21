import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PostViewModel } from '../../../api/posts/PostsApiModel';
import AvatarCustom from '../../../shared/components/Avatar';
import { MainColor } from '../../../shared/Const';
import HorizontalLine from '../../../shared/components/HorizontalLine';
import { getTimeFormat } from '../../../shared/Utils';
import { extractNodesFromInputText } from '../../addPost/AddPostUtils';
import { TextWithTags } from '../../addPost/TextWithTags';



interface Props {
  post: PostViewModel
}
export function PostListItem({ post }: Props) {
  const textNodes = useMemo(() => extractNodesFromInputText(post.text), [post.text]);

  const upVoteIconStyle = post.isUpvoted ? styles.votedIconColor : styles.notVotedIconColor;
  const downVoteIconStyle = post.isDownvoted ? styles.votedIconColor : styles.notVotedIconColor;

  const navigateToCategoryScreen = () => {
    //
  }

  const joinCategory = () => {
    //
  }

  return <View style={styles.container}>
    <View style={styles.topSection}>
      <AvatarCustom photoUrl={post.authorProfilePic} />
      <View style={styles.topMiddleSection}>
        <View style={styles.categorySection}>
          <Text style={styles.clickableCategoryName}>u/</Text>
          <TouchableOpacity onPress={navigateToCategoryScreen}>
            <Text style={styles.clickableCategoryName}>
              {post.categoryName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.authorSection}>
          <Text style={styles.timePassedText}>Posted by </Text>
          <Text style={styles.clickableAuthorName}>s/</Text>
          <TouchableOpacity onPress={navigateToCategoryScreen}>
            <Text style={styles.clickableAuthorName}>
              {post.authorUsername}
            </Text>
          </TouchableOpacity>
          <Text style={styles.timePassedText}> {getTimeFormat(new Date(), new Date(post.createdAt))}</Text>
        </View>
      </View>
      <Icon color={post.isJoined ? "#AA061A" : "gray"} size={20} solid={post.isJoined} style={styles.joinCategoryIcon} onPress={joinCategory} name="heart" />
    </View>
    {/* <Text style={styles.postText}>{post.text}</Text> */}
    <View style={styles.postText}>
      <TextWithTags nodes={textNodes} />
    </View>
    <HorizontalLine mode="short" />
    <View style={styles.bottomSection}>
      <View style={styles.voteContainer}>
        <View style={styles.voteActionContainer}>
          <Icon size={20} onPress={() => { console.log("up") }} style={upVoteIconStyle} name="arrow-up" />
          <Icon size={20} onPress={() => { console.log("down") }} style={downVoteIconStyle} name="arrow-down" />
        </View>
        <Text>{post.voteCount}</Text>
      </View>
      <Icon size={40} style={{ color: "gray" }} name="comments" />
    </View>
  </View>
}



const styles = StyleSheet.create({
  authorSection: {
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    marginRight: "auto"
  },
  bottomSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto"
  },
  categorySection: {
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    marginRight: "auto"
  },
  clickableAuthorName: {
    color: MainColor,
    fontSize: 13,
    fontWeight: "bold"
  },
  clickableCategoryName: {
    color: MainColor,
    fontSize: 15,
    fontWeight: "bold"
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    margin: 5,
    padding: 3,
    // width: "100%",
  },
  joinCategoryIcon: {
    marginLeft: "auto",
    marginRight: 10
  },
  notVotedIconColor: {
    color: "gray"
  },
  postText: {
    borderColor: 'red',
    borderWidth: 1,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  timePassedText: {
    fontSize: 10
  },
  topMiddleSection: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10
  },
  topSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  voteActionContainer: {
    display: "flex",
    flexDirection: "column",
  },
  voteContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: "auto"
  },
  votedIconColor: {
    color: "#386083"
  }
});