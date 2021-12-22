import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Explore } from './components/Explore/Explore';
import { RegistrationPage, LogPage, UserPage } from './pages';
import { PostInsta } from './components/PostInsta/PostInsta';

import { Header } from './components/Header';
import { NotFoundPage } from './pages/NotFoundPage';

import { useSelector } from 'react-redux';

export default function App() {
	const userData = useSelector((state) => state);

	return (
		<Router>
			<Routes>
				<Route path='/registration' element={<RegistrationPage />} />
				<Route exact path='/login' element={<LogPage />} />
				<Route
					path='/:username/*'
					element={userData._id ? [<Header />, <UserPage />] : <LogPage />}
				/>
				<Route exact path='/profile' />
				<Route path='/' element={<PostInsta />} />
				<Route
					path='/explore'
					element={userData._id ? [<Header />, <Explore />] : <LogPage />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}
