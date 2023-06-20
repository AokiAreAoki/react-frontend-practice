import React, { FC, useEffect, useState } from "react";

const Loading: FC = () => {
	const [ dotCount, setDotCount ] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setDotCount(prev => prev % 3 + 1);
		}, 200);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<>Loading{'.'.repeat(dotCount)}</>
	);
};

export default Loading;