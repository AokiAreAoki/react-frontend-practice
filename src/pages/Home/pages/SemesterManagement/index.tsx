import React, { FC, useEffect, useMemo, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../../redux";
import tabSlice, { RegisterTab, Tab } from "../../../../redux/slices/tabs";
import Flex from "../../../../components/Flex";
import useSemesters from "../../../../hooks/useSemesters";
import SemesterControl from "./components/SemesterControl";
import Loading from "../../../../components/Loading";
import makeLookupTable from "../../../../utils/makeLookupTable";
import postfix from "../../../../utils/postfix";
import Accordion from "../../../../components/Accordion";

export const semesterManagementTab: Omit<Tab, 'order'> = {
	key: 'semester-management',
	name: `Semester Management`,
};

export const RegisterSemesterManagement: RegisterTab = ({ order }) => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(tabSlice.actions.addTab({
			...semesterManagementTab,
			order,
		}));

		return () => {
			dispatch(tabSlice.actions.removeTab(semesterManagementTab.key));
		};
	}, [ dispatch, order ]);

	return <></>;
};

const SemesterManagement: FC = () => {
	const {
		loading,
		semesters,
	} = useSemesters();

	const years = useMemo(() => makeLookupTable(semesters, s => s.year, false), [ semesters ]);
	const [ accordionState, setAccordionState ] = useState<Record<number, boolean>>({});

	if(loading)
		return <Loading />;

	return (
		<Flex>
			{Object.values(years).map(({
				key: year,
				value: semesters
			}) => {
				return (
					<Accordion
						key={year}
						value={accordionState[year] ??= true}
						head={
							<Flex
								style={{ cursor:'pointer' }}
								onClick={() => {
									setAccordionState(prev => ({
										...prev,
										[year]: !prev[year],
									}));
								}}
							>
								{postfix(year)} year
							</Flex>
						}
					>
						<Flex gap="5px">
							{semesters.map(semester => (
								<SemesterControl key={semester.id} semester={semester} />
							))}
						</Flex>
					</Accordion>
				);
			})}
		</Flex>
	);
};

export default SemesterManagement;