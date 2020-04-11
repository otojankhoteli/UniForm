export interface IPost {
  user: string,
  type: string,
  body: string,
  hashTag: string[],
  category: string,
  voteCount: number,
}
