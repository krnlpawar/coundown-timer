import React, { useRef, useState } from "react";

export default function CountdownTimer() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const [selectedDate, setSelectedDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      const timeDifference = calculateTimeDifference();
      if (timeDifference <= 0) {
        setIsTimerRunning(false);
        resetTimer();
      }
    }, 1000);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsTimerRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
    setSelectedTime("00:00");
  };

  const calculateTimeDifference = () => {
    const futureDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
    const now = new Date();
    const difference = futureDateTime - now;

    if (difference <= 0) {
      return 0;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

	setDays(days);
	setHours(hours);
	setMinutes(minutes);
	setSeconds(seconds);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div className="countdown-timer">
      <h2>Countdown Timer</h2>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        min={tomorrow.toISOString().split("T")[0]}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <label htmlFor="time">Time:</label>
      <input
        type="time"
        id="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
      <button id="start-button" onClick={startTimer} disabled={isTimerRunning}>
        Start
      </button>
      <button id="stop-button" onClick={stopTimer} disabled={!isTimerRunning}>
        Stop
      </button>
      <button id="reset-button" onClick={resetTimer}>
        Reset
      </button>

      <br />
      <div className="time-container">
        <span className="time" id="days">
          {days}
        </span>
        <span className="time-label">Days</span>
      </div>
      <div className="time-container">
        <span className="time" id="hours">
          {hours}
        </span>
        <span className="time-label">Hours</span>
      </div>
      <div className="time-container">
        <span className="time" id="minutes">
          {minutes}
        </span>
        <span className="time-label">Minutes</span>
      </div>
      <div className="time-container">
        <span className="time" id="seconds">
          {seconds}
        </span>
        <span className="time-label">Seconds</span>
      </div>
    </div>
  );
}
