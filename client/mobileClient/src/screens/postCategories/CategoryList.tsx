import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { CategoryViewModel } from '../../api/categories/CategoriesApiModel'
import CategoryListItem from './CategoryListItem'

interface Props {
  isLoading: boolean;
  categories: CategoryViewModel[],
  onSelect?: (categoryId: CategoryViewModel) => void;
}
export default function CategoryList({ isLoading, categories, onSelect }: Props) {
  return <ScrollView>
    {categories.map(category => {
      return <CategoryListItem key={category.id} category={category} onCategoryClick={onSelect} />
    })}
  </ScrollView>
}