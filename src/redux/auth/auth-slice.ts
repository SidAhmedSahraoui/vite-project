import axios, { AxiosResponse } from "axios";
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
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import colors from "../../styling/colors";

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
    authFail: state => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
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
    addError: (state, action) => {
      state.error.push({
        id: uuidv4(),
        message: action.payload?.message || action.payload,
        type: "danger",
      });
      console.log(action.payload);
    },
    removeError: (state, action) => {
      state.error.filter(err => err.id !== action.payload);
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
  addError,
  removeError,
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
    const { response } = err as any;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(authFail());
    dispatch(setAlert(errorMessage?.message, "danger"));
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
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail());
      dispatch(setAlert(errorMessage?.message, "danger"));
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
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail());
      dispatch(setAlert(errorMessage?.message, "danger"));
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
    const { response } = err as any;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(authFail());
    dispatch(setAlert(errorMessage?.message, "danger"));
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
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail());
      dispatch(setAlert(errorMessage?.message, "danger"));
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
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail());
      dispatch(setAlert(errorMessage?.message, "danger"));
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
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(authFail());
      dispatch(setAlert(errorMessage?.message, "danger"));
    }
  };

export const setAlert =
  (message: string, type: string, timeout = 5000): AppThunk =>
  async dispatch => {
    const id = uuidv4();
    dispatch(addError({ message, type, id }));
    if (type === "danger") {
      toast(message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: colors.danger,
          fontWeight: 500,
          fontSize: "1.2rem",
          color: "#fff",
        },
      });
    } else if (type === "success")
      toast.success(message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: colors.success,
          fontWeight: 500,
          fontSize: "1.2rem",
          color: "#fff",
        },
      });
    setTimeout(() => dispatch(removeError(id)), timeout);
  };

export default authSlice.reducer;
