import React, { FC, useRef, useState, useCallback, useEffect, useMemo } from "react";
import Flex from "../Flex";
import Modal from "../Modal";
import Button from "../Button";
import Loading from "../Loading";
import EditObjectFields from "../EditObjectFields";

import API from "../../services/API";
import username from "../../utils/username";

import { User } from "../../types/User";
import Score, { EditableScoreParams } from "../../types/Score";
import Nullable from "../../types/Nullable";
import { Semester } from "../../types/Semester";
import useSemesters from "../../hooks/useSemesters";
import postfix from "../../utils/postfix";
import Select from "../Select";
import Ruler from "../Ruler";

declare namespace ScoreCreationModal {
	type Value = Partial<Pick<Score, EditableScoreParams>>;

	interface Props {
		value?: Value
		student: User
		semester?: Nullable<Semester>
		onClose: (hasChanges: boolean) => void
	}
}

const ScoreCreationModal: FC<ScoreCreationModal.Props> = ({
	student,
	value,
	semester,
	onClose,
}) => {
	const [ internal, setInternal ] = useState<Required<ScoreCreationModal.Value>>({
		subject: "",
		assessmentType: "",
		value: 0,
		...value,
	});
	const [ semesterId, setSemesterId ] = useState<Nullable<number>>(semester?.id);
	const [ loading, setLoading ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

	const abort = useRef(new AbortController());
	const {
		loading: loadingSemesters,
		semesters,
	} = useSemesters();

	const options = useMemo(() => {
		return semesters
			.map(s => ({
				key: String(s.id),
				label: `${postfix(s.year)} year, ${postfix(s.number)} semester`
			}))
			.sort((a, b) => a.label.localeCompare(b.label));
	}, [ semesters ]);

	const createScore = useCallback(() => {
		if (semesterId == null)
			return;

		setLoading(true);

		abort.current.abort();
		abort.current = new AbortController();

		API.createScore({
			abort: abort.current,
			score: {
				semesterId: semesterId,
				studentId: student.id,

				subject: internal.subject,
				assessmentType: internal.assessmentType,
				value: internal.value,
			},
		})
			.then(({ success, response, error, canceled }) => {
				setLoading(false);

				if (success) {
					console.log('score create response:', response);

					onClose(true);
				} else if (!canceled) {
					setErrorMessage(error.message);
				}
			});
	}, [ internal.assessmentType, internal.subject, internal.value, onClose, semesterId, student.id ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return (
		<Modal onClose={() => onClose(false)}>
			<Flex
				gap="15px"
				style={{
					width: "max(30vw, 500px)",
					padding: "15px",
				}}
			>
				{`Adding a score for ${username(student)}`}

				<Flex gap="5px">
					<Flex
						dir="row"
						align="center"
						gap="5px"
					>
						{"Select semester"}

						<Ruler />

						{loadingSemesters
							? <Loading />
							: <Select
								required
								value={semesterId}
								onChange={newValue => {
									setSemesterId(Number(newValue));
								}}
								options={options}
							/>
						}
					</Flex>

					<EditObjectFields<ScoreCreationModal.Value>
						object={internal}
						meta={{
							subject: { label: "Subject" },
							assessmentType: { label: "Assessment type" },
							value: { label: "Score", type: "number" },
						}}
						onChange={setInternal}
					/>
				</Flex>

				<Flex dir="row" gap="15px" justify="end" align="center">
					{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
					{loading && <Loading />}

					<Button color="primary" onClick={createScore}>Save</Button>
					<Button color="negative" onClick={() => onClose(false)}>Cancel</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default ScoreCreationModal;