import { UserProfile } from 'app/pages/profile/models/user-profile.interface';

export interface Cookbook {
  id: string;
  name: string;
  createdDate: Date;
  createdBy: UserProfile;
}
