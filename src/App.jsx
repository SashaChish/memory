import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Explore } from './components/Explore/Explore';
import { RegistrationPage, LogPage, UserPage } from './pages';
import { PostInsta } from './components/PostInsta/PostInsta';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='/registration' element={<RegistrationPage />} />
				<Route exact path='/login' element={<LogPage />} />
				<Route path='/:username/*' element={<UserPage />} />
				<Route exact path='/profile' />
				<Route path='/explore' element={<Explore />} />
				<Route path='/' element={<PostInsta />} />
			</Routes>
		</Router>
	);
}
