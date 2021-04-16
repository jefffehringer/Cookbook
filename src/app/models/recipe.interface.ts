import { UserProfile } from 'app/pages/profile/models/user-profile.interface';
import { Tag } from './tag.interface';

export interface Recipe {
  id: number;
  name: string;
  author: string;
  notes: string;
  cooktime: string;
  ingredients: string[];
  instructions: string[];
  tags: Tag[];
  foodType: string;
  description: string;
  userProfile: UserProfile;
  likeCount: number;
  commentCount: number;
  liked: boolean;
}
