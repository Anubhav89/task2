// src/hooks/useForm.js
import { useState, useCallback } from 'react';

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleMultipleCheckboxes = useCallback((name, value, checked) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: checked
        ? [...(prevValues[name] || []), value]
        : (prevValues[name] || []).filter(item => item !== value)
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(Object.keys(validationErrors).length === 0);
  }, [values, validate]);

  return { 
    values, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleMultipleCheckboxes, 
    handleSubmit 
  };
};

export default useForm;