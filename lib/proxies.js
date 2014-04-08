ReactiveObject.proxies = {
	'default': function (value, deps) {
		deps.depend();
		return value
	},
	'array': function (array, deps) {
		proxyArray = []
		keys = [
			'push',
			'pop',
			'push',
			'reverse',
			'shift',
			'sort',
			'splice',
			'unshift'
		]

		keys.forEach(function (key) {
			proxyArray[key] = function () {
				array[key].apply(array, arguments)
				deps.changed();
			}
		});

		deps.depend();
		return _.defaults(proxyArray, array) //complete array clone.
	}
}