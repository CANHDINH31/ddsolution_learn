export const loginAction = (data) => (dispatch) => {
  dispatch({ type: "LOGIN", payload: data });
};

export const logoutAction = (data) => (dispatch) => {
  dispatch({ type: "LOGOUT", payload: data });
};

export const deleteAction = (data) => (dispatch) => {
  dispatch({ type: "DELETE", payload: data });
};

export const addAciton = (data) => (dispatch) => {
  dispatch({ type: "ADD", payload: data });
};
