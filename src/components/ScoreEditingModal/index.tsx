import React, { FC, useRef, useState, useCallback, useEffect } from "react";
import Flex from "../Flex";
import Modal from "../Modal";
import Button from "../Button";
import Loading from "../Loading";
import EditObjectFields from "../EditObjectFields";

import API from "../../services/API";
import username from "../../utils/username";

import { User } from "../../types/User";
import Score, { EditScoreParams } from "../../types/Score";
import Nullable from "../../types/Nullable";

declare namespace ScoreEditingModal {
	type Value = Pick<Score, EditScoreParams>;

	interface Props {
		value: Value
		student?: Nullable<User>
		onClose: (hasChanges: boolean) => void
	}
}

const ScoreEditingModal: FC<ScoreEditingModal.Props> = ({
	student,
	onClose,
	value,
}) => {
	const [ internal, setInternal ] = useState(value);
	const [ loading, setLoading ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

	const abort = useRef(new AbortController());

	const updateScore = useCallback(() => {
		setLoading(true);

		abort.current.abort();
		abort.current = new AbortController();

		API.updateScore({
			abort: abort.current,
			score: {
				id: internal.id,
				subject: internal.subject,
				assessmentType: internal.assessmentType,
				value: internal.value,
			},
		})
			.then(({ success, response, error, canceled }) => {
				setLoading(false);

				if(success){
					console.log('score update response:', response);

					onClose(true);
				} else if(!canceled) {
					setErrorMessage(error.message);
				}
			});
	}, [ internal.assessmentType, internal.id, internal.value, internal.subject, onClose ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return (
		<Modal onClose={() => onClose(false)}>
			<Flex
				gap="15px"
				style={{
					width: "max(30vw, 500px)",
					padding: "15px",
				}}
			>
				{`Editing ${student
					? username(student) + "'s"
					: "a"
				} score`}

				<Flex gap="5px">
					<EditObjectFields<ScoreEditingModal.Value>
						object={internal}
						meta={{
							subject: { label: "Subject" },
							assessmentType: { label: "Assessment type" },
							value: { label: "Score", type: "number" },
						}}
						onChange={setInternal}
					/>
				</Flex>

				<Flex dir="row" gap="15px" justify="end" align="center">
					{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
					{loading && <Loading />}

					<Button color="primary" onClick={updateScore}>Save</Button>
					<Button color="negative" onClick={() => onClose(false)}>Cancel</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default ScoreEditingModal;