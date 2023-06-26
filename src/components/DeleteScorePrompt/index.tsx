import React, { FC } from "react";
import Prompt from "../Prompt";
import ScoreTable from "../ScoreTable";
import Score from "../../types/Score";
import Flex from "../Flex";
import { User } from "../../types/User";
import username from "../../utils/username";
import Nullable from "../../types/Nullable";

interface Props {
	student?: Nullable<User>
	score: Score
	onClose: () => void
}

const DeleteScorePrompt: FC<Props> = ({
	student,
	onClose,
	score,
}) => {
	return (
		<Prompt
			onConfirm={() => {
				onClose();
			}}
			onCancel={onClose}
		>
			<Flex gap="15px">
				{`Are you sure you want to delete ${student
					? username(student) + "'s"
					: "this"
				} score?`}

				<ScoreTable scores={[ score ]} />
			</Flex>
		</Prompt>
	);
};

export default DeleteScorePrompt;