import React, { FC, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../redux";
import tabSlice from "../../redux/slices/tabs";

import Flex from "../../components/Flex";
import Header from '../../components/Header';
import Loading from "../../components/Loading";
import Display from "../../components/Display";
import useUser from "../../hooks/useUser";

import { useLocation, useNavigate } from "react-router-dom";
import OwnGrades, { RegisterOwnGrades, ownGradesTab } from "./pages/OwnGrades";
import OthersGrades, { RegisterOthersGrades, othersGradesTab } from "./pages/OthersGrades";
import SemesterManagement, { RegisterSemesterManagement, semesterManagementTab } from "./pages/SemesterManagement";

const HomePage: FC = () => {
	const dispatch = useTypedDispatch();
	const {
		active: activeTab,
		list: tabList,
	} = useTypedSelector(state => state.tabs);

	const { loading, user } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	const hasGrades = user?.role.hasGrades;
	const canSeeOthersGrades = user?.role.canSeeOthersGrades;
	const canEditSemesters = user?.role.canEditSemesters;

	useEffect(() => {
		const route = location.pathname.match(/[\w-]+$/)?.[0];

		if(activeTab){
			if(route !== activeTab)
				navigate(`/home/${activeTab}`, { replace: true });
		} else if(tabList.length !== 0){
			const tab = tabList.find(t => t.key === route) || tabList[0];

			dispatch(tabSlice.actions.setActiveTab(tab.key));
		}
	}, [ activeTab, dispatch, location.key, location.pathname, navigate, tabList ]);

	let order = 0;

	return (
		<Flex
			dir="column"
			grow
			overflow
			align="stretch"
		>
			{hasGrades && <RegisterOwnGrades order={++order} />}
			{canSeeOthersGrades && <RegisterOthersGrades order={++order} />}
			{/* {canEditSemesters && <RegisterSemesterManagement order={++order} />} */}

			<Header />

			<Flex
				grow
				overflow
				// align="stretch"
				style={{
					paddingInline: "30px",
					paddingBlock: "10px",
				}}
			>
				{loading
					? <Loading />
					: <>
						<Display display={activeTab === ownGradesTab.key}>
							<OwnGrades />
						</Display>
						<Display display={activeTab === othersGradesTab.key}>
							<OthersGrades />
						</Display>
						<Display display={activeTab === semesterManagementTab.key}>
							<SemesterManagement />
						</Display>
					</>
				}
			</Flex>
		</Flex>
	);
};

export default HomePage;