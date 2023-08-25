
import { useEffect, useMemo, useState } from "react";

export const useForm = (inicialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(inicialForm);

    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(inicialForm);
    }, [inicialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;

    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    };
    const onResetForm = () => {

        setFormState(inicialForm)
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            //llama la funcion y el mensaje de error que se creo en el formulario
            const [fn, errorMessage] = formValidations[formField];
            //validacion del campo del formulario para enviar los mensajes de error si es el caso
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}