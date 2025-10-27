import { useState, useCallback, useRef, useEffect } from "react";

export const useForm = (inputValues = {}) => {
  const initialValues = useRef(inputValues);
  const [values, setValues] = useState(inputValues);

  // Update the ref if inputValues changes
  useEffect(() => {
    initialValues.current = inputValues;
  }, [inputValues]);

  const handleChange = useCallback((event) => {
    const { value, name } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues.current);
  }, []);

  return { values, handleChange, setValues, resetForm };
};