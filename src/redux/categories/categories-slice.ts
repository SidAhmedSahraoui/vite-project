import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { URL as Api } from "../../utils/api";
import { CategoriesState } from "../../types";

const initialState: CategoriesState = {
  categories: [],
  loading_categories: false,
  loading: false,
  category: null,
  loading_providers: false,
  providers: [],
  loading_provider: false,
  provider: null,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetState: state => {
      state.categories = [];
      state.loading_categories = false;
      state.loading = false;
      state.category = null;
      state.loading_providers = false;
      state.providers = [];
      state.loading_provider = false;
      state.provider = null;
      state.error = null;
    },
    setLoading: state => {
      state.loading = true;
    },
    Loaded: (state, action) => {
      state.category = action.payload;
      state.loading = false;
    },
    setLoadingCategories: state => {
      state.loading_categories = true;
    },
    LoadedCategories: (state, action) => {
      state.categories = action.payload;
      state.loading_categories = false;
    },
    setLoadingProviders: state => {
      state.loading_providers = true;
    },
    LoadedProviders: (state, action) => {
      state.providers = action.payload;
      state.loading_providers = false;
    },
    setLoadingProvider: state => {
      state.loading_provider = true;
    },
    LoadedProvider: (state, action) => {
      state.provider = action.payload;
      state.loading_provider = false;
    },
    setAlert: (state, action) => {
      state.error = action.payload;
    },
    clearErrors: state => {
      state.error = null;
    },
  },
});

export const {
  resetState,
  setLoading,
  Loaded,
  setLoadingCategories,
  LoadedCategories,
  setLoadingProviders,
  LoadedProviders,
  setLoadingProvider,
  LoadedProvider,
  setAlert,
  clearErrors,
} = categoriesSlice.actions;

export const loadCategories = (): AppThunk => async dispatch => {
  try {
    dispatch(setLoadingCategories());
    const res: AxiosResponse = await axios.get(
      `${Api}/auth-service/admin/categories`
    );
    dispatch(LoadedCategories(res.data));
  } catch (err) {
    const { response } = err as AxiosError;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(setAlert(errorMessage));
  }
};

export const loadCategory =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      const categoryId = parseInt(id);
      dispatch(setLoading());
      const res: AxiosResponse = await axios.get(
        `${Api}/auth-service/user/category/${categoryId}/`
      );
      dispatch(Loaded(res.data));
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage));
    }
  };

export const loadProviders =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      const categoryId = parseInt(id);
      dispatch(setLoadingProviders());
      const res: AxiosResponse = await axios.get(
        `${Api}/auth-service/user/category/${categoryId}/providers`
      );
      dispatch(LoadedProviders(res.data));
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage));
    }
  };

export const loadProvider =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoadingProvider());
      const res: AxiosResponse = await axios.get(
        `${Api}/interview-service/interviews/${id}`
      );
      dispatch(LoadedProvider(res.data));
    } catch (err) {
      const { response } = err as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage));
    }
  };

export default categoriesSlice.reducer;
