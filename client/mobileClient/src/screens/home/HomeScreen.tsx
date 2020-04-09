import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Header } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import SearchBar from '../../shared/components/SearchBar';
import AvatarCustom from '../../shared/components/Avatar';
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
      leftComponent={<AvatarCustom />}
      centerComponent={<SearchBar />}
    />
    <BottomNavigationPanel onAddClick={onAddClick} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});