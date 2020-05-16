export interface IPost {
  _id: string,
  author: string,
  type: string,
  text: string,
  files: string[],
  hashTags: string[],
  userTags: string[],
  category: string,
  upVoters: string[],
  downVoters: string[],
  voteCount: number,
}
export interface UpsertPostRequest {
  id?:string;
  authorId: string;
  categoryId: string;
  hashTags: string[],
  userTags: string[],
  text: string,
  files: string[],
}
