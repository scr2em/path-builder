/**
 * Transforms the properties of an object `obj` such that accessing any property returns a path string.
 * The path is constructed based on the `basePath` and the keys of the object leading to that property.
 * This function recursively processes each property that is an object itself (excluding arrays and null values),
 * appending each key to the current path. For leaf properties, it replaces the property with a getter that
 * returns the full path to the property value prefixed by `basePath`.
 *
 * @template T The shape/type of the object being passed.
 * @param {T} obj - The object whose properties will be transformed into path-returning getters.
 * @param {string} basePath - The base path to be prefixed to all generated paths.
 * @returns {T} The modified object where each property returns a path string when accessed.
 *
 * @example
 * // Assuming you have an object like this:
 * const myObj = { user: { id: '123', profile: { name: 'John' } } };
 * // and you use PathBuilder with a basePath of '/api'
 * const apiPaths = PathBuilder(myObj, '/api');
 * console.log(apiPaths.user.id);        // Outputs: '/api/user/123'
 * console.log(apiPaths.user.profile.name); // Outputs: '/api/user/profile/John'
 */

export function PathBuilder<const T>(obj: T, basePath: string): T {
	function buildPath(obj: any, currentPath: string) {
		for (const key in obj) {
			if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
				const path = `${currentPath}/${key}`
				buildPath(obj[key], path)
			} else {
				const fullPath = `${basePath}${currentPath}/${obj[key]}`
				Object.defineProperty(obj, key, {
					get: function () {
						return fullPath
					},
				})
			}
		}
	}

	buildPath(obj, "")

	return obj
}