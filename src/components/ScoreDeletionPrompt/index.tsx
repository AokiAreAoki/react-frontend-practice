import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Prompt from "../Prompt";
import ScoreTable from "../ScoreTable";
import Score from "../../types/Score";
import Flex from "../Flex";
import { User } from "../../types/User";
import username from "../../utils/username";
import API from "../../services/API";
import Loading from "../Loading";

declare namespace ScoreDeletionPrompt {
	type Value = Score;

	interface Props {
		value: Value
		student: User
		onClose: (hasChanges: boolean) => void
	}
}

const ScoreDeletionPrompt: FC<ScoreDeletionPrompt.Props> = ({
	student,
	onClose,
	value,
}) => {
	const [ loading, setLoading ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

	const abort = useRef(new AbortController());

	const deleteScore = useCallback(() => {
		setLoading(true);

		abort.current.abort();
		abort.current = new AbortController();

		API.deleteScore({
			abort: abort.current,
			score: { id: value.id },
		})
			.then(({ success, response, error, canceled }) => {
				setLoading(false);

				if(success){
					console.log('score delete response:', response);

					onClose(true);
				} else if(!canceled) {
					setErrorMessage(error.message);
				}
			});
	}, [ onClose, value.id ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return (
		<Prompt
			message={
				<>
					{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
					{loading && <Loading />}
				</>
			}
			onConfirm={deleteScore}
			onCancel={() => onClose(false)}
		>
			<Flex gap="15px">
				{`Are you sure you want to delete ${student
					? username(student) + "'s"
					: "this"
				} score?`}

				<ScoreTable
					semester={null}
					student={student}
					scores={[ value ]}
				/>
			</Flex>
		</Prompt>
	);
};

export default ScoreDeletionPrompt;