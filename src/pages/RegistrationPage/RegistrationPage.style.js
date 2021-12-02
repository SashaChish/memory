import styled from 'styled-components';

import { color1, color2, color3, color4 } from '../../theme/colors';

export const PageWrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	background: ${color1};
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ContentWrapper = styled.div`
	min-height: 100%;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ContentContainer = styled.div`
	max-width: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const MainBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: ${color2};
	padding: 10px 0;
	margin: 0 0 10px 0;
	border: 1px solid rgba(142, 142, 142, 0.5);
	border-radius: 1px;

	@media (max-width: 450px) {
		background: ${color1};
		border: none;
	}
`;

export const SwitchLoginBlock = styled.div`
	width: 100%;
	background: ${color2};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	margin: 0 0 10px;
	border: 1px solid rgba(142, 142, 142, 0.5);
	border-radius: 1px;

	& > p {
		margin: 15px;
		font-size: 15px;
		margin: 15px;
		text-align: center;

		@media (max-width: 450px) {
			margin: 0;
		}
	}

	p > a {
		padding: 0 0 0 5px;
		text-decoration: none;
		color: ${color4};
	}

	@media (max-width: 450px) {
		background: ${color1};
		border: none;
	}
`;

export const Title = styled.h1`
	text-align: center;
	margin: 24px 0 12px;
`;

export const FormWrapper = styled.div`
	margin: 0 0 20px;
`;

export const Form = styled.form`
	max-width: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const FormTitle = styled.div`
	margin: 0 40px 10px;
	text-align: center;
	font-size: 17px;
	font-weight: 600;
	line-height: 20px;
	color: ${color3};
`;

export const Line = styled.div`
	height: 1px;
	width: 100%;
	background: ${color3};
	margin: 10px 0 18px;
`;

export const BlockWrapper = styled.div`
	width: 100%;
	padding: 0px 40px 15px;

	@media (max-width: 450px) {
		padding: 0px 20px 15px;
	}
`;

export const AgreementText = styled.p`
	width: 100%;
	padding: 0px 40px 15px;
	margin: 10px 0 0;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: ${color3};
`;
