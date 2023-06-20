import React, { FC, useMemo } from "react";
import Flex from "../../components/Flex";
import Semester from "../../types/Semester";
import Semesters from "../../components/Semesters";

interface Props {
	years: Record<string, Semester[]>
}

const Years: FC<Props> = ({
	years,
}) => {
	return (
		<Flex grow style={{ width: '100%' }}>
			{Object
				.keys(years)
				.map(year => <Semesters
					key={year}
					displayAddButton
					year={Number(year)}
					semesters={years[year]}
				/>)
			}
		</Flex>
	);
};

export default Years;