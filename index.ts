/**
 * @template T The shape/type of the object being passed.
 * @param {T} obj - The object whose properties will be transformed into path-returning getters.
 * @param {string} basePath - The base path to be prefixed to all generated paths.
 * @returns {T} The modified object where each property returns a path string when accessed.
 *
 * @example
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