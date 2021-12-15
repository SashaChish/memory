import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Explore } from './components/Explore/Explore';
import { RegistrationPage, LogPage, UserPage } from './pages';

import { Header } from './components/Header';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='/registration' element={<RegistrationPage />} />
				<Route exact path='/login' element={<LogPage />} />
				<Route path='/:username/*' element={[<Header />, <UserPage />]} />
				<Route exact path='/profile' />
				<Route path='/explore' element={[<Header />, <Explore />]} />
			</Routes>
		</Router>
	);
}
