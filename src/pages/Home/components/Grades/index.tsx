import React, { FC, useMemo } from "react";
import { SemesterWithScore } from "../../../../types/Semester";
import SemestersWithScores from "../../../../components/SemestersWithScores";
import makeLookupTable from "../../../../utils/makeLookupTable";
import Flex from "../../../../components/Flex";

interface Props  {
	title: string
	semesters: SemesterWithScore[]
}

const Grades: FC<Props> = ({
	title,
	semesters,
}) => {
	const years = useMemo(() => makeLookupTable(semesters, s => s.year, false), [ semesters ]);

	const groupedSemesters = useMemo(() => {
		return Object.values(years).map(({
			key: year,
			value: semesters
		}) => {
			return  <SemestersWithScores
				key={year}
				displayAddButton
				year={year}
				semesters={semesters}
			/>;
		});
	}, [ years ]);

	return (
		<Flex grow gap="10px">
			<b>{title}</b>
			<Flex>{groupedSemesters}</Flex>
		</Flex>
	);
};

export default Grades;