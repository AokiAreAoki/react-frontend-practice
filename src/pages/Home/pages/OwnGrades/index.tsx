import React, { FC, useEffect } from "react";
import useOwnScores from "../../../../hooks/useOwnScores";
import Grades from "../../components/Grades";
import { useTypedDispatch } from "../../../../redux";
import tabSlice, { RegisterTab, Tab } from "../../../../redux/slices/tabs";
import Loading from "../../../../components/Loading";

export const ownGradesTab: Omit<Tab, 'order'> = {
	key: 'own-scores',
	name: `My scores`,
};

export const RegisterOwnGrades: RegisterTab = ({ order }) => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(tabSlice.actions.addTab({
			...ownGradesTab,
			order,
		}));

		return () => {
			dispatch(tabSlice.actions.removeTab(ownGradesTab.key));
		};
	}, [ dispatch, order ]);

	return <></>;
};

const OwnGrades: FC = () => {
	const {
		loading,
		semesters,
	} = useOwnScores();

	return loading
		? <Loading />
		: <Grades semesters={semesters} />;
};

export default OwnGrades;