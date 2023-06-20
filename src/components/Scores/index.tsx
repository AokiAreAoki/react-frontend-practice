import React, { FC, useState } from "react";
import SemesterWithScore from "../../types/Semester";
import Flex from "../Flex";
import Accordion from "../Accordion";
import ScoreTable from "../ScoreTable";
import postfix from "../../utils/postfix";

interface Props {
	semester: SemesterWithScore
}

const Scores: FC<Props> = ({
	 semester,
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
				<b>{semester.number}{postfix(Number(semester.number))} semester</b>
			</Flex>}
		>
			<Flex style={{ paddingBottom: '16px', paddingRight: '16px' }}>
				{ semester.scores.length === 0
					? 'No records'
					: <ScoreTable scores={semester.scores} />
				}
			</Flex>
		</Accordion>
	);
};

export default Scores;