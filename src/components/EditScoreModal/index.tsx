import React, { FC, useRef, useState, useCallback, useEffect } from "react";
import Flex from "../Flex";
import Modal from "../Modal";
import Input from "../Input";

import { User } from "../../types/User";
import Score from "../../types/Score";
import Nullable from "../../types/Nullable";
import username from "../../utils/username";
import Ruler from "../Ruler";
import Button from "../Button";
import Loading from "../Loading";
import API from "../../services/API";

interface Props {
	student?: Nullable<User>
	score: Score
	onClose: () => void
}

const EditScoreModal: FC<Props> = ({
	student,
	onClose,
	score,
}) => {
	const [ internal, setInternal ] = useState(score);
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
				subject: score.subject,
				assessmentType: score.assessmentType,
				score: score.score,
			},
		})
			.then(({ success, response, error, canceled }) => {
				setLoading(false);

				if(success){
					console.log('score update success:', response.data);
					onClose();
				} else if(!canceled) {
					setErrorMessage(error.message);
				}
			});
	}, [ onClose, score.assessmentType, score.score, score.subject ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return (
		<Modal onClose={onClose}>
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
					<EditObjectFields<typeof score>
						object={internal}
						keys={{
							subject: "Subject",
							assessmentType: "Assessment type",
							score: "Score",
						}}
						onChange={setInternal}
					/>
				</Flex>

				<Flex dir="row" gap="15px" justify="end" align="center">
					<div style={{ color: "red" }}>{errorMessage}</div>
					{loading && <Loading />}

					<Button color="primary" onClick={updateScore}>Save</Button>
					<Button color="negative" onClick={onClose}>Cancel</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

interface EditObjectFieldComponentProps<O extends object, K extends keyof O> {
	object: O
	keys: Partial<Record<K, string>>
	onChange: React.Dispatch<React.SetStateAction<O>>
}

function EditObjectFields <O extends object, K extends keyof O = keyof O>({
	object,
	keys,
	onChange,
}: EditObjectFieldComponentProps<O, K>){
	return Object.keys(keys).map(key => (
		<Flex
			key={String(key)}
			dir="row"
			align="center"
			gap="5px"
		>
			{keys[key] || String(key)}

			<Ruler />

			<Input
				value={object[key]}
				onChange={ value => {
					onChange(prev => ({
						...prev,
						[key]: value,
					}));
				}}
			/>
		</Flex>
	));
}

export default EditScoreModal;