import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { PlanningState, Planning } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import colors from "../../styling/colors";
const initialState: PlanningState = {
  loading: false,
  planning: null,
  days: [],
  slots: [],
  error: [],
};

export const PlanningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    resetState: state => {
      state.planning = null;
      state.days = [];
      state.slots = [];
      state.error = [];
    },
    slotsLoaded: (state, action) => {
      state.loading = false;
      state.slots = action.payload;
      state.error = [];
    },
    daysLoaded: (state, action) => {
      state.loading = false;
      state.days = action.payload;
      state.error = [];
    },

    planningLoaded: (state, action) => {
      state.loading = false;
      state.planning = action.payload;
      state.error = [];
    },
    setLoading: state => {
      state.loading = true;
    },
    addError: (state, action) => {
      state.error.push({
        id: uuidv4(),
        message: action.payload,
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
  },
});

export const {
  resetState,
  slotsLoaded,
  daysLoaded,
  planningLoaded,
  setLoading,
  addError,
  removeError,
  clearErrors,
} = PlanningSlice.actions;

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
