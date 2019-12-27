import client from "@kqtec/graphql-uni-app-client"

const graphqlClient = new client({ uri: 'https://www.valuations.cn/room8/graphql' });
var jwt;
function arequest(url, data, header) {
	jwt = jwt || uni.getStorageSync("jwt") || "";
	return new Promise((resolve, reject) => {
		if(url == "/me2222") {
			graphqlClient.query(`{
	  me(jwt: "` + jwt + `") {
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
	}`).then(result => {
				resolve(result);
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
			
					if (res && res.data && res.data.message && (
							res.data.message.indexOf("JWT expired") !== -1 || 
							res.data.message.indexOf("authentication required") !== -1
						)) {
						uni.removeStorageSync("jwt")
						uni.removeStorageSync("vuex")
						uni.navigateTo({
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
	arequest
}
