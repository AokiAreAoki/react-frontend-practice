import React, { FC, useEffect, useMemo, useState } from "react";
import useStudents from "../../../../hooks/useStudents";
import tabSlice, { RegisterTab, Tab } from "../../../../redux/slices/tabs";
import { useTypedDispatch } from "../../../../redux";
import makeLookupTable from "../../../../utils/makeLookupTable";
import Loading from "../../../../components/Loading";
import Flex from "../../../../components/Flex";
import Years from "../../../../components/Years";
import Accordion from "../../../../components/Accordion";
import ScoreControl from "./components/ScoreControl";
import postfix from "../../../../utils/postfix";
import useOthersScores from "../../../../hooks/useOthersScores";
import { User } from "../../../../types/User";
import username from "../../../../utils/username";

export const othersGradesTab: Omit<Tab, 'order'> = {
	key: 'scores',
	name: `Students' scores`,
};

export const RegisterOthersGrades: RegisterTab = ({ order }) => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(tabSlice.actions.addTab({
			...othersGradesTab,
			order,
		}));

		return () => {
			dispatch(tabSlice.actions.removeTab(othersGradesTab.key));
		};
	}, [ dispatch, order ]);

	return <></>;
};

const OthersGrades: FC = () => {
	const [ student, setStudent ] = useState<User | null>(null);

	const {
		loading: loadingStudents,
		refresh: refreshStudents,
		students,
	} = useStudents();

	const {
		loading: loadingScores,
		refresh: refreshScores,
		semesters,
	} = useOthersScores(student?.id);

	const years = useMemo(() => makeLookupTable(semesters, s => s.year, false), [ semesters ]);

	return (
		<Flex>
			<Flex dir="row">
				{"Student: "}
				{loadingStudents
					? <Loading />
					: <Flex>
						{username(student)}

						{"// TODO: select component"}
						{students.map(student => (
							<Flex
								key={student.id}
								onClick={() => {
									setStudent(student);
								}}
							>
								{username(student)}
							</Flex>
						))}
					</Flex>
				}
			</Flex>

			<Flex>
				{loadingScores
					? <Loading />
					: <Years editable years={years} />
				}
			</Flex>
		</Flex>
	);
};

export default OthersGrades;