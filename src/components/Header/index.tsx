import React, { FC, useMemo, useState } from "react";
import Flex from "../../components/Flex";
import useUserData from "../../hooks/useUserData";
import Loading from '../../components/Loading';
import Button from "../Button";
import Logout from "../Logout";
import styled from "styled-components";
import { RegisterOwnGrades } from "../../pages/Home/pages/OwnGrades";
import { RegisterOthersGrades } from "../../pages/Home/pages/OthersGrades";
import { RegisterSemesterManagement } from "../../pages/Home/pages/SemesterManagement";
import { useTypedDispatch, useTypedSelector } from "../../redux";
import tabSlice from "../../redux/slices/tabs";

const StyledFlex = styled(Flex)`
	padding-inline: 20px;
	padding-block: 15px;
    box-shadow: 0px 0px 10px 2px #999;
`;

const Header: FC = () => {
	const dispatch = useTypedDispatch();
	const tabs = useTypedSelector(state => state.tabs);

	const {
		loading,
		data,
	} = useUserData();

	const hasGrades = data?.role.hasGrades;
	const canSeeOthersGrades = data?.role.canSeeOthersGrades;
	const canEditSemesters = data?.role.canEditSemesters;

	const username = useMemo(() => {
		return [ data?.name, data?.surname ]
			.filter(v => !!v)
			.join(' ');
	}, [ data?.name, data?.surname ]);

	return (
		<StyledFlex dir="row" justify="space-between">
			<Flex dir="row" align="center">
				<b>
					{loading
						? <Loading />
						: `Welcome, ${username}`
					}
				</b>
			</Flex>

			<Flex gap="5px" dir="row">
				{hasGrades && <RegisterOwnGrades />}
				{canSeeOthersGrades && <RegisterOthersGrades />}
				{canEditSemesters && <RegisterSemesterManagement />}

				{tabs.list.map(tab => {
					return (
						<Button
							key={tab.key}
							color='primary'
							variant={tabs.active === tab.key ? 'solid' : 'outline'}
							onClick={() => {
								dispatch(tabSlice.actions.setActiveTab(tab.key));
							}}
						>
							{tab.name}
						</Button>
					);
				})}
			</Flex>

			<Logout />
		</StyledFlex>
	);
};

export default Header;