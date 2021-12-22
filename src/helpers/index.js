export const transformError = (error) => {
	return JSON.parse(JSON.stringify(error));
};
