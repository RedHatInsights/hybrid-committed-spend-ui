// Hook
import { useCallback, useEffect, useRef, useState } from 'react';

export const usePrevious = value => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

export const useStateCallback = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((_state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(_state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    /**
     * cb.current is `null` on initial render,
     * so we only invoke callback on state updates
     */
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};
