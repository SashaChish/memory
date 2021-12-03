import PropTypes from 'prop-types';

import { CustomTextField } from './Input.style';

export const Input = ({ input, label, type }) => {
	const setMUIColor = () => {
		if (!input.isDirty) return '';
		if (input.inputValid) {
			return 'success';
		}
		return 'error';
	};

	const setCustomColor = () => {
		if (!input.isDirty) return '#2b2b2b';
		if (input.isDirty && !input.inputValid) return '#ff1744';
		if (input.isDirty && input.inputValid) return '#00a152';
		return '#3d5afe';
	};

	return (
		<CustomTextField
			onBlur={input.onBlur}
			onChange={input.onChange}
			value={input.value}
			type={type}
			label={label}
			variant='filled'
			size='small'
			color={setMUIColor()}
			customcolor={setCustomColor()}
			fullWidth
		/>
	);
};

Input.defaultProps = {
	type: 'text',
};

Input.propTypes = {
	input: PropTypes.shape({
		isDirty: PropTypes.bool.isRequired,
		inputValid: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
	}).isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
};
