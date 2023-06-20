import React, { FC } from "react";

interface Props {
	value: string;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
	type?: React.HTMLInputTypeAttribute
}

const Input: FC<Props> = ({
	value,
	onChange,
	onSubmit,
	type,
}) => {
	return (
		<input
			value={value}
			onChange={e => {
				onChange?.(e.target.value);
			}}
			onSubmit={e => {
				onSubmit?.(e.currentTarget.value);
			}}
			type={type}
		/>
	);
};

export default Input;
