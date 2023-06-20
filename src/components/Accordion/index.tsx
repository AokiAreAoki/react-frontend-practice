import React, { FC, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme";
import CircleIcon from "../../assets/icons/circle-chevron-down";
import Flex from "../Flex";

export interface StyledAccordionProps {
	open: boolean
	height?: string
}

const duration = 200;
const animation = `${duration}ms ease-out`;

const StyledAccordion = styled.div<StyledAccordionProps>`
	height: ${props => props.height || 'auto'};
	overflow: hidden;
	display: grid;
	grid-template-areas:
        "icon head"
        ". body";
    grid-template-columns: 45px 1fr;
    grid-auto-rows: 50px 1fr;

	transition: height ${animation};
	border: 1px solid ${theme.colors.secondary};

	& + & {
		border-top: none;
	}

	& > .circle-icon {
		grid-area: icon;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;

		& svg {
			rotate: ${props => props.open ? '0deg' : '-90deg'};
			transition: rotate ${animation};

			& path {
				transition: stroke ${animation};
			}
		}
	}

	& > .head {
		grid-area: head;
		display: flex;
		justify-content: start;
		align-items: center;
		padding: 0;
	}

	& > .body {
		display: ${props => props.open ? 'inherit' : 'none'};
		overflow: hidden;
		grid-area: body;

		padding-right: 16px;
		padding-bottom: 16px;
	}
`;

interface Props {
	value?: boolean
	onChange?: (value: boolean) => void

	style?: React.CSSProperties
	head: React.ReactNode
	children: React.ReactNode
}

const Accordion: FC<Props> = ({
	value = false,
	onChange,

	style,
	head,
	children: body,
}) => {
	const [ open, setOpen ] = useState(value);

	useEffect(() => {
		setOpen(value);
	}, [ value ]);

	const toggle = useCallback(() => {
		setOpen(prev => {
			onChange?.(!prev);
			return !prev;
		});
	}, [ onChange ]);

	return (
		<StyledAccordion
			style={style}
			open={open}
		>
			<button
				className="circle-icon"
				onClick={toggle}
			>
				<Flex justify="center" align="center" grow>
					<CircleIcon color={open ? theme.colors.primary : theme.colors.secondary} />
				</Flex>
			</button>
			<div className="head">
				{head}
			</div>
			<div className="body">
				{body}
			</div>
		</StyledAccordion>
	);
};

export default Accordion;