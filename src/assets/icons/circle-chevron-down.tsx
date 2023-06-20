import React from "react";
import { theme } from "../theme";

export interface Props {
	color?: string
}

export default ({
	color = theme.colors.secondary,
}: Props) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0_4069_10865)">
			<path
				d="M8.00001 14.6666C11.6819 14.6666 14.6667 11.6818 14.6667 7.99992C14.6667 4.31802 11.6819 1.33325 8.00001 1.33325C4.31811 1.33325 1.33334 4.31802 1.33334 7.99992C1.33334 11.6818 4.31811 14.6666 8.00001 14.6666Z"
				stroke={color}
				strokeWidth="1.5"
			/>
			<path d="M5.33334 7L8.00001 9.66667L10.6667 7"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_4069_10865">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
);