const camelToKebabCase = (string: string) => string
	.replace(/([a-z][A-Z]|[A-Z]{2}[^A-Z])/g, m => m[0] + '-' + m.substring(1))
	.toLowerCase();

export default camelToKebabCase;