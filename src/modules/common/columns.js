
const codeColumns = [{
	prop: 'id',
	label: 'id',
	width: '130'
}, {
	prop: 'code',
	label: '字段'
}, {
	prop: 'shortCode',
	label: '字段简写'
}, {
	prop: 'name',
	label: '字段名称'
}, {
	prop: 'createTime',
	label: '创建时间',
	width: '180'
}, {
	prop: 'updateTime',
	label: '更新时间',
	width: '180'
}, {
	slot: 'operate',
	label: '操作'
}];

export default {
	codeColumns
}