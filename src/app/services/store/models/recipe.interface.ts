import { Step } from './step.interface';

export interface Recipe {
  id: string;
  name: string;
  author: string;
  notes: string;
  cooktime: string;
  ingredients: string[];
  steps: Step[];
  tags: string[];
  foodType: string;
}
