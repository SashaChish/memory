import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useInput } from '../../hooks';

import { Input } from '../../components/Input';

import {
	ContentContainer,
	ContentWrapper,
	Form,
	FormTitle,
	FormWrapper,
	Line,
	MainBlock,
	PageWrapper,
	SwitchLoginBlock,
	Title,
	BlockWrapper,
	AgreementText,
} from './RegistrationPage.style';

export const RegistrationPage = () => {
	const [isValidForm, setValidForm] = useState(false);
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

	const onSumitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<PageWrapper>
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
								<BlockWrapper>
									<Input label='Email' input={email} />
								</BlockWrapper>
								<BlockWrapper>
									<Input label='Full name' input={fullName} />
								</BlockWrapper>
								<BlockWrapper>
									<Input label='Username' input={username} />
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
		</PageWrapper>
	);
};
