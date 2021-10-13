const timersReducer = (state = [], action) => {
    switch (action.type) {
      case 'addTimer':
        console.log('addTimer :' + action.payload.startTime);
        var newState = [...state];
        if (newState.length === 0) {
          console.log("newState.length === 0")
          newState.push(action.payload);
          return newState;
        }
        // newState.splice(0, 0, action.payload);
        for (let i = 0; i < newState.length; i++) {
            console.log("entered forLoop")
          if (newState[i] === null){
            console.log("entered continue")
            continue;
          } 
          if (action.payload.startTime <= newState[i].startTime) {
            console.log("splice :"+action.payload.startTime+" to :"+newState[i].startTime)
            newState.splice(i, 0, action.payload);
            break;
          }
        }
        if (
          newState[newState.length - 1] === null ||
          action.payload.startTime > newState[newState.length - 1].startTime
        ) {
            console.log("action.payload.startTime > newState[newState.length - 1].startTime? :"+ (action.payload.startTime>newState[newState.length - 1].startTime))
          newState.push(action.payload);
        }
  
        return newState;
      case 'removeTimer':
        console.log('removeTimer :' + action.payload);
        var newState = [...state];
        newState.splice(action.payload, 1, null);
        return newState;
      default:
        return state;
    }
  };
  
  export default timersReducer;
  