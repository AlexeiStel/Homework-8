import {Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";
import "./App.css";
import { AuthProvider } from './context/AuthProvider';
import { MainLayout } from './layout/MainLayout';
import { Login } from './pages/Login';
import { PrivateRoute } from './component/PrivateRoute';

function App() {

	return (
    <>
		<AuthProvider>
			<Routes>
				<Route element={ <MainLayout />}>
					<Route path='/' element={ <Home />}/>
					<Route path='/heroes/' element={ <PrivateRoute><CategoryPage category="Heroes" /></PrivateRoute>}/>
					<Route path='/locations/' element={ <PrivateRoute><CategoryPage category="Locations" /></PrivateRoute>}/>
					<Route path='/episodes/' element={ <PrivateRoute><CategoryPage category="Episodes" /></PrivateRoute>}/>
					<Route path="/heroes/:id" element={<PrivateRoute><DetailPage category="Heroes" /></PrivateRoute>} />
					<Route path="/locations/:id" element={<PrivateRoute><DetailPage category="Locations" /></PrivateRoute>} />
					<Route path="/episodes/:id" element={<PrivateRoute><DetailPage category="Episodes" /></PrivateRoute>} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path='*' element={ <NotFound />}/>
			</Routes>
		</AuthProvider>
		
		
	</>
  );
}

export default App;
