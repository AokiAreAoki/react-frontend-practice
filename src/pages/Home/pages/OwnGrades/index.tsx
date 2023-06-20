import React, { FC, useEffect } from "react";
import useOwnScores from "../../../../hooks/useOwnScores";
import Grades from "../../components/Grades";
import { useTypedDispatch } from "../../../../redux";
import tabSlice, { Tab } from "../../../../redux/slices/tabs";
import Loading from "../../../../components/Loading";

export const ownGradesTab: Tab = {
	key: 'ownScores',
	name: `My scores`,
};

export const RegisterOwnGrades: FC = () => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(tabSlice.actions.addTab(ownGradesTab));

		return () => {
			dispatch(tabSlice.actions.removeTab(ownGradesTab.key));
		};
	}, [ dispatch ]);

	return <></>;
};

const OwnGrades: FC = () => {
	const {
		loading,
		semesters,
	} = useOwnScores();

	return loading
		? <Loading />
		: <Grades
			title="My Scores"
			semesters={semesters}
		/>;
};

export default OwnGrades;