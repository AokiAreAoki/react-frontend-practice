
interface Score {
	id: number;
	subject: string
	assessmentType: string

	score: number;

	studentId: number;
	semesterId: number
}

export default Score;