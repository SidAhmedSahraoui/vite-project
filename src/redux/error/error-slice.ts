import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ErrorState } from "../../types";
import { AppThunk } from "../store";
import { toast } from "react-hot-toast";
import colors from "../../styling/colors";
const initialState: ErrorState = [];

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, action) => {
      state.push({
        id: action.payload.id,
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    removeError: (state, action) => {
      return state.filter(error => error.id !== action.payload);
    },
  },
});

export const { addError, removeError } = errorSlice.actions;

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

export default errorSlice.reducer;
