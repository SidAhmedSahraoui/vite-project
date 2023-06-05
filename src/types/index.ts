// General
export type Environment = "development" | "production";

// UI
export interface UIState {
  darkMode: boolean;
}

// Auth
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean | null;
  loading_profile: boolean | null;
  user: User | null;
  error: Array<Error>;
}

// CategoriesState
export interface CategoriesState {
  categories: Array<Category>;
  loading_categories: boolean;
  loading: boolean;
  category: Category | null;
  loading_provider: boolean;
  provider: Provider | null;
  providers: Array<Provider>;
  loading_providers: boolean;
  error: Array<Error>;
}

// PlanningState
export interface PlanningState {
  loading: boolean;
  planning: Planning | null;
  days: Array<Day>;
  slots: Array<Slot>;
  error: Array<Error>;
}

// Error State
export type ErrorState = Array<Error>;

// User
export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: Array<Role>;
  locked: boolean;
  authorities: Array<Authority>;
}

// Role
export interface Role {
  roleId: number;
  roleName: string;
}

// Authority
export interface Authority {
  authority: string;
}

// UpdateProfileForm
export interface UpdateProfileForm {
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// UpdatePasswordForm
export interface UpdatePasswordForm {
  id: string;
  oldPassword: string;
  newPassword: string;
}

// Register
export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  phone: string;
  firstname: string;
  lastname: string;
}

// Login
export interface LoginUser {
  credential: string;
  password: string;
}

// Error
export interface Error {
  id: string;
  message: string;
  type: string;
}

// LoadUserRequest
export interface LoadUserRequest {
  request: string;
}

// Category
export interface Category {
  categoryId: number;
  title: string;
  description: string;
  space: string;
}

// Provider
export interface Provider {
  providerId: number;
  user: User;
  category: Category;
}

export interface Day {
  dayId: number;
  dayName: string;
}

export interface Slot {
  timeSlotId: number;
  startsAt: string;
  endsAt: string;
}

export interface Planning {
  days: Array<Day>;
  slots: Array<Slot>;
}

export interface AddPlanningSchema {
  token: string;
  email: string;
  daysAvailability: Array<number>;
  slotsAvailability: Array<number>;
}
