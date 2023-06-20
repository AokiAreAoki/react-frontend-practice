import React, { FC, useEffect } from "react";
import Flex from "../../components/Flex";
import Header from '../../components/Header';
import OwnGrades, { ownGradesTab } from "./pages/OwnGrades";
import OthersGrades, { othersGradesTab } from "./pages/OthersGrades";
import { useTypedDispatch, useTypedSelector } from "../../redux";
import useUserData from "../../hooks/useUserData";
import Loading from "../../components/Loading";
import tabSlice from "../../redux/slices/tabs";
import SemesterManagement, { semesterManagementTab } from "./pages/SemesterManagement";

const HomePage: FC = () => {
	const dispatch = useTypedDispatch();
	const {
		active: activeTab,
		list: tabList,
	} = useTypedSelector(state => state.tabs);

	const { loading } = useUserData();

	useEffect(() => {
		if(!activeTab && tabList.length !== 0)
			dispatch(tabSlice.actions.setActiveTab(tabList[0].key));
	}, [ activeTab, dispatch, tabList ]);

	return (
		<Flex
			dir="column"
			grow
			overflow
			align="stretch"
		>
			<Header />

			<Flex
				grow
				overflow
				dir="row"
				justify="center"
				align="stretch"
				style={{
					paddingInline: "30px",
					paddingBlock: "10px",
				}}
			>
				{loading
					? <Loading />
					: <>
						{activeTab === ownGradesTab.key && <OwnGrades />}
						{activeTab === othersGradesTab.key && <OthersGrades />}
						{activeTab === semesterManagementTab.key && <SemesterManagement />}
					</>
				}
			</Flex>
		</Flex>
	);
};

export default HomePage;