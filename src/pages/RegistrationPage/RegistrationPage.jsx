import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';

import { registration, userInfo } from '../../services';
import { useInput } from '../../hooks';

import { Input } from '../../components/Input';

import {
	Main,
	PageWrapper,
} from '../../theme/GlobalComponents/GlobalComponents.style';
import {
	ContentContainer,
	ContentWrapper,
	Form,
	FormTitle,
	FormWrapper,
	Line,
	MainBlock,
	SwitchLoginBlock,
	Title,
	BlockWrapper,
	AgreementText,
} from './RegistrationPage.style';

export const RegistrationPage = () => {
	const [isValidForm, setValidForm] = useState(false);
	const [isExistEmail, setExistEmail] = useState(false);
	const [isExistUsername, setExistUsername] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	const email = useInput('', { isEmpty: true, isEmail: true });
	const fullName = useInput('', { isEmpty: true, minLength: 6, maxLength: 50 });
	const password = useInput('', {
		isEmpty: true,
		minLength: 6,
		maxLength: 100,
	});
	const username = useInput('', {
		isEmpty: true,
		isUsername: true,
		maxLength: 25,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (
			email.inputValid &&
			fullName.inputValid &&
			password.inputValid &&
			username.inputValid
		) {
			setValidForm(true);
		} else {
			setValidForm(false);
		}
	}, [email, fullName, password, username]);

	const onSumitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await registration({
				email: email.value,
				password: password.value,
				fullName: fullName.value,
				username: username.value,
			});

			localStorage.setItem('x-auth-token', res.data.token);

			setTimeout(async () => {
				const userData = await userInfo();
				dispatch(setUser(userData.data));
				navigate(`/${username.value}`);
			}, 100);
		} catch (e) {
			console.log(e);
			if (e.toJSON().status === 409) {
				const { field, errors } = e.response.data;

				setExistEmail(field === 'email' ? true : false);
				setExistUsername(field === 'username' ? true : false);
				setErrorMessage(errors);
			}
		}
	};

	return (
		<PageWrapper>
			<Main>
				<ContentWrapper>
					<ContentContainer>
						<MainBlock>
							<Title>Memory</Title>
							<FormWrapper>
								<Form onSubmit={onSumitHandler}>
									<FormTitle>
										Sign up to see photos and videos from your friends.
									</FormTitle>
									<BlockWrapper>
										<Line />
									</BlockWrapper>
									{(isExistEmail || isExistUsername) && (
										<BlockWrapper color={'#ff1744'}>
											{errorMessage}
										</BlockWrapper>
									)}
									<BlockWrapper>
										<Input error={isExistEmail} label='Email' input={email} />
									</BlockWrapper>
									<BlockWrapper>
										<Input label='Full name' input={fullName} />
									</BlockWrapper>
									<BlockWrapper>
										<Input
											error={isExistUsername}
											label='Username'
											input={username}
										/>
									</BlockWrapper>
									<BlockWrapper>
										<Input label='Password' input={password} type='password' />
									</BlockWrapper>
									<BlockWrapper>
										<Button
											disabled={!isValidForm}
											type='submit'
											variant='contained'
											fullWidth
										>
											Sign up
										</Button>
									</BlockWrapper>
									<AgreementText>
										By signing up, you agree to our Terms, Date, Policy and
										Cookies Policy.
									</AgreementText>
								</Form>
							</FormWrapper>
						</MainBlock>
						<SwitchLoginBlock>
							<p>
								Have an account?
								<Link to='/login'>Log in</Link>
							</p>
						</SwitchLoginBlock>
					</ContentContainer>
				</ContentWrapper>
			</Main>
		</PageWrapper>
	);
};
