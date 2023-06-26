import React, { FC, useState, useMemo } from "react";
import styled from "styled-components";

import Flex from "../Flex";
import Button from "../Button";
import EditScoreModal from "../EditScoreModal";
import DeleteScorePrompt from "../DeleteScorePrompt";

import { theme } from "../../assets/theme";
import Score from "../../types/Score";
import hasPassed from "../../utils/hasPassed";
import to5Point from "../../utils/to5Point";
import toECTS from "../../utils/toECTS";
import useStudents from "../../hooks/useStudents";

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
	scores: Score[]
	editable?: boolean
}

const ScoreTable: FC<Props> = ({
	scores,
	editable,
}) => {
	const [ scoreToEdit, setScoreToEdit ] = useState<Score | null>(null);
	const [ scoreToDelete, setScoreToDelete ] = useState<Score | null>(null);

	const { students } = useStudents(!editable);

	const scoreToEditStudent = useMemo(() => {
		return scoreToEdit && students.find(s => s.id === scoreToEdit.studentId);
	}, [ scoreToEdit, students ]);

	const scoreToDeleteStudent = useMemo(() => {
		return scoreToDelete && students.find(s => s.id === scoreToDelete.studentId);
	}, [ scoreToDelete, students ]);

	return (
		<>
			{scoreToEdit && <EditScoreModal
				student={scoreToEditStudent}
				score={scoreToEdit}
				onClose={() => {
					setScoreToEdit(null);
				}}
			/>}

			{scoreToDelete && <DeleteScorePrompt
				student={scoreToDeleteStudent}
				score={scoreToDelete}
				onClose={() => {
					setScoreToDelete(null);
				}}
			/>}

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

				{scores.slice(0, 1).map(score => {
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
		</>
	);
};

export default ScoreTable;