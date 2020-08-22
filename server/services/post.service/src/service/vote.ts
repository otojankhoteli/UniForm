import {Logger} from 'winston';
import _ from 'lodash';
import OperationError from '../util/error/OperationError';


export class VoteService {
  constructor(
    private logger: Logger,
    private VotableModel: any,
  ) {
  }

  public async upVote(userId: string, votable: any) {
    if (await this._hasUpvoted(votable, userId)) {
      throw new OperationError('post is already upvoted');
    } else if (await this._hasDownVoted(votable, userId)) {
      votable.downVoters = votable.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      votable.upVoters.push(userId);
      votable.voteCount += 2;
    } else {
      votable.upVoters.push(userId);
      votable.voteCount++;
    }
    return this.VotableModel.findByIdAndUpdate(votable._id, votable, {new: true});
  }

  private async _hasDownVoted(votable: any, userId: string) {
    return this.VotableModel.findOne({_id: votable._id, downVoters: userId}).lean();
  }

  private async _hasUpvoted(votable: any, userId: string) {
    return this.VotableModel.findOne({_id: votable._id, upVoters: userId}).lean();
  }

  public async downVote(userId: string, votable: any) {
    if (await this._hasDownVoted(votable, userId)) {
      throw new OperationError('post is already downvoted');
    } else if (await this._hasUpvoted(votable, userId)) {
      votable.upVoters = votable.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      votable.downVoters.push(userId);
      votable.voteCount -= 2;
    } else {
      votable.downVoters.push(userId);
      votable.voteCount--;
    }
    return this.VotableModel.findByIdAndUpdate(votable._id, votable, {new: true});
  }

  public async unReact(userId: string, votable: any) {
    if (await this._hasUpvoted(votable, userId)) {
      votable.upVoters = votable.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      votable.voteCount--;
    } else if (await this._hasDownVoted(votable, userId)) {
      votable.downVoters = votable.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      votable.voteCount++;
    }
    return this.VotableModel.findByIdAndUpdate(votable._id, votable, {new: true});
  }
}
