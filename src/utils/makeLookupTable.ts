
interface Wrapper<K, V> {
	key: K
	value: V
}

export default function makeLookupTable<T, K extends number | string | symbol, U extends boolean | undefined>(
	items: T[],
	getKey: (item: T) => K,
	keyIsUnique: U,
) {
	type Lookup<U2 extends boolean = boolean> = Partial<Record<K, Wrapper<K, U2 extends true ? T : T[]>>>;
	const lookup: Lookup = {};

	if(keyIsUnique)
		items.forEach(item => {
			const key = getKey(item);
			lookup[key] = { key, value: item };
		});
	else
		items.forEach(item => {
			const key = getKey(item);
			lookup[key] ??= { key, value: [] };

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(lookup as Lookup<false>)[key]!.value.push(item);
		});

	return lookup as Record<K | string, Wrapper<K, U extends true ? T : T[]>>;
}