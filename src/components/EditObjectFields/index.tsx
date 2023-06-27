import React from "react";
import Flex from "../Flex";
import Input from "../Input";
import Ruler from "../Ruler";

interface Meta {
	label: string
	type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
}

interface Props<O extends object, K extends keyof O> {
	object: O
	meta: Partial<Record<K, Meta>>
	onChange: React.Dispatch<React.SetStateAction<O>>
}

function EditObjectFields <O extends object, K extends keyof O = keyof O>({
	object,
	meta,
	onChange,
}: Props<O, K>){
	return Object.keys(meta).map(key => {
		const row = meta[key as K];

		if(!row)
			return null;

		return (
			<Flex
				key={String(key)}
				dir="row"
				align="center"
				gap="5px"
			>
				{row.label}

				<Ruler />

				<Input
					type={row.type}
					value={object[key]}
					onChange={ value => {
						onChange(prev => ({
							...prev,
							[key]: value,
						}));
					}}
				/>
			</Flex>
		);
	});
}

export default EditObjectFields;