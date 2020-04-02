import React from 'react';
import { View } from 'react-native';
import AvatarCustom from '../../shared/components/Avatar';
import SearchBar from '../../shared/components/SearchBar';
import { Header } from 'react-native-elements';

export default function HomeScreen() {
    return <View>
        <Header
            placement="left"
            style={{ backgroundColor: 'white', borderBottomColor: "red" }}
            backgroundImageStyle={{ backgroundColor: 'white', borderBottomWidth: 1 }}
            barStyle="light-content"
            centerContainerStyle={{ flex: 1, borderWidth: 1, borderColor: "red" }}
            leftComponent={<AvatarCustom></AvatarCustom>}
            centerComponent={<SearchBar></SearchBar>}
        />
    </View>
}
