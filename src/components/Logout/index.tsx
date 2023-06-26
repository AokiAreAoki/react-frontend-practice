import React, { FC, useState } from "react";
import useLogout from "../../hooks/useLogout";
import Flex from "../../components/Flex";
import Button from "../../components/Button";
import Prompt from "../../components/Prompt";

interface Props {}

const Logout: FC<Props> = () => {
	const logout = useLogout();
	const [ display, setDisplay ] = useState(false);

	return (
		<Flex dir="row" gap="15px" align="center">
			<Button
				color="negative"
				variant="outline"
				onClick={() => setDisplay(true)}
			>
				Log out
			</Button>

			{display && <Prompt
				onConfirm={logout}
				onCancel={() => setDisplay(false)}
			>
				Are you sure you want to log out?
			</Prompt>}
		</Flex>
	);
};

export default Logout;