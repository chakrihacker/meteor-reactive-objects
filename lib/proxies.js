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
			'reverse',
			'shift',
			'sort',
			'splice',
			'unshift'
		]

		keys.forEach(function (key) {
			proxyArray[key] = function () {
				var output = array[key].apply(array, arguments)
				deps.changed();
				return output;
			}
		});

		deps.depend();
		return _.defaults(proxyArray, array)
	}
}