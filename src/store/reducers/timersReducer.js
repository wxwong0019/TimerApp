const timersReducer = (state = [], action) => {
  switch (action.type) {
    case 'addTimer':
      console.log('addTimer :' + typeof state);
      var newState = [...state];
      if (newState.length === 0) {
        newState.push(action.payload);
        return newState;
      }
      // newState.splice(0, 0, action.payload);
      for (let i = 0; i < newState.length; i++) {
        if (newState[i] === null) continue;
        if (action.payload.startTime <= newState[i].updateTime) {
          newState.splice(i, 0, action.payload);
          break;
        }
      }
      if (
        newState[newState.length - 1] === null ||
        action.payload.startTime > newState[newState.length - 1].updateTime
      ) {
        newState.push(action.payload);
      }

      return newState;
    case 'removeTimer':
      console.log('removeTimer :' + action.payload);
      var newState = [...state];
      newState.splice(action.payload, 1, null);
      return newState;
    case 'updateTimer':
      console.log(
        'updateTimer :' + action.payload.position + ' ' + action.payload.time
      );
      var newState = [...state];
      if (newState[action.payload.position] !== null) {
        newState[action.payload.position].updateTime = action.payload.time;
      }
      return newState;
    case 'sortTimer':
      var newState = [...state];
      if (newState.length > 1) {
        newState.sort((a, b) => {
          console.log('a :' + a.updateTime + ' b :' + b.updateTime);
          return a.updateTime - b.updateTime;
        });
      }

      return newState;
    default:
      return state;
  }
};

export default timersReducer;
