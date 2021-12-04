import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LogPage } from './pages';

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
				<Route exact path='/login' element={<LogPage />} />
			</Routes>
		</Router>
	);
}
