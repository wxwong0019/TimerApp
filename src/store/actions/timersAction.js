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
  
  export const updateTimer = (position) => {
    return (dispatch) => {
      dispatch({
        type: 'updateTimer',
        payload: position,
      });
    };
  };
  