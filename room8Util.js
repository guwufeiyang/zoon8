function arequest(url, data, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://111.229.221.83:38080/room8' + url,
			method: data ? "POST" : "GET",
			data: data,
			header: {
				...header,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			success: (res) => {
				console.log("url " + url + " got " + res.data)
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
 
// var loginRes = await arequest('/mockLogin', {
// 	code: ""
// 	// code: loginRes.authResult.code,
// 	// access_token: loginRes.authResult.access_token,
// 	// expires_in: loginRes.authResult.expires_in,
// 	// wechatId: infoRes.userInfo.openId,
// 	// name: infoRes.userInfo.nickName
// })
// jwt = loginRes.data.token
// console.log("login success", jwt);
export {
	arequest
}
