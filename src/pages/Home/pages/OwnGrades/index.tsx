import React, { FC, useEffect } from "react";
import useOwnScores from "../../../../hooks/useOwnScores";
import Grades from "../Grades";
import { useTypedDispatch, useTypedSelector } from "../../../../redux";
import tabs, { Tab } from "../../../../redux/slices/tabs";
import Button from "../../../../components/Button";

export const ownGradesTab: Tab = {
	key: 'ownScores',
	name: `My scores`,
	path: '/own-scores',
};

export const RegisterOwnGrades: FC = () => {
	const dispatch = useTypedDispatch();
	const active = useTypedSelector(state => state.tabs.active);

	useEffect(() => {
		dispatch(tabs.actions.addTab(ownGradesTab));

		return () => {
			dispatch(tabs.actions.removeTab(ownGradesTab.path));
		};
	}, [ dispatch ]);

	return <Button
		variant={active === ownGradesTab.key ? 'primary' : 'secondary'}
		onClick={() => {
			dispatch(tabs.actions.setActiveTab(ownGradesTab.key));
		}}
	>
		{ownGradesTab.name}
	</Button>;
};

const OwnGrades: FC = () => {
	const {
		loading,
		semesters,
	} = useOwnScores();

	return (
		<Grades
			title="My Scores"
			loading={loading}
			semesters={semesters}
		/>
	);
};

export default OwnGrades;