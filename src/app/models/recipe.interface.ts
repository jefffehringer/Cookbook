import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface Recipe {
  id: number;
  name: string;
  author: string;
  notes: string;
  cooktime: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  foodType: string;
  description: string;
  userProfile: UserProfile;
  likeCount: number;
  commentCount: number;
  liked: boolean;
}
