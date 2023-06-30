import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme";

interface StyledSelectProps {
	error: boolean
}

const StyledInput = styled.input<StyledSelectProps>`
	outline: none;
	border: 1px solid ${ ({ error }) => error ? theme.colors.negative : theme.colors.secondary };

	&:hover {
		border-color: ${ ({ error }) => error ? theme.colors.negative : "black" };
	}

	&:focus {
		border-color: ${ theme.colors.primary };
	}
`;

interface Props extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'onSubmit' | 'ref' | 'as'> {
	error?: boolean

	value: string;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;

	ref?: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement>,
}

const Input: FC<Props> = ({
	error = false,
	value,
	onChange,
	onSubmit,

	ref,
	...props
}) => {
	return (
		<StyledInput
			ref={ref}
			onKeyDown={e => {
				if(e.key === "Enter")
					onSubmit?.(e.currentTarget.value);
			}}
			{...props}

			error={error}

			value={value}
			onChange={e => {
				onChange?.(e.target.value);
			}}
		/>
	);
};

export default Input;