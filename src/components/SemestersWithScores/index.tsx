import React, { FC, useState } from "react";
import Flex from "../Flex";
import Accordion from "../Accordion";
import Scores from "../Scores";
import { SemesterWithScores } from "../../types/Semester";
import postfix from "../../utils/postfix";

interface Props {
	year: number
	semesters: SemesterWithScores[]
	editable: boolean
}

const SemestersWithScores: FC<Props> = ({
	year,
	semesters,
	editable,
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
					editable={editable}
					semester={semester}
				/>
			))}
		</Accordion>
	);
};

export default SemestersWithScores;