export interface IPost {
  _id: string,
  author: string,
  type: string,
  body: string,
  hashTags: string[],
  userTags: string[],
  category: string,
  voteCount: number,
}
