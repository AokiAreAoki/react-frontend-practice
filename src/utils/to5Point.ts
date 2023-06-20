
export default function to5Point(score: number): {
	score: number
	comment: string
}{
	if(score >= 90)
		return {
			score: 5,
			comment: 'Perfect',
		};

	if(score >= 70)
		return {
			score: 4,
			comment: 'Fine',
		};

	if(score >= 60)
		return {
			score: 3,
			comment: 'Satisfactorily',
		};

	if(score >= 35)
		return {
			score: 2,
			comment: 'Unsatisfactory with the option of retaking the exam',
		};

	return {
		score: 1,
		comment: 'Unsatisfactory with mandatory restudying of the discipline',
	};
}
