import React, { FC, useEffect, useMemo } from "react";
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";

import { useTypedSelector } from "./redux";

import HomePage from './pages/Home';
import LoginPage from "./pages/Login";
import NotFound from './pages/NotFound';

const AppRoutes: FC = () => {
	const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn)
			navigate('/login');
	}, [ isLoggedIn, navigate ]);

	const redirect = useMemo(() => {
		return <Navigate to={isLoggedIn
			? "/home"
			: "/login"
		} />;
	}, [ isLoggedIn ]);

	return (
		<Routes>
			<Route
				path="/"
				element={redirect}
			/>
			<Route path="/home/*" element={isLoggedIn
				? <HomePage />
				: redirect
			} />
			<Route path="/login" element={isLoggedIn
				? redirect
				: <LoginPage />
			} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;