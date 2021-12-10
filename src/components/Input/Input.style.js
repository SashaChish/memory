import { InputLabel, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomTextField = styled(TextField)`
	& label {
		color: ${({ customcolor }) => customcolor};
	}
`;

export const CustomInputLabel = styled(InputLabel)`
	color: ${({ customcolor }) => customcolor};
`;
