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
export interface UpsertPostRequest {
  id?:string;
  authorId: string;
  categoryId: string;
  hashTags: string[],
  userTags: string[],
  text: string;
}