import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface Comment {
  id: string;
  recipeId: string;
  content: string;
  createdDate: Date;
  createdBy: UserProfile;
}
