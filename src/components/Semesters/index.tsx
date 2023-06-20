import React, { FC, useState } from "react";
import Flex from "../../components/Flex";
import Accordion from "../../components/Accordion";
import Scores from "../../components/Scores";
import { SemesterWithScore } from "../../types/Semester";
import postfix from "../../utils/postfix";

interface Props {
	displayAddButton: boolean
	year: number
	semesters: SemesterWithScore[]
}

const Semesters: FC<Props> = ({
	year,
	semesters,
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
					<b>{year}{postfix(Number(year))} year</b>
				</Flex>
			}
		>
			<Flex gap="16px" style={{ paddingBottom: '16px', paddingRight: '16px' }}>
				{semesters.map((semester) => (
					<Scores key={semester.id} semester={semester} />
				))}
			</Flex>
		</Accordion>
	);
};

export default Semesters;