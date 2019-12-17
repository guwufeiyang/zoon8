function dorequest(url, data, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://192.168.10.105:38080/room8' + url,
			method: data ? "POST" : "GET",
			data: data,
			header: header,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
var jwt;
async function arequest(url, data, header) {
	if(!jwt) {
		var loginRes = await dorequest('/mockLogin', {
			code: ""
			// code: loginRes.authResult.code,
			// access_token: loginRes.authResult.access_token,
			// expires_in: loginRes.authResult.expires_in,
			// wechatId: infoRes.userInfo.openId,
			// name: infoRes.userInfo.nickName
		})
		jwt = loginRes.data
		console.log("login success", jwt);
	}
	return await dorequest(url, data, {'jwt': jwt, ...header})
}
				

export {
	arequest
}