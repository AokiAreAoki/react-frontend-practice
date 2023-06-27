import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

export default function useDebouncedCallback<F extends (...args: any[]) => any>(callback: F, delayMS: number){
	const debouncedCallback = useMemo(
		() => debounce(callback, delayMS),
		[ callback, delayMS ],
	);

	useEffect(() => {
		return () => {
			debouncedCallback.cancel();
		};
	});

	return debouncedCallback;
}
