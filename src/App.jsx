import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RegistrationPage, LogPage } from './pages';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='registration' element={<RegistrationPage />} />
				<Route exact path='/login' element={<LogPage />} />
			</Routes>
		</Router>
	);
}
