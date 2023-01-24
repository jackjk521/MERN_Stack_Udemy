import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED , CLEAR_PROFILE, GET_PROFILES, GET_REPOS } from "./types";

// Get current users profile

export const getCurrentProfile = () => async (dispatch) => {

  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all users profile

export const getAllProfiles = () => async (dispatch) => {
  dispatch( {
    type: CLEAR_PROFILE
  })
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get user profile by id

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all github repos

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};


export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/profile",
        formData,
        config
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          edit ? "Profile Updated" : "Profile Created"
        )
      );

      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((err) =>
          dispatch(setAlert(err.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

  // Add experience

  export const addExperience = (formData, edit =false) => async dispatch => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        "/api/profile/experience",
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          'Experience Added', 'success'
        )
      );

      // if (!edit) {
      //   nav("/dashboard");
      // }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((err) =>
          dispatch(setAlert(err.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }

  // Add education

  export const addEducation = (formData, edit =false) => async dispatch => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        "/api/profile/education",
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          'Education Added', 'success'
        )
      );

      // if (!edit) {
      //   nav("/dashboard");
      // }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((err) =>
          dispatch(setAlert(err.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }

  // Delete experience

  export const delExperience = (exp_id) => async dispatch => {
    try {
      const res = await axios.delete(
         `/api/profile/experience/${exp_id}`
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          'Experience Removed', 'success'
        )
      );

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((err) =>
          dispatch(setAlert(err.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }

  // Delete Education 
  export const delEducation = (edu_id) => async dispatch => {
    try {
      const res = await axios.delete(
         `/api/profile/education/${edu_id}`
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          'Education Removed', 'success'
        )
      );

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((err) =>
          dispatch(setAlert(err.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }

  // Delete account and profile 
  export const delAccount = (id) => async dispatch => {
    if(window.confirm( 'Are you sure " This can NOT be undone!')) {
      try {
        const res = await axios.delete(
           `/api/profile`
        );
  
        dispatch({
          type: CLEAR_PROFILE,
        });
         dispatch({
          type: ACCOUNT_DELETED,
        });
  
        dispatch(
          setAlert( 'Your Account has been permanently deleted'))
  
      } catch (err) {
  
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  }