import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface Comment {
  id: number;
  recipeId: number;
  content: string;
  createdDate: Date;
  userProfile: UserProfile;
}
