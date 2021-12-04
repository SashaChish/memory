import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { RegistrationPage } from './pages';

const Login = () => {
	return (
		<div>
			<Link to='/registration'>no have account?</Link>
		</div>
	);
};

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<RegistrationPage />} />
				<Route path='home' element={<div>after register</div>} />
			</Routes>
		</Router>
	);
}
