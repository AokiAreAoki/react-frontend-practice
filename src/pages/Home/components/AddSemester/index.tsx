import React, { FC, useCallback, useMemo, useState } from "react";
import API from "../../../../services/API";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import postfix from "../../../../utils/postfix";
import { SemesterWithScores } from "../../../../types/Semester";
import useOwnScores from "../../../../hooks/useOwnScores";
import Prompt from "../../../../components/Prompt";

interface Props {
	year: number
	semesters: SemesterWithScores[]
}

const AddYear: FC<Props> = ({
	year,
	semesters,
}) => {
	const { refresh } = useOwnScores();
	const [ showModal, setShowModal ] = useState(false);

	const nextSemester = useMemo(() => {
		const lastSemester = semesters.reduce((a, s) => Math.max(a, s.number), 0);
		return lastSemester + 1;
	}, [ semesters ]);

	const addYear = useCallback(() => {
		API.createSemester({
			number: nextSemester,
			year,
		})
			.then(({ success }) => {
				if(success)
					refresh();
			});
	}, [ nextSemester, refresh, year ]);

	return (
		<>
			<Flex dir="row" justify="end">
				<Button variant="outline" color="primary" onClick={() => setShowModal(true)}>Add semester</Button>
			</Flex>

			{showModal && <Prompt
				onConfirm={() => {
					setShowModal(false);
					addYear();
				}}
				onCancel={() => setShowModal(false)}
			>
				Are you sure you want to create {postfix(nextSemester)} semester?
			</Prompt>}
		</>
	);
};

export default AddYear;