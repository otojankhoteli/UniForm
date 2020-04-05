import React from 'react';
import { StyleSheet, View, } from 'react-native';
import AvatarCustom from '../../shared/components/Avatar';
import SearchBar from '../../shared/components/SearchBar';
import { Header } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import BottomNavigationPanel from '../../shared/components/BottomNavigationPanel';

type RootStackParamList = {
  Home: undefined;
  AddPost: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen() {

  const navigation = useNavigation<HomeScreenNavigationProp>();
  // const route = useRoute<HomeScreenRouteProp>();

  const onAddClick = () => {
    navigation.navigate("AddPost");
  }

  return <View style={styles.container}>
    <Header
      placement="left"
      style={{ backgroundColor: 'white', borderBottomColor: "red" }}
      backgroundImageStyle={{ backgroundColor: 'white', borderBottomWidth: 1 }}
      barStyle="light-content"
      centerContainerStyle={{ flex: 1, borderWidth: 1, borderColor: "red" }}
      leftComponent={<AvatarCustom></AvatarCustom>}
      centerComponent={<SearchBar></SearchBar>}
    />
    <BottomNavigationPanel onAddClick={onAddClick}></BottomNavigationPanel>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});