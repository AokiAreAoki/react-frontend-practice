import ScoreSummary from "../../../types/ScoreSummary";

interface ScoreState extends ScoreSummary {
	upToDate: boolean
	loading: boolean
}

export default ScoreState;