var dateFormat = {
	padLeftZero: function (str) {
		return ('00' + str).substr(str.length)
	},
	formatDate: function (date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + ''
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
			}
		}
		return fmt
	}
}

var jwt = "";
function arequest(url, data, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://www.valuations.cn:38080/room8' + url,
			method: data ? "POST" : "GET",
			data: data,
			header: {
				...header,
				jwt,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			success: (res) => {
				if( res && res.message && res.message.contains("JWT expired" || "authentication required") ) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
				if('/mockLogin' == url) {
					jwt = res.data.token
				}
				resolve(res);
			},
			fail: (err) => {
				if( err && err.message && err.message.contains("JWT expired" || "authentication required") ) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
				reject(err)
			}
		});
	})
}
export {
	dateFormat,
	arequest
}
