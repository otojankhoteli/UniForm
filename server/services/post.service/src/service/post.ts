import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import {IPost} from '../interface/Post';


@Service()
export class PostService {
  constructor(
      @Inject('PostModel')
      private PostModel: Model<IPost & Document>,
      private HashTagService,
  ) {}

  public async save(post: IPost) {

  }

  public test() {
    return 'postservice';
  }
}
