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
				if('/mockLogin' == url) {
					jwt = res.data.token
				}
				resolve(res);
			},
			fail: (err) => {
				if(err.message.contains("JWT expired") || err.message.contains("authentication required")) {
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
	arequest
}
