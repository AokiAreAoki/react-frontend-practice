
export default function toECTS(score: number){
	if(score >= 90)
		return 'A';

	if(score >= 80)
		return 'B';

	if(score >= 70)
		return 'C';

	if(score >= 65)
		return 'D';

	if(score >= 60)
		return 'E';

	if(score >= 35)
		return 'FX';

	return 'F';
}
