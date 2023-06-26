
interface Wrapper<K, V> {
	key: K
	value: V
}

export type Lookup<
	T,
	K extends number | string | symbol,
	U extends boolean | undefined,
> = Record<K, Wrapper<K, U extends true ? T : T[]>>;

export default function makeLookupTable<T, K extends number | string | symbol, U extends boolean | undefined>(
	items: T[],
	getKey: (item: T) => K,
	keyIsUnique: U,
) {
	const lookup: Partial<Lookup<T, K, U>> = {};

	if(keyIsUnique)
		// U is true
		items.forEach(item => {
			const key = getKey(item);
			(lookup as Lookup<T, K, true>)[key] = { key, value: item };
		});
	else
		// U is false
		items.forEach(item => {
			const key = getKey(item);
			(lookup as Lookup<T, K, false>)[key] ??= { key, value: [] };

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(lookup as Lookup<T, K, false>)[key]!.value.push(item);
		});

	return lookup as Lookup<T, K, U>;
}