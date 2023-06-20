
export default function makeLookupTable<T, K extends number | string | symbol, U extends boolean | undefined>(
	items: T[],
	key: (item: T) => K,
	keyIsUnique: U,
) {
	const lookup = {} as Record<K, T | T[]>;

	if(keyIsUnique)
		items.forEach(item => {
			lookup[key(item)] = item;
		});
	else
		items.forEach(item => {
			lookup[key(item)] ??= []
			;(lookup[key(item)] as T[]).push(item);
		});

	return lookup as Record<K, U extends true ? T : T[]>;
}