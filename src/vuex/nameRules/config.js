export function getNewArray(oldArray, filterKey, formatter) {
	return oldArray.map(item => {
		filterKey.forEach(arr => {
			if(item[arr]) {
				item[arr] = formatter(+item[arr]);
			}
		})
		return item;
	});
}