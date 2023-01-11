import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidators = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const field of Object.keys(formValidation)) {
      if (formValidation[field] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    let { name, value } = target;

    //prettier-ignore
    value = ["radio", "checkbox"].includes(target.type) ? target.checked : target.value;

    // console.log({ type: target.type, name, value });

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidators)) {
      const [fn, errorMessage = `Valor incorrecto en ${formField}`] =
        formValidators[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
