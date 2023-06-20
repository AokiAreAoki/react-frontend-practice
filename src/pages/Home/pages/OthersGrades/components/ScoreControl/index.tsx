import React, { FC } from "react";
import Score from "../../../../../../types/Score";
import Flex from "../../../../../../components/Flex";
import postfix from "../../../../../../utils/postfix";
import Ruler from "../../../../../../components/Ruler";
import Button from "../../../../../../components/Button";

interface Props {
	score: Score
}

const ScoreControl: FC<Props> = ({
	score,
}) => {
	return (
		<Flex
			key={score.id}
			dir="row"
			align="center"
			gap="15px"
		>
			{score.subject}
			<Ruler />
			{score.assessmentType}
			<Ruler />

			<Button
				color="negative"
				onClick={() => {

				}}
			>
				{"Delete"}
			</Button>
		</Flex>
	);
};

export default ScoreControl;