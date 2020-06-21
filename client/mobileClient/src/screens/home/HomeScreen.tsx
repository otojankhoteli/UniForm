import React from 'react';
import { StyleSheet, View, Button, ScrollView, } from 'react-native';
import { Text } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import BottomNavigationPanel from '../../shared/components/BottomNavigationPanel';
import { RootStackParamList } from '../StartUpScreen';
import { useGlobalState } from '../../shared/globalState/AppContext';
import useToast from '../../shared/toast/ToastHooks';
import HomeHeader from './HomeHeader';
import { PostList } from './feed/PostList';
import { useFeed, useMockFeed } from '../../api/posts/PostsApiHook';
import { MainColor } from '../../shared/Const';


type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export default function HomeScreen() {
  const { isLoading, fetchFirstPage, fetchNextPage, fetchPrevPage, result } = useFeed();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [{ account }, dispatch] = useGlobalState();

  useToast();
  // const route = useRoute<HomeScreenRouteProp>();

  const onAddClick = () => {
    navigation.navigate("AddPost");
  }

  const isData = result != null && result !== undefined && result.length > 0;


  return <View style={styles.container}>
    <HomeHeader dispatch={dispatch} account={account} />
    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} >
      {isData ?
        <PostList isLoading={isLoading} posts={result || []}
          onRefresh={fetchFirstPage} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
        :
        <View style={styles.textContainer}>
          <Text style={styles.text}>No Records</Text>
        </View>
      }
    </ScrollView>
    <BottomNavigationPanel onAddClick={onAddClick} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    color: MainColor,
    fontSize: 21,
    fontWeight: "bold",
    marginRight: 5
  },
  textContainer: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: "100%"
  },
});