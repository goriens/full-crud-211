import axios from "axios";
import * as Types from "./actionTypes";

export const getTasks = () => (dispatch) => {
  dispatch({ type: Types.GET_TASKS_REQUEST });
  return axios
    .get("http://localhost:5000/tasks")
    .then((r) => dispatch({ type: Types.GET_TASKS_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: Types.GET_TASKS_FAILURE, payload: e }));
};

export const updateTask = (id, payload) => (dispatch) => {
  dispatch({ type: Types.UPDATE_TASKS_REQUEST });
  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: Types.UPDATE_TASKS_SUCCESS, payload: r.data });
    })
    .catch((e) => dispatch({ type: Types.UPDATE_TASKS_FAILURE, payload: e }));
};

export const addSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: Types.ADD_SUB_TASK_REQUEST });
  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((r) => dispatch({ type: Types.ADD_SUB_TASK_SUCCESS, payload: r }))
    .catch((e) => dispatch({ type: Types.ADD_SUB_TASK_FAILURE, payload: e }));
};

export const deleteSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: Types.DELETE_SUB_TASK_REQUEST });
  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((r) => dispatch({ type: Types.DELETE_SUB_TASK_SUCCESS, payload: r }))
    .catch((e) =>
      dispatch((e) =>
        dispatch({ type: Types.DELETE_SUB_TASK_FAILURE, payload: e })
      )
    );
};
