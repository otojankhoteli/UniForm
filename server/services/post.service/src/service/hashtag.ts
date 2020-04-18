import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IHashTag} from '../interface/HashTag';


@Service()
export class HashTagService {
  constructor(
      @Inject('HashTagModel')
      private HashTagModel: Model<IHashTag & Document>,
  ) {
  }

  public async save(hashTag: string | string[]) {
    const hashTagObjects = [].concat(hashTag)
        .map((name) => {
          return {name};
        });
    return this.HashTagModel.insertMany(hashTagObjects);
  }

  public test() {
    return 'hashtag';
  }
}
