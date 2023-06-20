import React, { FC, useEffect } from "react";
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

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Navigate to={isLoggedIn
						? "/home"
						: "/login"
					} />
				}
			/>
			<Route path="/home" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;