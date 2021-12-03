import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
	const [isEmpty, setEmpty] = useState(true);
	const [minLengthError, setMinLengthError] = useState(false);
	const [maxLengthError, setMaxLengthError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);
	const [inputValid, setInputValid] = useState(false);

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					setMinLengthError(
						value.length < validations[validation] ? true : false
					);
					break;
				case 'maxLength':
					setMaxLengthError(
						value.length > validations[validation] ? true : false
					);
					break;
				case 'isEmpty':
					setEmpty(value ? false : true);
					break;
				case 'isEmail': {
					const reg =
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
					setEmailError(!reg.test(value));
					break;
				}
				case 'isUsername': {
					const reg =
						/^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
					setUsernameError(!reg.test(value));
					break;
				}

				default:
					return;
			}
		}
	}, [value, validations]);

	useEffect(() => {
		if (
			isEmpty ||
			minLengthError ||
			maxLengthError ||
			emailError ||
			usernameError
		) {
			setInputValid(false);
		} else {
			setInputValid(true);
		}
	}, [isEmpty, minLengthError, maxLengthError, emailError, usernameError]);

	return {
		inputValid,
	};
};

export const useInput = (initValue, validations) => {
	const [value, setValue] = useState(initValue);
	const [isDirty, setDirty] = useState(false);
	const valid = useValidation(value, validations);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = (e) => {
		setDirty(true);
	};

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...valid,
	};
};
