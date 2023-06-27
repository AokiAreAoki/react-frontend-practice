import React, { FC, useEffect, useMemo, useState } from "react";
import useStudents from "../../../../hooks/useStudents";
import tabSlice, { RegisterTab, Tab } from "../../../../redux/slices/tabs";
import { useTypedDispatch } from "../../../../redux";
import makeLookupTable from "../../../../utils/makeLookupTable";
import Loading from "../../../../components/Loading";
import Flex from "../../../../components/Flex";
import Years from "../../../../components/Years";
import Select from "../../../../components/Select";
import ScoreControl from "./components/ScoreControl";
import postfix from "../../../../utils/postfix";
import useOthersScores from "../../../../hooks/useOthersScores";
import { User } from "../../../../types/User";
import username from "../../../../utils/username";
import Nullable from "../../../../types/Nullable";
import Button from "../../../../components/Button";

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
	const {
		loading: loadingStudents,
		refresh: refreshStudents,
		students,
	} = useStudents();

	const [ studentId, setStudentId ] = useState<Nullable<number>>(null);
	const student = useMemo(() => students.find(s => s.id === studentId), [ studentId, students ]);

	const {
		loading: loadingScores,
		refresh: refreshScores,
		semesters,
	} = useOthersScores(student?.id);

	const years = useMemo(() => makeLookupTable(semesters, s => s.year, false), [ semesters ]);

	const options = useMemo(() => {
		return students.map(user => ({
			key: String(user.id),
			label: username(user)
		}));
	}, [ students ]);

	return (
		<Flex gap="10px">
			<Flex dir="row" gap="10px" justify="space-between" align="center">
				<Flex dir="row" gap="10px" align="center">
					{"Student: "}

					{loadingStudents
						? <Loading />
						: <Select
							required
							value={studentId}
							onChange={newValue => {
								setStudentId(Number(newValue));
							}}
							options={options}
						/>
					}
				</Flex>

				<Flex dir="row" gap="10px" align="center">
					{loadingScores && <Loading />}
					<Button onClick={refreshScores}>Refresh</Button>
				</Flex>
			</Flex>

			<Flex>
				{student
					? <Years
						student={student}
						years={years}
						editable
						onRefresh={refreshScores}
					/>
					: "Select a student first"
				}
			</Flex>
		</Flex>
	);
};

export default OthersGrades;