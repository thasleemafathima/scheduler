import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1] || initial;

  function transition(newMode, replace = false) {
    setHistory(replace ? [...history.slice(0, -1), newMode] : [...history, newMode]);
  }

  function back() {
    setHistory(history.slice(0, -1));
  }
  
  return { mode , transition, back };
}
