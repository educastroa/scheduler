import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //provides transition to New mode
  function transition(nextMode, replace = false) {
    if (replace) {
      setMode(nextMode);
    } else {
      setMode(nextMode);
      setHistory([...history, nextMode]);
    }
  }

  //return to previous mode
  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }

  return { mode, transition, back };
}