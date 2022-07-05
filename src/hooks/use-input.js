import { useState } from 'react';

const useInput = (initialValue, validateValue) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isInputBlank, setIsInputBlank] = useState(true);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const changeInputHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const blurInputHandler = (event) => {
    setIsTouched(true);
    if (event.target.value.trim() !== '') setIsInputBlank(false);
    if (event.target.value.trim() === '') setIsInputBlank(true);
  };
  const resetInputHandler = () => {
    setEnteredValue(initialValue);
    setIsTouched(false);
    setIsInputBlank(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    isInputBlank,
    changeInputHandler,
    blurInputHandler,
    resetInputHandler
  };
};

export default useInput;
