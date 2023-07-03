import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  PlanningState,
  Planning,
  AddPlanningSchema,
  Appointment,
} from "../../types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import colors from "../../styling/colors";
import { URL as Api } from "../../utils/api";

const initialState: PlanningState = {
  loading: false,
  planning: null,
  days: [],
  slots: [],
  error: [],
  provider_appointments: [],
  client_appointments: [],
  appointment: null,
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
    clientAppointmentsLoaded: (state, action) => {
      state.loading = false;
      state.client_appointments = action.payload;
      state.error = [];
    },
    providerAppointmentsLoaded: (state, action) => {
      state.loading = false;
      state.provider_appointments = action.payload;
      state.error = [];
    },
    appointmentLoaded: (state, action) => {
      state.loading = false;
      state.appointment = {
        appointmentId: action.payload.appointmentId,
        clientEmail: action.payload.clientEmail,
        providerEmail: action.payload.providerEmail,
        appointmentDate: action.payload.appointmentDate,
        startsAt: action.payload.startsAt,
        endsAt: action.payload.endsAt,
        isPayed: action.payload.isPayed,
      };
      state.error = [];
    },
    setLoading: state => {
      state.loading = true;
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
  },
});

export const {
  resetState,
  slotsLoaded,
  daysLoaded,
  planningLoaded,
  clientAppointmentsLoaded,
  providerAppointmentsLoaded,
  appointmentLoaded,
  setLoading,
  addError,
  removeError,
  clearErrors,
} = PlanningSlice.actions;

export const getDays = (): AppThunk => async dispatch => {
  try {
    dispatch(setLoading());
    const res: AxiosResponse = await axios.get(
      `${Api}/interview-service/interviews/days`
    );
    dispatch(daysLoaded(res.data));
  } catch (err) {
    console.log(err);
    dispatch(addError("Error loading days"));
  }
};

export const getSlots = (): AppThunk => async dispatch => {
  try {
    dispatch(setLoading());
    const res: AxiosResponse = await axios.get(
      `${Api}/interview-service/interviews/slots`
    );
    dispatch(slotsLoaded(res.data));
  } catch (err) {
    console.log(err);
    dispatch(addError("Error loading slots"));
  }
};

export const getPlanning =
  (username: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.get(
        `${Api}/interview-service/interviews/${username}`
      );
      const planning: Planning = res.data;
      planning.slots = planning?.slots?.sort(
        (a, b) => a.timeSlotId - b.timeSlotId
      );
      dispatch(planningLoaded(planning));
    } catch (err) {
      const fakePlanning: Planning = {
        days: [
          {
            dayId: 2,
            dayName: "MONDAY",
          },
          {
            dayId: 4,
            dayName: "WEDNESDAY",
          },
          {
            dayId: 6,
            dayName: "FRIDAY",
          },
          {
            dayId: 1,
            dayName: "SUNDAY",
          },
          {
            dayId: 3,
            dayName: "TUESDAY",
          },
          {
            dayId: 7,
            dayName: "SATURDAY",
          },
          {
            dayId: 5,
            dayName: "THURSDAY",
          },
        ],
        slots: [
          {
            timeSlotId: 23,
            startsAt: "11:00:00",
            endsAt: "11:30:00",
          },
          {
            timeSlotId: 43,
            startsAt: "21:00:00",
            endsAt: "21:30:00",
          },

          {
            timeSlotId: 5,
            startsAt: "02:00:00",
            endsAt: "02:30:00",
          },
          {
            timeSlotId: 18,
            startsAt: "08:30:00",
            endsAt: "09:00:00",
          },
          {
            timeSlotId: 38,
            startsAt: "18:30:00",
            endsAt: "19:00:00",
          },
          {
            timeSlotId: 14,
            startsAt: "06:30:00",
            endsAt: "07:00:00",
          },
          {
            timeSlotId: 19,
            startsAt: "09:00:00",
            endsAt: "09:30:00",
          },
          {
            timeSlotId: 3,
            startsAt: "01:00:00",
            endsAt: "01:30:00",
          },
          {
            timeSlotId: 9,
            startsAt: "04:00:00",
            endsAt: "04:30:00",
          },
          {
            timeSlotId: 28,
            startsAt: "13:30:00",
            endsAt: "14:00:00",
          },
          {
            timeSlotId: 31,
            startsAt: "15:00:00",
            endsAt: "15:30:00",
          },
          {
            timeSlotId: 11,
            startsAt: "05:00:00",
            endsAt: "05:30:00",
          },
          {
            timeSlotId: 33,
            startsAt: "16:00:00",
            endsAt: "16:30:00",
          },
        ],
      };
      fakePlanning.slots = fakePlanning?.slots?.sort(
        (a, b) => a.timeSlotId - b.timeSlotId
      );
      dispatch(planningLoaded(fakePlanning));

      console.log(err);
      dispatch(addError("Error loading planning"));
    }
  };

