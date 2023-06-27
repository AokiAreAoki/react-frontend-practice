import React, { FC, useState } from "react";
import Flex from "../Flex";
import Accordion from "../Accordion";
import Scores from "../Scores";
import { SemesterWithScores } from "../../types/Semester";
import postfix from "../../utils/postfix";
import { User } from "../../types/User";
import Nullable from "../../types/Nullable";

interface Props {
	student: User
	semesters: SemesterWithScores[]
	year: number
	editable: boolean
	onRefresh: Nullable<() => void>
}

const SemestersWithScores: FC<Props> = ({
	student,
	semesters,
	year,
	editable,
	onRefresh,
}) => {
	const [ open, setOpen ] = useState(semesters.some(semester => semester.scores.length !== 0));

	return (
		<Accordion
			value={open}
			head={
				<Flex
					grow
					style={{
						cursor:'pointer',
						userSelect: 'none',
					}}
					onClick={() => setOpen(prev => !prev)}
				>
					<b>{postfix(Number(year))} year</b>
				</Flex>
			}
		>
			{semesters.map((semester) => (
				<Scores
					key={semester.id}
					student={student}
					semester={semester}
					editable={editable}
					onRefresh={onRefresh}
				/>
			))}
		</Accordion>
	);
};

export default SemestersWithScores;