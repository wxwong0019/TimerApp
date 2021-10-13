export const addTimer = (startTime) => {
  return (dispatch) => {
    dispatch({
      type: 'addTimer',
      payload: startTime,
    });
  };
};

export const removeTimer = (position) => {
  return (dispatch) => {
    dispatch({
      type: 'removeTimer',
      payload: position,
    });
  };
};

export const updateTimer = (position, t) => {
  return (dispatch) => {
    dispatch({
      type: 'updateTimer',
      payload: { position: position, time: t },
    });
  };
};
export const sortTimer = () => {
  return (dispatch) => {
    dispatch({
      type: 'sortTimer',
      payload: null,
    });
  };
};
