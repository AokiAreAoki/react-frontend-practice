import React, { FC } from "react";
import Flex from "../../components/Flex";
import { SemesterWithScores } from "../../types/Semester";
import SemestersWithScores from "../SemestersWithScores";
import { Lookup } from "../../utils/makeLookupTable";

interface Props {
	years: Lookup<SemesterWithScores, number, false>
	editable?: boolean
}

const Years: FC<Props> = ({
	years,
	editable = false,
}) => {
	return (
		<Flex grow style={{ width: '100%' }}>
			{Object
				.values(years)
				.map(({
					key: year,
					value: semester,
				}) => <SemestersWithScores
					key={year}
					year={Number(year)}
					semesters={semester}
					editable={editable}
				/>)
			}
		</Flex>
	);
};

export default Years;