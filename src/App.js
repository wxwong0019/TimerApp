import React, { useState, Component, useEffect } from 'react';
import { Timer } from './Timer';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store/actions/index';
import './App.css';

function App() {
  const timerList = useSelector((state) => state.timersReducer);
  console.log(timerList);

  const dispatch = useDispatch();

  const { addTimer, removeTimer } = bindActionCreators(
    actionCreators,
    dispatch
  );
  // const [timerList, setTimerList] = useState([]);
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  // Handle User Input for Hours, Minutes and Seconds
  const handleSetInputHours = (e) => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setInputHours(parseInt(e.target.value));
    }
  };
  const handleSetInputMinutes = (e) => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setInputMinutes(parseInt(e.target.value));
    }
  };
  const handleSetInputSeconds = (e) => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setInputSeconds(parseInt(e.target.value));
    }
  };
  //Convert to total Seconds and push into timerList
  const handleSubmit = (e) => {
    let totalToSeconds = parseInt(inputHours * 3600 + inputMinutes * 60 + inputSeconds) ;
    // let copyTimerList = [...timerList, totalToSeconds];
    addTimer({
      startTime: totalToSeconds,
      id: timerList.length,
    });
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');

    e.preventDefault();
  };
  //Handle Disable button is all fields are empty
  const handleDisable = () => {
    return (
      inputHours.length === 0 &&
      inputMinutes.length === 0 &&
      inputSeconds.length === 0
    );
  };

  // Render Timer Components for each timer in the timerList array, pass in setTimerList and timerList for the child component to remove itself after time's up
  const handleMapTimers = () => {
    return timerList.map((timer, idx) => {
      if (timer !== null) {
        return <Timer key={timer.id} id={idx} startTime={timer.startTime} />;
      }
    });
  };
  return (
    <div>
      {/* form */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputHours}
          onChange={handleSetInputHours}
          placeholder="Hours"
        />
        <input
          type="number"
          value={inputMinutes}
          onChange={handleSetInputMinutes}
          placeholder="Minutes"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={handleSetInputSeconds}
          placeholder="Seconds"
        />
        <button type="submit">Add Timer</button>
      </form>
      {handleMapTimers()}
    </div>
  );
}


export default App;
