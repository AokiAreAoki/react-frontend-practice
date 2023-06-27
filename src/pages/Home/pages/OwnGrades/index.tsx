import React, { FC, useEffect, useMemo } from "react";
import useOwnScores from "../../../../hooks/useOwnScores";
import { useTypedDispatch } from "../../../../redux";
import tabSlice, { RegisterTab, Tab } from "../../../../redux/slices/tabs";
import Loading from "../../../../components/Loading";
import useUser from "../../../../hooks/useUser";
import makeLookupTable from "../../../../utils/makeLookupTable";
import Years from "../../../../components/Years";

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
		loading: loadingUser,
		user,
	} = useUser();

	const {
		loading: loadingScores,
		semesters,
	} = useOwnScores();

	const years = useMemo(() => makeLookupTable(semesters, s => s.year, false), [ semesters ]);

	if(loadingScores || loadingUser)
		return <Loading />;

	if(!user)
		return "Could not retrieve user data";

	if(semesters.length === 0)
		return "No semesters";

	return <Years
		student={user}
		years={years}
	/>;
};

export default OwnGrades;