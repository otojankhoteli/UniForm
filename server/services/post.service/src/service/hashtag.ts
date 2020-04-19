import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IHashTag} from '../interface/HashTag';
import {Page} from '../interface/Common';


@Service()
export class HashTagService {
  constructor(
      @Inject('HashTagModel')
      private HashTagModel: Model<IHashTag & Document>,
  ) {
  }

  public async save(hashTag: string | string[]) {
    hashTag = [].concat(hashTag);

    let existingHashTags: any = await this.HashTagModel
        .find()
        .where('name')
        .in(hashTag);

    existingHashTags = existingHashTags.map((tag) => tag.name);

    const hashTagObjects = hashTag.filter((name) => !existingHashTags.includes(name))
        .map((name) => {
          return {name};
        });

    return this.HashTagModel.insertMany(hashTagObjects);
  }

  // public async find(name: string | Page) {
  //   return this.HashTagModel
  //       .find()
  //       .where()
  // }

  public test() {
    return 'hashtag';
  }
}
