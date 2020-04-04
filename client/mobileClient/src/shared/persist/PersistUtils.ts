import { AsyncStorage } from "react-native";
import { PersistAccountKey } from "./PersistConst";
import { PersistAccount } from "./PersistModels";

export async function saveAccount(persistAccount: PersistAccount) {
  await AsyncStorage.setItem(PersistAccountKey, JSON.stringify(persistAccount));
}

export async function removeAccount() {
  await AsyncStorage.removeItem(PersistAccountKey);
}

export async function getAccount(): Promise<PersistAccount | undefined> {
  const accountJson = await AsyncStorage.getItem(PersistAccountKey);

  if (accountJson) {
    return JSON.parse(accountJson);
  }

  return undefined;
}
