import _debounce from "lodash/debounce";
import { useCallback, useEffect, useRef } from "react";

/**
 * Debounce hook.
 * @param {T} callback
 * @param {number} delay
 * @returns {T}
 */
function useDebounce(callback, delay) {
  const callbackRef = useRef(callback);
  // Update the current callback each time it changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const debouncedFn = useCallback(
    _debounce((...args) => {
      callbackRef.current(...args);
    }, delay),
    [delay],
  );
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);
  return debouncedFn;
}

export default useDebounce;
