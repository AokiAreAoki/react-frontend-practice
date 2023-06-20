import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
	border: 1px solid black;
	border-radius: 10px;
	padding: 0;
`;

interface Props extends PropsWithChildren{
	open: boolean
	onClose?: () => void
}

const Modal: FC<Props> = ({
	open,
	onClose,
	children,
}) => {
	const ref = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		ref.current?.addEventListener(`dialogopen`, e => {
			console.log(e);
		});
	}, []);

	useEffect(() => {
		if(open)
			ref.current?.showModal();
		else
			ref.current?.close();
	}, [ open ]);

	return (
		<StyledDialog
			ref={ref}
			onCancel={onClose}
		>
			{children}
		</StyledDialog>
	);
};

export default Modal;