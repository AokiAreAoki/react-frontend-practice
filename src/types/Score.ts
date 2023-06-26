
export type EditableScoreParams = "subject" | "assessmentType" | "score";
export const editableScoreParams: (EditableScoreParams & keyof Score)[] = [
	"subject",
	"assessmentType",
	"score",
];

interface Score {
	id: number;
	subject: string
	assessmentType: string

	score: number;

	studentId: number;
	semesterId: number
}

export default Score;