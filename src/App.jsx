import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RegistrationPage } from './pages';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='registration' element={<RegistrationPage />} />
			</Routes>
		</Router>
	);
}
