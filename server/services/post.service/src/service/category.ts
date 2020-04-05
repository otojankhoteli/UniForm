import {Service, Inject} from 'typedi';
import {CategoryModel} from '../db/model/category';

@Service()
export class CategoryService {
  constructor(
      // @Inject('categoryModel') private categoryModel,
      private categoryModel = CategoryModel,
  ) {
  }
  public async save(category) {
    return await new CategoryModel(category).save();
  }
  public test() {
    console.log('test');
    return 'test';
  }
}
