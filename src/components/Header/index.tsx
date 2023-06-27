import React, { FC, useMemo, useState } from "react";
import Flex from "../../components/Flex";
import useUser from "../../hooks/useUser";
import Loading from '../../components/Loading';
import Button from "../Button";
import Logout from "../Logout";
import styled from "styled-components";
import { useTypedDispatch, useTypedSelector } from "../../redux";
import tabSlice from "../../redux/slices/tabs";
import username from "../../utils/username";

const StyledFlex = styled(Flex)`
	padding-inline: 20px;
	padding-block: 15px;
    box-shadow: 0px 0px 10px 2px #999;
`;

const Header: FC = () => {
	const dispatch = useTypedDispatch();
	const tabs = useTypedSelector(state => state.tabs);
	const { loading, user } = useUser();

	return (
		<StyledFlex dir="row" justify="space-between">
			<Flex dir="row" align="center">
				<b>
					{loading
						? <Loading />
						: `Welcome, ${username(user)}`
					}
				</b>
			</Flex>

			<Flex gap="5px" dir="row">
				{tabs.list.length > 1 && tabs.list.map(tab => {
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