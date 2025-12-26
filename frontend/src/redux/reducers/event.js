import { createSlice } from "@reduxjs/toolkit";

export const eventReducer = createSlice({
  name: "event",
  initialState: {
    error: null,
    createSuccess: false,
  },
  reducers: {
    eventCreateRequest: (state) => {
      state.isLoading = true;
    },
    eventCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.createSuccess = true;
    },
    eventCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.createSuccess = false;
    },
    resetCreateEvent: (state) => {
      state.createSuccess = false;
    },

    // get all events of shop
    getAllEventsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllEventsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    },
    getAllEventsShopFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllEventsRequest: (state) => {
      state.isLoading = true;
    },
    getAllEventsSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    },
    getAllEventsFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    // delete shop event
    deleteEventRequest: (state) => {
      state.isLoading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.isLoading = false;
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
      state.success = true;
    },

    deleteEventFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});
export const {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  clearErrors,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFail,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
  resetCreateEvent,
  getAllEventsRequest,
  getAllEventsSuccess,
  getAllEventsFail,
} = eventReducer.actions;

export default eventReducer.reducer;
