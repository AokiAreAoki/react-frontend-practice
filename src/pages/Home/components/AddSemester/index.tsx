import React, { FC, useCallback, useMemo, useState } from "react";
import API from "../../../../services/API";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import postfix from "../../../../utils/postfix";
import { SemesterWithScore } from "../../../../types/Semester";
import useRefreshScores from "../../../../hooks/useRefreshScores";

interface Props {
	year: number
	semesters: SemesterWithScore[]
}

const AddYear: FC<Props> = ({
	year,
	semesters,
}) => {
	const refresh = useRefreshScores();
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
				<Button color="secondary" onClick={() => setShowModal(true)}>Add semester</Button>
			</Flex>

			<Modal open={showModal}>
				<Flex gap="15px" style={{ padding: "15px" }}>
					<Flex wrap>
						Are you sure you want to create {postfix(nextSemester)} semester?
					</Flex>

					<Flex dir="row" gap="15px" justify="end">
						<Button onClick={() => {
							setShowModal(false);
							addYear();
						}}>Create</Button>
						<Button onClick={() => setShowModal(false)}>Cancel</Button>
					</Flex>
				</Flex>
			</Modal>
		</>
	);
};

export default AddYear;