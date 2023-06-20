import React, { FC } from "react";
import Flex from "../../components/Flex";

const NotFoundPage: FC = () => {
	return (
		<Flex grow dir="column" justify="center" align="center">
			<h1>
				<b>404</b> Page not found!
			</h1>
		</Flex>
	);
};

export default NotFoundPage;