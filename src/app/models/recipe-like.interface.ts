import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface RecipeLike {
  id: number;
  recipeId: number;
  createdDate: Date;
  user: UserProfile;
}
