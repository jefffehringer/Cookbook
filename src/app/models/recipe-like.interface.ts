import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface RecipeLike {
  id: string;
  recipeId: string;
  createdDate: Date;
  user: UserProfile;
}