export const addPlanning =
  (planning: AddPlanningSchema): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.post(
        `${Api}/interview-service/interviews/add-planning`,
        planning
      );
      dispatch(planningLoaded(res.data));
    } catch (err) {
      console.log(err);
      dispatch(addError("Error adding planning"));
    }
  };

export const getAppointments =
  (id: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.get(
        `${Api}/interview-service/interviews/appointment/${id}`
      );
      console.log(res.data);
      dispatch(appointmentLoaded(res.data));
    } catch (err) {
      console.log(err);
      dispatch(addError("Error loading appointment"));
    }
  };
export const addAppointment =
  (appointment: Appointment): AppThunk =>
  async dispatch => {
    try {
      const res: AxiosResponse = await axios.post(
        `${Api}/interview-service/interviews/add-appointment`,
        appointment
      );
      console.log(res.data?.appointmentId);
      localStorage.setItem("appointmentId", res.data?.appointmentId);
      dispatch(setAlert("Appointment added successfully", "success"));
    } catch (err) {
      const { response } = err as AxiosError;
      const errorMessage: any =
        response?.data || "Something unexpected happend!";

      dispatch(setAlert(errorMessage?.message, "danger"));
    }
  };

export const getAppointmentsForClient =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.get(
        `${Api}/interview-service/interviews/appointments/client/${id}`
      );
      dispatch(clientAppointmentsLoaded(res.data));
    } catch (err) {
      console.log(err);
      dispatch(addError("Error loading appointments"));
    }
  };

export const getAppointmentsForProvider =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.get(
        `${Api}/interview-service/interviews/appointments/provider/${id}`
      );
      dispatch(providerAppointmentsLoaded(res.data));
    } catch (err) {
      console.log(err);
      dispatch(addError("Error loading appointments"));
    }
  };

export const cancelAppointment =
  (id: number, email: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.delete(
        `${Api}/interview-service/interviews/appointments/${id}`
      );
      dispatch(setAlert(res.data?.message, "success"));
      dispatch(getAppointmentsForClient(email));
      dispatch(getAppointmentsForProvider(email));
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Error canceling appointment", "danger"));
    }
  };

export const payment =
  (formData: FormData): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      console.log(typeof formData.get("appointmentId"));
      const res: AxiosResponse = await axios.post(
        `${Api}/interview-service/interviews/payment`,
        formData
      );
      dispatch(setAlert(res.data?.message, "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Error canceling appointment", "danger"));
    }
  };

export const uploadFile =
  (formData: FormData): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading());
      const res: AxiosResponse = await axios.post(
        `${Api}/interview-service/interviews/info`,
        formData
      );
      dispatch(setAlert(res.data?.message, "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Error canceling appointment", "danger"));
    }
  };

export const downloadFile =
  (apointmentId: number): AppThunk =>
  async dispatch => {
    try {
      const response: AxiosResponse = await axios({
        url: `${Api}/interview-service/interviews/info/${apointmentId}`,
        method: "GET",
        responseType: "blob", // Set the response type to 'blob' for downloading files
      });

      // Create a temporary URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL and link element
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      dispatch(setAlert("File downloaded successfully", "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Error canceling download", "danger"));
    }
  };

export const downloadImage =
  (apointmentId: number): AppThunk =>
  async dispatch => {
    try {
      const response: AxiosResponse = await axios({
        url: `${Api}/interview-service/interviews/download/${apointmentId}`,
        method: "GET",
        responseType: "blob", // Set the response type to 'blob' for downloading files
      });

      // Create a temporary URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL and link element
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      dispatch(setAlert("Image downloaded successfully", "success"));
    } catch (error) {
      console.error(error);
      dispatch(setAlert("Error downloading image", "danger"));
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

export default PlanningSlice.reducer;
