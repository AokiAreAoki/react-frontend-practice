import React, { FC, useState } from "react";
import { Semester, SemesterWithScores } from "../../types/Semester";
import Flex from "../Flex";
import Accordion from "../Accordion";
import ScoreTable from "../ScoreTable";
import postfix from "../../utils/postfix";
import { User } from "../../types/User";
import Nullable from "../../types/Nullable";

interface Props {
	student: User
	semester: SemesterWithScores
	editable: boolean
	onRefresh: Nullable<() => void>
}

const Scores: FC<Props> = ({
	student,
	semester,
	editable,
	onRefresh,
}) => {
	const [ open, setOpen ] = useState(semester.scores.length !== 0);

	return (
		<Accordion
			value={open}
			head={<Flex
				grow
				style={{
					cursor:'pointer',
					userSelect: 'none',
				}}
				onClick={() => setOpen(prev => !prev)}
			>
				<b>{postfix(Number(semester.number))} semester</b>
			</Flex>}
		>
			<ScoreTable
				student={student}
				semester={semester}
				scores={semester.scores}
				editable={editable}
				onRefresh={onRefresh}
			/>
		</Accordion>
	);
};

export default Scores;