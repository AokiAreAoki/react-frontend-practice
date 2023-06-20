import React, { FC } from "react";
import { Semester } from "../../../../../../types/Semester";
import Flex from "../../../../../../components/Flex";
import postfix from "../../../../../../utils/postfix";
import Ruler from "../../../../../../components/Ruler";
import Button from "../../../../../../components/Button";

interface Props {
	semester: Semester
}

const SemesterControl: FC<Props> = ({
	semester,
}) => {
	return (
		<Flex
			key={semester.id}
			dir="row"
			align="center"
			gap="15px"
		>
			{postfix(semester.number)} semester

			<Ruler />

			<Button
				color="negative"
				onClick={() => {

				}}
			>
				{"Delete"}
			</Button>
		</Flex>
	);
};

export default SemesterControl;