import { createSlice } from "@reduxjs/toolkit";
import baseScoreSlice from "./base";

const ownScoreSlice = createSlice({
	...baseScoreSlice,
	name: "ownScores",
});

export default ownScoreSlice;