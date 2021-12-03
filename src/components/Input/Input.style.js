import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomTextField = styled(TextField)`
	& label {
		color: ${({ customcolor }) => customcolor};
	}
`;
