import {Logger} from 'winston';
import _ from 'lodash';


export class VoteService {
  constructor(
    private logger: Logger,
    private VotableModel: any,
  ) {
  }

  public async upVote(userId: string, votable: any) {
    const hasUpvoted = await this.VotableModel.findOne({_id: votable._id, upVoters: userId}).lean();

    const hasDownVoted = await this.VotableModel.findOne({_id: votable._id, downVoters: userId}).lean();

    if (hasUpvoted) {
      votable.upVoters = votable.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      votable.voteCount--;
    } else if (hasDownVoted) {
      votable.downVoters = votable.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      votable.upVoters.push(userId);
      votable.voteCount += 2;
    } else {
      votable.upVoters.push(userId);
      votable.voteCount++;
    }
    return this.VotableModel.findByIdAndUpdate(votable._id, votable, {new: true});
  }

  public async downVote(userId: string, votable: any) {
    const hasUpvoted = await this.VotableModel.findOne({_id: votable._id, upVoters: userId});

    const hasDownVoted = await this.VotableModel.findOne({_id: votable._id, downVoters: userId});

    if (hasDownVoted) {
      votable.downVoters = votable.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      votable.voteCount++;
    } else if (hasUpvoted) {
      votable.upVoters = votable.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      votable.downVoters.push(userId);
      votable.voteCount -= 2;
    } else {
      votable.downVoters.push(userId);
      votable.voteCount--;
    }
    return this.VotableModel.findByIdAndUpdate(votable._id, votable, {new: true});
  }
}
