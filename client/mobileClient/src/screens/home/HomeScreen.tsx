import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Header } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../shared/components/SearchBar';
import AvatarCustom from '../../shared/components/Avatar';
import BottomNavigationPanel from '../../shared/components/BottomNavigationPanel';
import { RootStackParamList } from '../StartUpScreen';
import { useTokenRefreshHandler } from '../../shared/auth/AuthHook';


type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export default function HomeScreen() {
  useTokenRefreshHandler();

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
      centerComponent={<SearchBar onChangeText={() => { console.log(""); }} />}
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