import axios from "axios";
import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  GET_MY_LANDLORD_FAILURE,
  GET_MY_LANDLORD_REQUEST,
  GET_MY_LANDLORD_SUCCESS,
  GET_MY_TENANTS_FAILURE,
  GET_MY_TENANTS_REQUEST,
  GET_MY_TENANTS_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAILURE,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
} from "./ActionType";

//AUTH ACTIONS

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    dispatch(registerSuccess({ jwt: user.jwt }));
    dispatch(getUser(user.jwt));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Registration failed";

    dispatch(registerFailure(errorMessage));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData, navigate) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData
    );
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      localStorage.setItem("role", user.user?.role);
    }

    dispatch(loginSuccess(user));
    await dispatch(getUser(user.jwt));

    const role = user.user?.role;

    if (role === "LANDLORD") {
      navigate("/landlord");
    } else if (role === "TENANT") {
      navigate("/tenant");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {
    dispatch(
      loginFailure(error.response?.data?.message || "Invalid credentials")
    );
  }
};

//USER PROFILE

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());

  const token = localStorage.getItem("jwt");
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

//TENANT / LANDLORD

export const getMyTenantsRequest = () => ({
  type: GET_MY_TENANTS_REQUEST,
});

export const getMyTenantsSuccess = (tenants) => ({
  type: GET_MY_TENANTS_SUCCESS,
  payload: tenants,
});

export const getMyTenantsFailure = (error) => ({
  type: GET_MY_TENANTS_FAILURE,
  payload: error,
});

export const getMyTenants = (jwt) => async (dispatch) => {
  dispatch(getMyTenantsRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/me/my-tenants`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    dispatch(getMyTenantsSuccess(response.data));
  } catch (error) {
    dispatch(getMyTenantsFailure(error.message));
  }
};

export const getMyLandlordRequest = () => ({
  type: GET_MY_LANDLORD_REQUEST,
});

export const getMyLandlordSuccess = (landlord) => ({
  type: GET_MY_LANDLORD_SUCCESS,
  payload: landlord,
});

export const getMyLandlordFailure = (error) => ({
  type: GET_MY_LANDLORD_FAILURE,
  payload: error,
});

export const getMyLandlord = (jwt) => async (dispatch) => {
  dispatch(getMyLandlordRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/me/my-landlord`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    dispatch(getMyLandlordSuccess(response.data));
  } catch (error) {
    dispatch(getMyLandlordFailure(error.message));
  }
};

//USER UPDATES
export const updateSubscription =
  (subscriptionData, token) => async (dispatch) => {
    dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });

    try {
      const { data } = await api.put(
        "/api/users/subscription",
        subscriptionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: UPDATE_SUBSCRIPTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBSCRIPTION_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const updateProfileImage =
  (imageLink, token) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_IMAGE_REQUEST });

    try {
      const { data } = await api.put(
        "/api/users/profile-image",
        { image: imageLink },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: UPDATE_PROFILE_IMAGE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_IMAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// LOGOUT

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
};