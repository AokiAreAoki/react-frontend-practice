import React, { CSSProperties, FC, PropsWithChildren } from "react";
import styled from "styled-components";

type FlexProperties =
	| "overflow"
	| "flexDirection"
	| "gap"
	| "flexWrap"
	| "justifyContent"
	| "alignItems"
	| "flexBasis"
	| "flexGrow"
	| "flexShrink";

interface StyledFlexProps extends React.HTMLAttributes<HTMLDivElement>{
	overflow?: CSSProperties["overflow"] | boolean;

	dir?: CSSProperties["flexDirection"];
	gap?: CSSProperties["gap"];
	wrap?: CSSProperties["flexWrap"] | boolean;

	justify?: CSSProperties["justifyContent"];
	align?: CSSProperties["alignItems"];

	basis?: CSSProperties["flexBasis"];
	grow?: CSSProperties["flexGrow"] | boolean;
	shrink?: CSSProperties["flexShrink"] | boolean;
}

interface Props extends StyledFlexProps, PropsWithChildren {
	style?: Omit<React.CSSProperties, FlexProperties>;
}

export type FlexProps = Props;

function shorthandValue<V>(
	cssRule: string,
	value: V | boolean | undefined,
	shorthand: V,
) {
	if (!value) return "";

	const ruleValue = value === true
		? shorthand
		: value;

	return `${cssRule}: ${ruleValue};`;
}

const StyledFlex = styled.div<StyledFlexProps>`
	display: flex;

	${props => shorthandValue("overflow", props.overflow, "hidden overlay")}

	${props => shorthandValue(`flex-direction`, props.dir || "column", "column")};
	${props => shorthandValue(`gap`, props.gap, 0)};
	${props => shorthandValue(`flex-wrap`, props.wrap, "wrap")};

	${props => shorthandValue(`justify-content`, props.justify, "start")};
	${props => shorthandValue(`align-items`, props.align, "start")};

	${props => shorthandValue(`flex-basis`, props.basis, "auto")};
	${props => shorthandValue(`flex-grow`, props.grow, 1)};
	${props => shorthandValue(`flex-shrink`, props.shrink, 1)};
`;

const Flex: FC<Props> = ({
	children,
	style,
	...props
}) => {
	return (
		<StyledFlex {...props} style={style}>
			{children}
		</StyledFlex>
	);
};

export default Flex;
