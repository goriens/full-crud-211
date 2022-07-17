import * as Types from "./actionTypes";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Types.GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: payload,
      };
    case Types.GET_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
