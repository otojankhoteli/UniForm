import React from 'react';
import { StyleSheet, View, Button, } from 'react-native';
import { Header } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AvatarCustom from '../../shared/components/Avatar';
import BottomNavigationPanel from '../../shared/components/BottomNavigationPanel';
import { RootStackParamList } from '../StartUpScreen';
import { useGlobalState } from '../../shared/globalState/AppContext';
import useToast from '../../shared/toast/ToastHooks';


type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export default function HomeScreen() {
  const [, dispatch] = useGlobalState();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [{ account },] = useGlobalState();

  useToast();
  // const route = useRoute<HomeScreenRouteProp>();

  const onAddClick = () => {
    navigation.navigate("AddPost");
  }

  const logout = () => {
    dispatch({
      type: "setLoggedInUser",
      account: null
    });
    navigation.navigate("Login");
  }

  return <View style={styles.container}>
    <Header
      placement="left"
      style={{ backgroundColor: 'white', borderBottomColor: "red" }}
      backgroundImageStyle={{ backgroundColor: 'white', borderBottomWidth: 1 }}
      barStyle="light-content"
      centerContainerStyle={{ flex: 1, borderWidth: 1, borderColor: "red" }}
      leftComponent={<AvatarCustom photoUrl={account && account.user && account.user.photoURL} />}
      centerComponent={<Button title="Logout" onPress={logout} />}
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