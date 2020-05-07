export type GetUsersByEmailResponse = UserViewModel[];
export interface UserViewModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: string;
}