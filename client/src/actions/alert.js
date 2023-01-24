import { v4 as uuid } from "uuid";
import {
  SET_ALERT,
  REMOVE_ALERT,
} from "./types";

export const setAlert =
  (msg, alertType, timeout = 5000) => (dispatch) => {
    // from thunk ( to send more than 1 alert )
    const id = uuid.v4;

    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    // to trigger the remove_alert action 
    setTimeout(() => dispatch( { 
        type: REMOVE_ALERT, payload: id
    }), timeout);
  };
