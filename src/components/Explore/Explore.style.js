import styled from 'styled-components';

export const Wrapper = styled.div`
	padding-top: 100px;
`;

export const Photos = styled.div`
	width: 1000px;
	height: auto;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 20px;
	grid-row-gap: 20px;
	grid-auto-rows: 250px;
`;

export const Div = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	width: 300px;
	height: 300px;
	position: relative;
	flex: 1 0 22rem;
	color: #fff;
	cursor: pointer;
	&:hover > div {
		display: flex;
	}
	width: 100%;
	height: 100%;

	&:nth-child(6n - 4) {
		grid-column: span 2;
		grid-row: span 2;
	}

	&:nth-child(7n + 7) {
		grid-column: span 2;
		grid-row: span 2;
	}

	&:nth-child(7n + 8) {
		grid-column: span 1;
		grid-row: span 1;
	}

	&:nth-child(21n) {
		grid-column: span 1;
		grid-row: span 1;
	}
`;

export const Image = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
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
