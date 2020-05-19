import React, { useState } from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { CategoryViewModel } from '../../api/categories/CategoriesApiModel'
import CategoryList from './CategoryList'
import SearchBarCustom from '../../shared/components/SearchBar'
import { RootStackParamList } from '../StartUpScreen'
import { useCategoriesByName } from '../../api/categories/CategoriesApiHook'

type ChooseCategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChooseCategory'
>;
// const categoriesInitial: CategoryViewModel[] = [{ id: "1", isVerified: true, name: "Global" },
// { id: "2", isVerified: true, name: "Macs" },
// { id: "3", isVerified: true, name: "Esm1" },
// { id: "4", isVerified: true, name: "Esm2" },
// { id: "5", isVerified: true, name: "Esm3" },
// { id: "6", isVerified: true, name: "Esm4" },
// { id: "7", isVerified: true, name: "Esm5" },
// { id: "8", isVerified: true, name: "Esm6" },
// { id: "9", isVerified: true, name: "Esm7" },
// { id: "10", isVerified: true, name: "Esm8" },
// { id: "11", isVerified: true, name: "Esm9" },
// { id: "12", isVerified: true, name: "Esm10" },
// { id: "13", isVerified: true, name: "Esm11" },
// { id: "14", isVerified: true, name: "Test" }]
export default function ChooseCategoryScreen() {
  // const [categories, setCategories] = useState<CategoryViewModel[]>(categoriesInitial);
  const { result, isLoading, setRequestInfo, refetch, fetchNextPage, fetchPrevPage, fetchFirstPage } = useCategoriesByName();
  const navigation = useNavigation<ChooseCategoryScreenNavigationProp>();

  const onCategorySelect = (category: CategoryViewModel) => {
    navigation.navigate("AddPost", {
      category
    });
  }

  const onSearchChange = (text: string) => {
    console.log("onSearchChange")
    setRequestInfo(prev => ({
      wait: false,
      info: {
        limit: prev.info && prev.info.limit,
        skip: prev.info && prev.info.skip,
        queryParams: [{ key: "name", value: text }],
      }
    }))
    // setCategories(categoriesInitial.filter(category => category.name.toLowerCase().indexOf(text.toLowerCase()) !== -1));
  }

  return <View>
    <SearchBarCustom onChangeText={onSearchChange} />
    <CategoryList isLoading={isLoading} onSelect={onCategorySelect} categories={result || []}
      onRefresh={fetchFirstPage} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
  </View>
}