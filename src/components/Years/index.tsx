import React, { FC } from "react";
import Flex from "../../components/Flex";
import { SemesterWithScores } from "../../types/Semester";
import SemestersWithScores from "../SemestersWithScores";
import { Lookup } from "../../utils/makeLookupTable";
import { User } from "../../types/User";
import Nullable from "../../types/Nullable";

interface Props {
	student: User
	years: Lookup<SemesterWithScores, number, false>
	editable?: boolean
	onRefresh?: Nullable<() => void>
}

const Years: FC<Props> = ({
	student,
	years,
	editable = false,
	onRefresh,
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
					student={student}
					year={Number(year)}
					semesters={semester}
					editable={editable}
					onRefresh={onRefresh}
				/>)
			}
		</Flex>
	);
};

export default Years;