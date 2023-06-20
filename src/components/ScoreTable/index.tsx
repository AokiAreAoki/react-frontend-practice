import React, { FC } from "react";
import Score from "../../types/Score";
import styled from "styled-components";
import to5Point from "../../utils/to5Point";
import Flex from "../Flex";
import hasPassed from "../../utils/hasPassed";
import toECTS from "../../utils/toECTS";
import { theme } from "../../assets/theme";

const StyledTable = styled.table`
	border: 1px solid black;
	border-collapse: collapse;

	& th, td {
		border: 1px solid ${theme.colors.secondary};
		border-collapse: collapse;

		text-align: center;
		padding-block: 10px;
		padding-inline: 10px;
	}
`;

interface Props {
	scores: Score[]
}

const ScoreTable: FC<Props> = ({
	scores,
}) => {
	return (
		<StyledTable>
			<tr>
				<th>Subject Name</th>
				<th>Assessment Type</th>
				<th>Score</th>
				<th>5-Point Score</th>
				<th>Pass / Fail</th>
				<th>ECTS Credits</th>
			</tr>

			{scores.map(score => {
				const national = to5Point(score.score);

				return (
					<tr key={score.id}>
						<td>{score.subject}</td>
						<td>{score.assessmentType}</td>

						<td>{score.score}</td>
						<td>
							<Flex>
								<div>{national.score}</div>
								<div>{`(${national.comment})`}</div>
							</Flex>
						</td>
						<td>
							{hasPassed(score.score) ? 'Pass' : 'Fail'}
						</td>
						<td>
							{toECTS(score.score)}
						</td>
					</tr>
				);
			})}
		</StyledTable>
	);
};

export default ScoreTable;