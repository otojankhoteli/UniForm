import { Inject } from 'typedi';
import { Logger } from 'winston';
import _ from 'lodash';


export class VoteService {
  constructor(
    private logger: Logger,
    private VotableModel: any
  ) {
  }

  public async upVote(objectId: string, userId: string, votable: any) {
    // const votable = await this._validateVoteAndGetVotable(objectId, userId);

    const hasUpvoted = await this.VotableModel.findOne({ _id: objectId, upVoters: userId }).lean();

    const hasDownVoted = await this.VotableModel.findOne({ _id: objectId, downVoters: userId }).lean();

    if (hasUpvoted) {
      // post.upVoters = post.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      // post.voteCount--;
    } else if (hasDownVoted) {
      votable.downVoters = votable.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      votable.upVoters.push(userId);
      votable.voteCount += 2;
    } else {
      votable.upVoters.push(userId);
      votable.voteCount++;
    }
    return this.VotableModel.findByIdAndUpdate(objectId, votable, { new: true });
  }

  public async downVote(objectId: string, userId: string, votable: any) {
    // const post = await this._validateVoteAndGetPost(postId, userId);

    const hasUpvoted = await this.VotableModel.findOne({ _id: objectId, upVoters: userId });

    const hasDownVoted = await this.VotableModel.findOne({ _id: objectId, downVoters: userId });

    if (hasDownVoted) {
      // post.downVoters = post.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      // post.voteCount++;
    } else if (hasUpvoted) {
      votable.upVoters = votable.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      votable.downVoters.push(userId);
      votable.voteCount -= 2;
    } else {
      votable.downVoters.push(userId);
      votable.voteCount--;
    }
    return this.VotableModel.findByIdAndUpdate(objectId, votable, { new: true });
  }
}