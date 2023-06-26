import React, { FC, useMemo } from "react";
import { SemesterWithScores } from "../../../../types/Semester";
import makeLookupTable from "../../../../utils/makeLookupTable";
import Years from "../../../../components/Years";

interface Props  {
	semesters: SemesterWithScores[]
}

const Grades: FC<Props> = ({
	semesters,
}) => {
	const years = useMemo(() => makeLookupTable(semesters, s => s.year, false), [ semesters ]);
	return <Years years={years} />;
};

export default Grades;