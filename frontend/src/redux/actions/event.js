import axios from "axios";
import { server } from "../../server";
import {
  deleteEventFail,
  deleteEventRequest,
  deleteEventSuccess,
  eventCreateFail,
  eventCreateRequest,
  eventCreateSuccess,
  getAllEventsShopFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
} from "../reducers/event";

// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch(eventCreateSuccess(data));
  } catch (error) {
    dispatch(eventCreateFail(error.response.data.message));
  }
};

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllEventsShopRequest());
    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );
    console.log("Fetched Events Data:", data);
    dispatch(getAllEventsShopSuccess(data.events));
  } catch (error) {
    dispatch(getAllEventsShopFail(error.response.data.message));
  }
};

// delete product of shop

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());

    await axios.delete(`${server}/event/delete-shop-event/${id}`);

    // Pass deleted event ID
    dispatch(deleteEventSuccess(id));
  } catch (error) {
    dispatch(deleteEventFail(error.response.data.message));
  }
};
