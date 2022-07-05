import { useState, useCallback, useRef, useEffect } from 'react';

const useFetchGeneric = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; //is set true on mount
    return () => {
      mounted.current = false; //is set false on unmount
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyDataFn) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {}
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error(data.error.message);
      } else applyDataFn(data);
    } catch (err) {
      if (mounted.current) setError(err.message || 'Something went wrong!');
    }
    if (mounted.current) setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useFetchGeneric;
