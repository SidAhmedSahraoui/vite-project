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
  provider_appointments: Array<MyAppointment>;
  client_appointments: Array<MyAppointment>;
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

export interface Appointment {
  token: string;
  clientEmail: string;
  providerUsername: string;
  date: Date | string | null;
  day: number;
  slot: number;
}

export interface MyAppointment {
  appointmentId: number;
  clientEmail: string;
  providerEmail: string;
  appointmentDate: string;
  startsAt: string;
  endsAt: string;
  isPayed: boolean;
  client: Client;
  provider: Provider;
}

export interface Client {
  clientId: number;
  email: string;
  username: string;
}

export interface Provider {
  providerId: number;
  email: string;
  username: string;
}

export interface ProviderCategory {
  providerId: number;
  user: User;
  category: Category;
}

export interface AdminState {
  loading: boolean;
  users: Array<User>;
  providers: Array<ProviderCategory>;
  admins: Array<User>;
  error: Array<Error>;
  categories: Array<Category>;
}

export interface AddCategorySchema {
  title: string;
  description: string;
  space: number;
}

export interface EditCategorySchema {
  id: number;
  title: string;
  description: string;
  space: string;
}

export interface AddProviderSchema {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  categoryTitle: string;
}

export interface UpgradeUserSchema {
  username: string;
  categoryTitle: string;
}
