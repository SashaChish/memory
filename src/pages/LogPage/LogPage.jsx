import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material/.';
import { useState } from 'react';
import axios from 'axios';

import {
	ContentContainer,
	ContentWrapper,
	Form,
	FormWrapper,
	Line,
	MainBlock,
	PageWrapper,
	SwitchLoginBlock,
	Title,
	BlockWrapper,
} from './LogPage.style';

export const LogPage = () => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [error, setError] = useState('');
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	function submitForm(e) {
		if (
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				e.target.email.value
			) &&
			e.target.password.value.length > 4
		) {
			setError('');
			e.preventDefault();
			axios({
				method: 'post',
				url: 'http://localhost:5000/api/auth',
				headers: {
					'x-auth-token': '',
				},
				data: {
					email: e.target.email.value,
					password: e.target.password.value,
				},
			}).then((data) => console.log(data));
		} else {
			setError('error');
			e.preventDefault();
		}
	}

	return (
		<PageWrapper>
			<ContentWrapper>
				<ContentContainer>
					<MainBlock>
						<Title>Memory</Title>
						<FormWrapper>
							<Form onSubmit={submitForm}>
								<BlockWrapper>
									<Line />
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Email'
										name='email'
										className={error ? 'error' : ''}
										variant='filled'
										size='small'
										fullWidth
									/>
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Password'
										variant='filled'
										name='password'
										size='small'
										className={error ? 'error' : ''}
										fullWidth
										type={passwordShown ? 'text' : 'password'}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton onClick={togglePassword}>
														{passwordShown ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</BlockWrapper>
								<BlockWrapper>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										sx={{
											fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
											'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
											sans-serif`,
										}}
									>
										Log in
									</Button>
								</BlockWrapper>
							</Form>
						</FormWrapper>
					</MainBlock>
					<SwitchLoginBlock>
						<p>
							Don't have an account?
							<a href='/'>Sign up</a>
						</p>
					</SwitchLoginBlock>
				</ContentContainer>
			</ContentWrapper>
		</PageWrapper>
	);
};
