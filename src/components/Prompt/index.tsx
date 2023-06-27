import React, { FC, PropsWithChildren } from "react";
import Modal from "../Modal";
import Flex from "../Flex";
import Button from "../Button";

interface Props extends PropsWithChildren {
	message?: React.ReactNode
	onConfirm: () => void
	onCancel: () => void
}

const Prompt: FC<Props> = ({
	message,
	onConfirm,
	onCancel,
	children,
}) => {
	return (
		<Modal>
			<Flex gap="15px" style={{ padding: "15px" }}>
				<Flex wrap>{children}</Flex>

				<Flex dir="row" gap="15px" justify="end" align="center">
					{message}
					<Button onClick={onConfirm}>Confirm</Button>
					<Button color="negative" onClick={onCancel}>Cancel</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default Prompt;