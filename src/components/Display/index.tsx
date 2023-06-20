import React, { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	display: boolean
}

const Display: FC<Props> = ({
	display,
	children
}) => {
	return (
		<div style={{ display: display ? 'contents' : 'none' }}>
			{children}
		</div>
	);
};

export default Display;