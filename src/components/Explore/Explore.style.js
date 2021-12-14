import styled from 'styled-components';

export const Wrapper = styled.div`
	padding-top: 100px;
`;

export const Photos = styled.div`
	width: 950px;
	height: auto;
	margin: 0 auto;
	padding: 10px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

export const Div = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 5px;
	width: 300px;
	height: 300px;
	position: relative;
	flex: 1 0 22rem;
	margin: 1rem;
	color: #fff;
	cursor: pointer;
	&:hover > div {
		display: flex;
	}
`;

export const Image = styled.img`
	height: 100%;
	width: auto;
`;

export const Info = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
`;

export const Ul = styled.div`
	list-style: none;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
`;

export const Li = styled.div`
	display: flex;
	font-size: 20px;
	font-weight: 600;
	margin: 0 2rem;
	align-items: center;
`;
