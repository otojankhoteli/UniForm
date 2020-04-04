import React from 'react';
import { SearchBar } from 'react-native-elements'

interface Props {

}
export default function SearchBarCustom(_: Props) {
  return <SearchBar
    inputStyle={{ flex: 1 }}
    containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
    style={{ flex: 1, borderWidth: 0 }}></SearchBar>
}
