import React, { useState, Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store/actions/index';

import './App.css';

export const Timer = (props) => {
  const timerList = useSelector((state) => state.timersReducer);
  const dispatch = useDispatch();
  const { removeTimer } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [totalSeconds, setTotalSeconds] = useState(props.startTime);
  const [timeConversion, setTimeConversion] = useState({});
  const [play, setPlay] = useState(true);
  const [timerName, setTimerName] = useState('Click To Change');

  //Run whenever the state play changes
  useEffect(() => {
    //To avoid rerendering, remove it from the parent State timerList arr when terminated, timerList State passed in from parent as a prop
    if (totalSeconds === -2) {
      //remove the specific index of timerList using the id
      removeTimer(props.id);
    }
    //Set the timeConversion when this Component is first loaded
    if (
      timeConversion.hour === undefined &&
      timeConversion.minutes === undefined &&
      timeConversion.seconds === undefined
    ) {
      handleSetTimeConversion(props.startTime);
    }
    //Repeat every 1 second if play is true
    if (play || totalSeconds === -1) {
      const intervalId = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          //change the state of play to trigger the useEffect again inorder to run the unmount function to clearInverval
          if (prevTotalSeconds === -1) {
            setPlay(false);
          }
          //update the hour, min and second every 1 s to display on screen
          handleSetTimeConversion(prevTotalSeconds);

          // decrement by 1 every 1 s
          return prevTotalSeconds - 1;
        });
      }, 1000);

      //Unmount to stop the interval from running
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [play]);

  //convert total time into Hour, minutes, seconds and set it into the timeConversion state object
  const handleSetTimeConversion = (time) => {
    let hour = Math.floor(time / 3600);
    let minutesRemainder = time % 3600;
    let minutes = Math.floor(minutesRemainder / 60);
    let secondsRemainder = minutesRemainder % 60;
    let seconds = Math.ceil(secondsRemainder);

    const updateTimeConversion = {
      hours: hour,
      minutes: minutes,
      seconds: seconds,
    };
    setTimeConversion(updateTimeConversion);
  };

  return (
    <div>
      {/* conditional render the timer only if there is time left in the totalSeconds state */}
      {totalSeconds >= -1 ? (
        <div className="timer-box">
          <div>
            <input
              type="text"
              value={timerName}
              onChange={(e) => setTimerName(e.target.value)}
            />
            <div className="timer">
              {timeConversion.hours < 10
                ? '0' + timeConversion.hours
                : timeConversion.hours}{' '}
              :
              {timeConversion.minutes < 10
                ? '0' + timeConversion.minutes
                : timeConversion.minutes}{' '}
              :
              {timeConversion.seconds < 10
                ? '0' + timeConversion.seconds
                : timeConversion.seconds}
            </div>

            <button onClick={() => setPlay(!play)}>
              {play ? 'pause' : 'play'}
            </button>
            <button onClick={() => setTotalSeconds(props.startTime)}>
              reset
            </button>
            <button onClick={() => setTotalSeconds(-1)}>delete</button>
          </div>
        </div>
      ) : // alert('times up for ' + timerName)
      null}
    </div>
  );
};
