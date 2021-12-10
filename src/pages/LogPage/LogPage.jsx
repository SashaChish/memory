import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material/.';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';
import { userInfo } from '../../services';

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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function submitForm(e) {
		e.preventDefault();

		const reg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (reg.test(e.target.email.value) && e.target.password.value.length > 4) {
			setError('');
			axios({
				method: 'post',
				url: 'http://localhost:5000/api/auth',
				data: {
					email: e.target.email.value,
					password: e.target.password.value,
				},
			}).then(async (data) => {
				localStorage.setItem('x-auth-token', data.data.token);

				const userData = await userInfo();

				dispatch(setUser(userData.data));

				navigate('/username');
			});
		} else {
			setError('error');
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
							<Link to='/registration'>Sign up</Link>
						</p>
					</SwitchLoginBlock>
				</ContentContainer>
			</ContentWrapper>
		</PageWrapper>
	);
};
