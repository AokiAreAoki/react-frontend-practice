import Score from "./Score";

export interface Semester {
	id: number
	year: number;
	number: number;
	}

export interface SemesterWithScore extends Semester {
	scores: Score[]
}
