import { axiosInstance } from "../../api";

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUsersRequest",
    });

    const { data } = await axiosInstance.get("/api/v1/users");
    dispatch({
      type: "getUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const addUser = (name, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "addUserRequest",
    });

    const { data } = await axiosInstance.post(
      "/api/v1/user/add",
      {
        name,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "addUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const addRelation = (id1, id2) => async (dispatch) => {
  try {
    dispatch({
      type: "addRelationRequest",
    });

    const { data } = await axiosInstance.post(`/api/v1/relation/${id1}/${id2}`);
    dispatch({
      type: "addRelationSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addRelationFailure",
      payload: error.response.data.message,
    });
  }
};

export const getRelation = (id1, id2) => async (dispatch) => {
  try {
    dispatch({
      type: "getRelationRequest",
    });

    const { data } = await axiosInstance.get(`/api/v1/relation/${id1}/${id2}`);
    dispatch({
      type: "getRelationSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "getRelationFailure",
      payload: error.response.data.message,
    });
  }
};
