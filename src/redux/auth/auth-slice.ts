import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  AuthState,
  User,
  RegisterUser,
  LoginUser,
  UpdateProfileForm,
  UpdatePasswordForm,
} from "../../types";
import { URL as Api } from "../../utils/api";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  loading_profile: false,
  user: null as User | null,
  error: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: state => {
      state.token = null;
      state.isAuthenticated = null;
      state.loading = true;
      state.loading_profile = true;
      state.user = null;
      state.error = [];
    },
    authSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = [];
    },
    authFail: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = [action.payload?.message];
      console.log(state.error);
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = [];
    },
    setLoading: state => {
      state.loading = true;
    },
    profileLoaded: (state, action) => {
      state.loading_profile = false;
      state.user = action.payload;
      state.error = [];
    },
    setLoadingProfile: state => {
      state.loading_profile = true;
    },
    updateProfile: (state, action) => {
      state.loading_profile = false;
      state.error = [action.payload?.message];
      console.log(state.error);
    },
    updatePassword: state => {
      state.loading_profile = false;
      state.error = [];
    },
    profileError: (state, action) => {
      state.loading_profile = false;
      state.error = [action.payload];
      console.log(state.error);
    },
    clearErrors: state => {
      state.error = [];
    },
    logout: state => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.loading_profile = false;
      state.user = null;
      state.error = [];
    },
  },
});

export const {
  resetState,
  authSuccess,
  authFail,
  userLoaded,
  setLoading,
  profileLoaded,
  setLoadingProfile,
  updateProfile,
  updatePassword,
  profileError,
  clearErrors,
  logout,
} = authSlice.actions;

// Load User
export const loadUser = (): AppThunk => async dispatch => {
  try {
    const savedToken: string = localStorage.getItem("token") || "";
    const savedUserId: string = localStorage.getItem("userId") || "";

    dispatch(setLoading());
    const res: AxiosResponse = await axios.post(
      `${Api}/auth-service/auth/user`,
      {
        userId: +savedUserId,
        token: savedToken,
      }
    );
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authFail(err));
  }
};

// Register User
export const register =
  (formData: RegisterUser): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.post(
        `${Api}/auth-service/auth/register`,
        formData
      );
      dispatch(authSuccess(res.data));
      dispatch(loadUser());
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail(errorMessage));
    }
  };

// Login User
export const login =
  (formData: LoginUser): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.post(
        `${Api}/auth-service/auth/login`,
        formData
      );
      dispatch(authSuccess(res.data));
      dispatch(loadUser());
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail(errorMessage));
    }
  };

// Load Profile
export const loadProfile = (): AppThunk => async dispatch => {
  try {
    const savedUserId = localStorage.getItem("userId");
    const userId: number | null = savedUserId ? +savedUserId : null;
    dispatch(setLoadingProfile());
    const res: AxiosResponse = await axios.get(
      `${Api}/auth-service/user/profile/${userId}`
    );
    dispatch(profileLoaded(res.data));
  } catch (err) {
    dispatch(profileError(err));
  }
};

// Update Profile
export const updateProfileAction =
  (userId: number, formData: UpdateProfileForm): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.patch(
        `${Api}/auth-service/user/update/${userId}`,
        formData
      );
      dispatch(updateProfile(res.data));
      dispatch(loadProfile());
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail(errorMessage));
    }
  };

// Update Password
export const updatePasswordAction =
  (formData: UpdatePasswordForm): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.post(
        `${Api}/auth-service/user/reset-password`,
        formData
      );
      dispatch(updatePassword(res.data));
      dispatch(loadProfile());
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail(errorMessage));
    }
  };

// Delete User
export const deleteUser =
  (userId: number, password: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.delete(
        `${Api}/auth-service/user/delete/${userId}`,
        { data: { password } }
      );
      console.log(res.data);
      dispatch(logout());
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail(errorMessage));
    }
  };

export default authSlice.reducer;
