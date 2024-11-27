export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Recipient {
  id?: number;
  name?: string | null;
  gift?: string | null;
  shop?: string | null;
  link?: string | null;
  budget?: number | null;
  actual_budget?: number | null;
  is_purchased?: boolean;
  is_wrapped?: boolean;
  category: Category;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
}

export enum Category {
  "Famille",
  "Ami",
  "Collegue",
  "Animal",
  "Autre",
}
