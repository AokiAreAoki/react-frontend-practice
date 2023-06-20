import React, { FC, useEffect } from "react";
import useStudents from "../../../../hooks/useStudents";
import Grades from "../../components/Grades";
import tabSlice, { Tab } from "../../../../redux/slices/tabs";
import { useTypedDispatch } from "../../../../redux";
import Loading from "../../../../components/Loading";

export const othersGradesTab: Tab = {
	key: 'scores',
	name: `Students' scores`,
};

export const RegisterOthersGrades: FC = () => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(tabSlice.actions.addTab(othersGradesTab));

		return () => {
			dispatch(tabSlice.actions.removeTab(othersGradesTab.key));
		};
	}, [ dispatch ]);

	return <></>;
};

const OthersGrades: FC = () => {
	const {
		loading,
		refresh,
		students,
	} = useStudents();

	const semesters = [];

	return loading
		? <Loading />
		: <Grades
			title="Someone's Scores"
			semesters={semesters}
		/>;
};

export default OthersGrades;