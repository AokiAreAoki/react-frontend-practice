import React from "react";
import styled from "styled-components";
import Nullable from "../../types/Nullable";
import { theme } from "../../assets/theme";

interface StyledSelectProps {
	error: boolean
}

const StyledSelect = styled.select<StyledSelectProps>`
	width: 175px;
	padding-inline: 0px;
	padding-block: 1px;

	outline: none;
	border: 1px solid ${ ({ error }) => error ? theme.colors.negative : theme.colors.secondary };

	&:hover {
		border-color: ${ ({ error }) => error ? theme.colors.negative : "black" };
	}

	&:focus {
		border-color: ${ theme.colors.primary };
	}
`;

type Key = Nullable<string>;

export interface Option<K extends Key = Key> {
	key: K
	label: string
}

declare namespace Select {
	interface Props<K extends Key> {
		value: K | number
		onChange: (value: K) => void

		options: Option<K>[]
		required: boolean
	}
}

const Select = <K extends Key = Key>({
	value,
	onChange,

	options,
	required,
}: Select.Props<K>) => {
	return (
		<StyledSelect
			value={value || undefined}
			onChange={e => {
				onChange(e.target.value as K);
			}}
			error={required && !value}
		>
			<option disabled selected={!value}>Select</option>

			{options.map(option => (
				<option key={option.key} value={option.key || undefined}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
};

export default Select;