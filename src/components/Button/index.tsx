import React, { FC, PropsWithChildren, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme";

type Color = 'primary' | 'secondary' | 'negative';
type Variant = 'solid' | 'outline' ;

const BaseStyledButton = styled.button`
	cursor: pointer;
	border: none;
	outline: none;

	border-radius: 8px;
	padding-inline: 15px;
	padding-block: 10px;

	&:hover {
		text-decoration: underline;
	}
`;

const width = 2;

interface StyledButtonProps {
	color: string
}

const SolidStyledButton = styled(BaseStyledButton)<StyledButtonProps>`
	color: white;
	background-color: ${ ({ color }) => color };
`;

const TransparentStyledButton = styled(BaseStyledButton)<StyledButtonProps>`
	color: ${ ({ color }) => color };
	background-color: transparent;
	outline: ${width}px solid ${ ({ color }) => color };
	outline-offset: -${width}px;
`;

function getColor(variant: Color | undefined){
	switch (variant) {
		default:
		case 'primary':
			return theme.colors.primary;

		case 'secondary':
			return theme.colors.secondary;

		case 'negative':
			return theme.colors.negative;
	}
}

interface Props extends PropsWithChildren {
	color?: Color
	variant?: Variant
	onClick?: () => void
}

const Button: FC<Props> = ({
	color,
	variant = 'solid',
	...props
}) => {
	const resolvedColor = useMemo(() => getColor(color), [ color ]);

	switch(variant){
		default:
		case "solid":
			return <SolidStyledButton color={resolvedColor} {...props} />;

		case "outline":
			return <TransparentStyledButton color={resolvedColor} {...props} />;
	}
};

export default Button;