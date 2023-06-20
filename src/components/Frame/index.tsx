import React, { FC } from "react";
import Flex, { FlexProps } from "../Flex";
import styled from "styled-components";

const StyledFlex = styled(Flex)`
	border: 1px solid black;
	border-radius: 10px;
	padding: 10px;
`;

interface Props extends FlexProps { }

const Frame: FC<Props> = ({
	children,
	...props
}) => {
	return <StyledFlex {...props}>{children}</StyledFlex>;
};

export default Frame;
