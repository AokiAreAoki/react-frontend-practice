import React, { FC, useCallback, useState, useEffect, useRef } from "react";
import Flex from "../../components/Flex";
import Input from "../../components/Input";
import Frame from "../../components/Frame";
import Button from "../../components/Button";
import API from "../../services/API";
import { useTypedDispatch, useTypedSelector } from "../../redux";
import auth from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

const LoginPage: FC = () => {
	const dispatch = useTypedDispatch();
	const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn);

	const [ uid, setUid ] = useState("");
	const [ password, setPassword ] = useState("");

	const abort = useRef<AbortController>(new AbortController());

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	const submit = useCallback(() => {
		API.auth({
			uid,
			password,
			abort: abort.current,
		})
			.then(({ success, response }) => {
				if(success)
					dispatch(auth.actions.setToken(response.data.token));
			});
	}, [ uid, password, dispatch ]);

	return isLoggedIn
		? <Navigate to="/home" />
		: (
			<Flex grow dir="column" justify="center" align="center">
				<Frame gap='10px' style={{ width: "max( 25%, 300px )" }}>
					<Flex gap='5px'>
					Email:
						<Input
							value={uid}
							onChange={setUid}
							onSubmit={submit}
							type="text"
						/>
					</Flex>

					<Flex gap='5px'>
					Password:
						<Input
							value={password}
							onChange={setPassword}
							onSubmit={submit}
							type="password"
						/>
					</Flex>

					<Button onClick={submit}>
					Log in
					</Button>
				</Frame>
			</Flex>
		);
};

export default LoginPage;