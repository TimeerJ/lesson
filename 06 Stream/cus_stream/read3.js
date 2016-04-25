"use strict";

const Readable = require('stream').Readable

// 底层数据
const dataSource = ['a', 'b', 'c']

const readable = Readable()

let n = 0;

readable._read = function () {

	process.nextTick(() => {
		if (dataSource.length) {
			this.push(dataSource.shift())
		} else {
			this.push(null)
		}
	});
}

// 进入暂停模式
readable.pause()
readable.on('data', data => console.log('data: ' + data))

var data = readable.read()
while (data !== null) {
	data = readable.read()
}

readable.on('readable', function () {
	while (readable.read() !== null);;
})