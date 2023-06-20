import { createSlice } from "@reduxjs/toolkit";
import baseScoreSlice from "./base";

const othersScoreSlice = createSlice({
	...baseScoreSlice,
	name: "othersScores",
});

export default othersScoreSlice;