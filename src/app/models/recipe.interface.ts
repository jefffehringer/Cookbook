import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface Recipe {
  _id: string;
  name: string;
  author: string;
  notes: string;
  cooktime: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  foodType: string;
  description: string;
  createdBy: UserProfile;
  numberLikes: number;
}
