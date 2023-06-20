import React, { FC, useState } from "react";
import useLogout from "../../hooks/useLogout";
import Flex from "../../components/Flex";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

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

			<Modal open={display}>
				<Flex style={{ padding: "15px" }} gap="15px">
					Are you sure you want to log out?

					<Flex dir="row" gap="15px" justify="end">
						<Button
							color="negative"
							variant="solid"
							onClick={logout}
						>
							Confirm
						</Button>

						<Button
							color="primary"
							variant="solid"
							onClick={() => setDisplay(false)}
						>
							Cancel
						</Button>
					</Flex>
				</Flex>
			</Modal>
		</Flex>
	);
};

export default Logout;