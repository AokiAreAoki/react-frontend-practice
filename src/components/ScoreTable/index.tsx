import React, { FC, useState, useMemo } from "react";
import styled from "styled-components";

import Flex from "../Flex";
import Button from "../Button";
import ScoreCreationModal from "../ScoreCreationModal";
import ScoreEditingModal from "../ScoreEditingModal";
import ScoreDeletionPrompt from "../ScoreDeletionPrompt";

import { theme } from "../../assets/theme";

import { User } from "../../types/User";
import { Semester } from "../../types/Semester";
import Score from "../../types/Score";

import hasPassed from "../../utils/hasPassed";
import to5Point from "../../utils/to5Point";
import toECTS from "../../utils/toECTS";
import Nullable from "../../types/Nullable";

const StyledTable = styled.table`
	border: 1px solid black;
	border-collapse: collapse;

	table-layout: auto;

	& th, td {
		border: 1px solid ${theme.colors.secondary};
		border-collapse: collapse;

		text-align: center;
		padding-block: 10px;
		padding-inline: 10px;
	}
`;

interface Props {
	student: User
	semester: Nullable<Semester>
	scores: Score[]
	editable?: boolean
	onRefresh?: Nullable<() => void>
}

const ScoreTable: FC<Props> = ({
	student,
	semester,
	scores,
	editable,
	onRefresh,
}) => {
	const [ displayScoreCreationModal, setDisplayScoreCreationModal ] = useState(false);
	const [ scoreToEdit, setScoreToEdit ] = useState<Score | null>(null);
	const [ scoreToDelete, setScoreToDelete ] = useState<Score | null>(null);

	const table = useMemo(() => (
		<StyledTable>
			<tr>
				<th>Subject Name</th>
				<th>Assessment Type</th>
				<th>Score</th>
				<th>5-Point Score</th>
				<th>Pass / Fail</th>
				<th>ECTS Credits</th>

				{editable && (
					<th style={{ width: "fit-content" }}>Edit</th>
				)}
			</tr>

			{scores.map(score => {
				const national = to5Point(score.value);

				return (
					<tr key={score.id}>
						<td>{score.subject}</td>
						<td>{score.assessmentType}</td>

						<td>{score.value}</td>
						<td>
							<Flex>
								<div>{national.score}</div>
								<div>{`(${national.comment})`}</div>
							</Flex>
						</td>
						<td>
							{hasPassed(score.value) ? 'Pass' : 'Fail'}
						</td>
						<td>
							{toECTS(score.value)}
						</td>

						{editable && (
							<td style={{ width: "fit-content" }}>
								<Flex dir="row" gap="10px" justify="center">
									<Button
										color="primary"
										onClick={() => {
											setScoreToEdit(score);
										}}
									>
										{"Edit"}
									</Button>
									<Button
										color="negative"
										onClick={() => {
											setScoreToDelete(score);
										}}
									>
										{"Delete"}
									</Button>
								</Flex>
							</td>
						)}
					</tr>
				);
			})}
		</StyledTable>
	), [ editable, scores ]);

	return (
		<>
			{displayScoreCreationModal && student && <ScoreCreationModal
				semester={semester}
				student={student}
				onClose={hasChanges => {
					setDisplayScoreCreationModal(false);

					if(hasChanges)
						onRefresh?.();
				}}
			/>}

			{scoreToEdit && <ScoreEditingModal
				value={scoreToEdit}
				student={student}
				onClose={hasChanges => {
					setScoreToEdit(null);

					if(hasChanges)
						onRefresh?.();
				}}
			/>}

			{scoreToDelete && <ScoreDeletionPrompt
				value={scoreToDelete}
				student={student}
				onClose={hasChanges => {
					setScoreToDelete(null);

					if(hasChanges)
						onRefresh?.();
				}}
			/>}

			<Flex
				dir={scores.length === 0 ? "row" : "column"}
				align={scores.length === 0 ? "center" : "inherit"}
				gap="16px"
			>
				{scores.length === 0 ? 'No records' : table}

				{editable && (
					<Flex grow dir="row" gap="16px" justify="end">
						<Button onClick={() => {
							setDisplayScoreCreationModal(true);
						}}>
							{"Add score"}
						</Button>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default ScoreTable;