import { Route, Routes } from 'react-router-dom';
import { LogPage } from './pages';

export default function App() {
	return (
		<>
			<Routes>
				<Route exact path='/login' element={<LogPage />} />
			</Routes>
		</>
	);
}
