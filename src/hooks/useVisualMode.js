import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (final, replace = false) => {
    setMode(final);
    
    if (!replace) {
      const newHistory = [...history];
      newHistory.push(final);
      setHistory(newHistory);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      
      setMode(history[history.length - 1]);
    }
  }
  
  return { mode , transition, back };
}
