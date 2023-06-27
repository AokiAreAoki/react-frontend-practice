
export type EditableScoreParams = keyof Pick<Score, "subject" | "assessmentType" | "value">;
export const editableScoreParams: EditableScoreParams[] = [
	"subject",
	"assessmentType",
	"value",
];

export type CreateScoreParams = keyof Pick<Score, "semesterId" | "studentId" | EditableScoreParams>;
export const createScoreParams: CreateScoreParams[] = [
	"semesterId",
	"studentId",
	...editableScoreParams,
];

export type EditScoreParams = keyof Pick<Score, "id" | EditableScoreParams>;
export const editScoreParams: EditScoreParams[] = [
	"id",
	...editableScoreParams,
];

interface Score {
	id: number;
	subject: string
	assessmentType: string

	value: number;

	studentId: number;
	semesterId: number
}

export default Score;