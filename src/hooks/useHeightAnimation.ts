/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export interface Props {
	ref: React.RefObject<HTMLElement>
	duration: number
	calcHeight: () => string
	onSetHeight: (height: string) => void
}

export default function useHeightAnimation({
	ref,
	duration,
	calcHeight,
	onSetHeight,
}: Props) {
	const timeout = useRef<NodeJS.Timeout>(null) as React.MutableRefObject<NodeJS.Timeout>;
	const observer = useRef(new ResizeObserver(() => {
		onSetHeight(calcHeight());

		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			onSetHeight('auto');
		}, duration);
	}));

	useEffect(() => {
		return () => {
			observer.current.disconnect();
			clearTimeout(timeout.current);
		};
	}, []);

	useEffect(() => {
		if (!ref.current)
			return;

		observer.current.observe(ref.current);

		return () => {
			if (ref.current)
				observer.current.unobserve(ref.current);
		};
	}, [ ref ]);
}
