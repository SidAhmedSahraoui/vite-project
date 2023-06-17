import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { URL as Api } from "../../utils/api";
import { CategoriesState } from "../../types";
import { v4 as uuidv4 } from "uuid";

const initialState: CategoriesState = {
  categories: [],
  hiring_categories: [],
  study_categories: [],
  loading_categories: false,
  loading: false,
  category: null,
  loading_providers: false,
  providers: [],
  loading_provider: false,
  provider: null,
  error: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetState: state => {
      state.categories = [];
      state.hiring_categories = [];
      state.study_categories = [];
      state.loading_categories = false;
      state.loading = false;
      state.category = null;
      state.loading_providers = false;
      state.providers = [];
      state.loading_provider = false;
      state.provider = null;
      state.error = [];
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
      state.hiring_categories = action.payload.filter(
        (category: any) => category.type === "hiring"
      );
      state.study_categories = action.payload.filter(
        (category: any) => category.type === "study"
      );

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
    addError: (state, action) => {
      state.error.push({
        id: uuidv4(),
        message: action.payload,
        type: "danger",
      });
      console.log(action.payload);
    },
    clearErrors: state => {
      state.error = [];
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
  addError,
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
    const fakeData = [
      {
        categoryId: 1,
        title: "Entretien Campus France",
        description:
          "Pratiquez l'entretien Campus France avec nos experts n'hésitez plus ! réservez maintenant un entretien 1: 1, vous pouvez également réserver un entretien avec un expert pour vous aider à préparer votre dossier de candidature.",
        type: "study",
        space: "INTERVIEW",
      },
      {
        categoryId: 2,
        title: "Frontend Developer Interview",
        description:
          "Assurez-vous d'avoir les connaissances nécessaires pour obtenir votre premier emploi en tant qu'ingénieur frontend et grandir dans votre première étape dans le domaine informatique",
        type: "hiring",
        space: "INTERVIEW",
      },
      {
        categoryId: 3,
        title: "Backend Developer Interview",
        description:
          "Pratiquer toutes les questions de compétences backend,de la conception de l'API à la mise en œuvre et aux meilleures pratiques, Java, SQL ...",
        type: "hiring",
        space: "INTERVIEW",
      },
      {
        categoryId: 4,
        title: "Study in Canada",
        description:
          "Choisissez le pays et l'université : Renseignez-vous sur les différents pays et les universités qui offrent les programmes d'études qui vous intéressent. Considérez des facteurs tels que la réputation académique, les frais de scolarité, etc.",
        type: "study",
        space: "INTERVIEW",
      },
      {
        categoryId: 5,
        title: "Study in Turkey",
        description:
          "Préparez les documents nécessaires : Rassemblez les documents requis pour votre candidature, tels que les relevés de notes, les lettres de recommandation, les essais personnels, etc. Vérifiez les exigences spécifiques de chaque université.",
        type: "study",
        space: "INTERVIEW",
      },
    ];
    dispatch(LoadedCategories(fakeData));
    const { response } = err as AxiosError;

    const errorMessage = response?.data || "Something unexpected happend!";

    dispatch(addError(errorMessage));
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

      dispatch(addError(errorMessage));
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

      dispatch(addError(errorMessage));
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

      dispatch(addError(errorMessage));
    }
  };

export default categoriesSlice.reducer;
