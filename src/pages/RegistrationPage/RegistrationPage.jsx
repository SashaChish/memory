import { Button, TextField } from '@mui/material';

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
	return (
		<PageWrapper>
			<ContentWrapper>
				<ContentContainer>
					<MainBlock>
						<Title>Memory</Title>
						<FormWrapper>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									console.log(1);
								}}
							>
								<FormTitle>
									Sign up to see photos and videos from your friends.
								</FormTitle>
								<BlockWrapper>
									<Line />
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Email'
										variant='filled'
										size='small'
										fullWidth
									/>
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Full Name'
										variant='filled'
										size='small'
										fullWidth
									/>
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Username'
										variant='filled'
										size='small'
										fullWidth
									/>
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Password'
										variant='filled'
										size='small'
										fullWidth
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
							<a href='/'>Log in</a>
						</p>
					</SwitchLoginBlock>
				</ContentContainer>
			</ContentWrapper>
		</PageWrapper>
	);
};
