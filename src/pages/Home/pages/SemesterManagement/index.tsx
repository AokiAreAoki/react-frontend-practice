import React, { FC, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../../redux";
import tabs, { Tab } from "../../../../redux/slices/tabs";
import Button from "../../../../components/Button";
import Flex from "../../../../components/Flex";
import AddYear from "../../components/AddYear";
import AddSemester from "../../components/AddSemester";
import useRefreshScores from "../../../../hooks/useRefreshScores";
import useSemesters from "../../../../hooks/useSemesters";

export const semesterManagementTab: Tab = {
	key: 'semesterManagement',
	name: `Semester Management`,
	path: '/semester-management',
};

export const RegisterSemesterManagement: FC = () => {
	const dispatch = useTypedDispatch();
	const active = useTypedSelector(state => state.tabs.active);

	useEffect(() => {
		dispatch(tabs.actions.addTab(semesterManagementTab));

		return () => {
			dispatch(tabs.actions.removeTab(semesterManagementTab.path));
		};
	}, [ dispatch ]);

	return <Button
		variant={active === semesterManagementTab.key ? 'primary' : 'secondary'}
		onClick={() => {
			dispatch(tabs.actions.setActiveTab(semesterManagementTab.key));
		}}
	>
		{semesterManagementTab.name}
	</Button>;
};

const SemesterManagement: FC = () => {
	const refresh = useRefreshScores();
	const {
		years,
		semesters,
	} = useSemesters();

	return (
		<Flex grow>
			semesters...

			{/* <AddSemester
				year={year}
				semesters={semesters}
			/>

			<AddYear years={years} /> */}
		</Flex>
	);
};

export default SemesterManagement;