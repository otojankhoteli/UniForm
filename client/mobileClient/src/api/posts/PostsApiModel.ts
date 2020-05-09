export interface CreatePostRequest {
  categoryId: string;
  hashTags: string[];
  userTags: string[];
  text: string;
}
  