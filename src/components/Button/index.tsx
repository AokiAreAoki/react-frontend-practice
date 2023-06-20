import React, { FC, PropsWithChildren, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme";

type Variant = 'primary' | 'secondary';

const BaseStyledButton = styled.button`
	cursor: pointer;
	border: none;
	outline: none;

	border-radius: 8px;
	padding-inline: 15px;
	padding-block: 10px;
`;

const width = 2;

const PrimaryStyledButton = styled(BaseStyledButton)`
	color: white;
	background-color: ${ theme.colors.primary };
`;

const SecondaryStyledButton = styled(BaseStyledButton)`
	color: ${ theme.colors.primary };
	background-color: white;
	outline: ${width}px solid ${ theme.colors.primary };
	outline-offset: -${width}px;
`;

function getButtonVariant(variant?: Variant){
	switch (variant) {
		default:
		case 'primary':
			return PrimaryStyledButton;

		case 'secondary':
			return SecondaryStyledButton;
	}
}

interface Props extends PropsWithChildren {
	variant?: Variant
	onClick?: () => void
}

const Button: FC<Props> = ({
	variant,
	onClick,
	children,
}) => {
	const ButtonVariant = useMemo(() => getButtonVariant(variant), [ variant ]);

	return (
		<ButtonVariant onClick={onClick}>
			{children}
		</ButtonVariant>
	);
};

export default Button;