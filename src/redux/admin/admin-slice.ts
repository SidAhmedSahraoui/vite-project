import { createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { URL as Api } from "../../utils/api";
import {
  AddCategorySchema,
  AddProviderSchema,
  AdminState,
  EditCategorySchema,
  UpgradeUserSchema,
} from "../../types";
import { AppThunk } from "../store";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import colors from "../../styling/colors";

const initialState: AdminState = {
  loading: false,
  error: [],
  users: [],
  providers: [],
  admins: [],
  categories: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = [];
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = [];
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
      state.loading = false;
      state.error = [];
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
      state.loading = false;
      state.error = [];
    },
    addError: (state, action) => {
      state.error.push({
        id: uuidv4(),
        message: action.payload?.message || action.payload,
        type: action.payload?.type || "danger",
      });
      console.log(action.payload);
    },
    removeError: (state, action) => {
      state.error.filter(err => err.id !== action.payload);
    },
    clearErrors: state => {
      state.error = [];
    },
    resetState: state => {
      state.loading = false;
      state.error = [];
      state.users = [];
      state.providers = [];
      state.admins = [];
    },
  },
});

export const {
  setLoading,
  setUsers,
  setCategories,
  setAdmins,
  setProviders,
  addError,
  removeError,
  clearErrors,
  resetState,
} = adminSlice.actions;

export const getUsers = (): AppThunk => async dispatch => {
  dispatch(setLoading());
  try {
    const res: AxiosResponse = await axios.get(
      `${Api}/auth-service/admin/users`
    );
    dispatch(setUsers(res.data));
  } catch (err) {
    const { response } = err as any;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(setAlert(errorMessage?.message, "danger"));
  }
};

export const getProviders = (): AppThunk => async dispatch => {
  dispatch(setLoading());
  try {
    const res: AxiosResponse = await axios.get(
      `${Api}/auth-service/admin/providers`
    );
    dispatch(setProviders(res.data));
  } catch (err) {
    const { response } = err as any;
    const errorMessage = response?.data || "Something unexpected happend!";
    dispatch(setAlert(errorMessage?.message, "danger"));
  }
};

export const getAdmins = (): AppThunk => async dispatch => {
  dispatch(setLoading());
  try {
    const res: AxiosResponse = await axios.get(
      `${Api}/auth-service/admin/admins`
    );
    dispatch(setAdmins(res.data));
  } catch (err) {
    const { response } = err as any;
    const errorMessage = response?.data || "Something unexpected happend!";
    dispatch(setAlert(errorMessage?.message, "danger"));
  }
};

export const getCategories = (): AppThunk => async dispatch => {
  dispatch(setLoading());
  try {
    const res: AxiosResponse = await axios.get(
      `${Api}/auth-service/admin/categories`
    );
    dispatch(setCategories(res.data));
  } catch (err) {
    const { response } = err as any;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(setAlert(errorMessage?.message, "danger"));
  }
};

export const addProvider =
  (formData: AddProviderSchema): AppThunk =>
  async dispatch => {
    dispatch(setLoading());
    try {
      const res: AxiosResponse = await axios.post(
        `${Api}/auth-service/admin/create-provider`,
        formData
      );
      dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage?.message, "danger"));
    }
  };

export const deleteProvider =
  (username: string): AppThunk =>
  async dispatch => {
    dispatch(setLoading());
    try {
      const res: AxiosResponse = await axios.delete(
        `${Api}/auth-service/admin/delete-provider/${username}`
      );
      dispatch(setUsers(res.data));
      dispatch(getProviders());
    } catch (err) {
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage?.message, "danger"));
    }
  };

export const updateProvider =
  (formData: UpgradeUserSchema): AppThunk =>
  async dispatch => {
    dispatch(setLoading());
    try {
      const res: AxiosResponse = await axios.patch(
        `${Api}/auth-service/admin/upgrade-provider`,
        formData
      );
      dispatch(setUsers(res.data));
      dispatch(getUsers());
    } catch (err) {
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage?.message, "danger"));
    }
  };

export const addCategory =
  (formData: AddCategorySchema): AppThunk =>
  async dispatch => {
    dispatch(setLoading());
    try {
      const res: AxiosResponse = await axios.post(
        `${Api}/auth-service/admin/add-category`,
        formData
      );
      dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage?.message, "danger"));
    }
  };

export const editCategory =
  (formData: EditCategorySchema): AppThunk =>
  async dispatch => {
    dispatch(setLoading());
    try {
      const res: AxiosResponse = await axios.patch(
        `${Api}/auth-service/admin/edit-category`,
        formData
      );
      dispatch(setCategories(res.data));
    } catch (err) {
      const { response } = err as any;

      const errorMessage = response?.data || "Something unexpected happend!";

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

export default adminSlice.reducer;
