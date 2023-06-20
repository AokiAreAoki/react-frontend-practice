import React, { FC, useEffect } from "react";
import useOwnScores from "../../../../hooks/useOwnScores";
import Grades from "../Grades";
import tabSlice, { Tab } from "../../../../redux/slices/tabs";
import { useTypedDispatch, useTypedSelector } from "../../../../redux";
import Button from "../../../../components/Button";

export const othersGradesTab: Tab = {
	key: 'scores',
	name: `Students' scores`,
	path: '/scores',
};

export const RegisterOthersGrades: FC = () => {
	const dispatch = useTypedDispatch();
	const active = useTypedSelector(state => state.tabs.active);

	useEffect(() => {
		dispatch(tabSlice.actions.addTab(othersGradesTab));

		return () => {
			dispatch(tabSlice.actions.removeTab(othersGradesTab.path));
		};
	}, [ dispatch ]);

	return <Button
		color={active === othersGradesTab.key ? 'primary' : 'secondary'}
		onClick={() => {
			dispatch(tabSlice.actions.setActiveTab(othersGradesTab.key));
		}}
	>
		{othersGradesTab.name}
	</Button>;
};

const OthersGrades: FC = () => {
	const {
		loading,
		semesters,
	} = useOwnScores();

	return (
		<Grades
			title="Someone's Scores"
			loading={loading}
			semesters={semesters}
		/>
	);
};

export default OthersGrades;