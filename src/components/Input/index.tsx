import React, { FC } from "react";

interface Props extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'onSubmit'> {
	value: string;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
}

const Input: FC<Props> = ({
	value,
	onChange,
	onSubmit,
	...props
}) => {
	return (
		<input
			{...props}
			value={value}
			onChange={e => {
				onChange?.(e.target.value);
			}}
			onSubmit={e => {
				onSubmit?.(e.currentTarget.value);
			}}
		/>
	);
};

export default Input;
