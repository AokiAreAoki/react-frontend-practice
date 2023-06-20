import React, { FC } from "react";
import Flex from "../Flex";
import { theme } from "../../assets/theme";

interface Props {}

const Ruler: FC<Props> = () => {
	return (
		<Flex
			grow
			style={{
				minWidth: "1px",
				minHeight: "1px",
				backgroundColor: theme.colors.secondary,
			}}
		/>
	);
};

export default Ruler;