import React, { FC, useMemo } from "react";
import Flex from "../../components/Flex";
import useUserData from "../../hooks/useUserData";
import Loading from '../../components/Loading';
import Button from "../Button";
import useLogout from "../../hooks/useLogout";
import styled from "styled-components";
import { RegisterOwnGrades } from "../../pages/Home/pages/OwnGrades";
import { RegisterOthersGrades } from "../../pages/Home/pages/OthersGrades";
import { RegisterSemesterManagement } from "../../pages/Home/pages/SemesterManagement";

const StyledFlex = styled(Flex)`
	padding-inline: 20px;
	padding-block: 15px;
    box-shadow: 0px 0px 10px 2px #999;
`;

const Header: FC = () => {
	const logout = useLogout();
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
			</Flex>

			<Flex dir="row" gap="10px" align="center">
				<Button variant="secondary" onClick={logout}>
					Log out
				</Button>
			</Flex>
		</StyledFlex>
	);
};

export default Header;