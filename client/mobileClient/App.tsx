import 'react-native-gesture-handler';
import React from 'react';
import StartUpScreen from './src/screens/StartUpScreen';
import { InitialAppState } from './src/shared/globalState/AppState';
import { reducer } from './src/shared/globalState/Reducer';
import { StateProvider } from './src/shared/globalState/AppContext';

export default function App() {
  return (
    <StateProvider initialState={InitialAppState} reducer={reducer}>
      <StartUpScreen />
    </StateProvider>
  );
}


