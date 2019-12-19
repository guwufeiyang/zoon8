var jwt = "";
function arequest(url, data, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://111.229.221.83:38080/room8' + url,
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
				reject(err)
			}
		});
	})
}
export {
	arequest
}
