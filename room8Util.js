import Socket from 'simple-websocket'

var socket

function startWS() {
	var jwt = uni.getStorageSync("jwt") || "";
	socket = socket || new Socket('wss://www.valuations.cn/room8/websocket?jwt=' + jwt)
	socket.on('connect', function() {
		socket.send('sup!')
	})
	socket.on('data', function(data) {
		console.log('got message: ' + data)
	})
}

function arequest(url, data, header) {
	var jwt = uni.getStorageSync("jwt") || "";
	return new Promise((resolve, reject) => {
		if (url == "/graphql") {
			var query = `{
	  me(jwt: "` + jwt +
				`") {
		id
		name
		channel
		channelId
		band {
			id
			name
			totalRank {
				rankValue
			}
		}
		totalRank {
			rankValue
		}
	  }
	}`
			uni.request({
				url: 'https://www.valuations.cn/room8/graphql',
				method: data ? "POST" : "GET",
				data: {
					query,
					variables: {},
				},
				header: {
					...header,
					jwt,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json; charset=UTF-8'
				},
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err)
				}
			});
		} else {
			uni.request({
				url: 'https://www.valuations.cn/room8' + url,
				method: data ? "POST" : "GET",
				data: data,
				header: {
					...header,
					jwt,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json; charset=UTF-8'
				},
				success: (res) => {
					if ('/wechatLogin' == url) {
						uni.setStorageSync("jwt", res.data.token)
					}

					if ('/wechatLogin' == url || '/me' == url) {
						if (res.data.id) {
							startWS()
						}
					}

					if (res && res.data && res.data.message && (
							res.data.message.indexOf("JWT expired") !== -1 ||
							res.data.message.indexOf("authentication required") !== -1
						)) {
						uni.removeStorageSync("jwt")
						uni.removeStorageSync("vuex")

						uni.redirectTo({
							url: "/pages/login/login"
						})
					}
					resolve(res);
				},
				fail: (err) => {
					reject(err)
				}
			});
		}
	})
}


export {
	arequest,
	startWS
}
