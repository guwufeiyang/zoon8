/* 贡献榜 */
const contributeList = [{
	img: "/static/temp/portrait-img1.jpg",
	bg: "#fa6889"
}, {
	img: "/static/temp/portrait-img2.jpg",
	bg: "#f98c4e"
}, {
	img: "/static/temp/portrait-img3.jpg",
	bg: "#eb68fa"
}, {
	img: "/static/temp/portrait-img4.jpg",
	bg: "#8b68fa"
}, {
	img: "/static/temp/portrait-img1.jpg",
	bg: "#68dffa"
}
]

const contributeAllList = [{
	id: "001",
	rank: 1,
	img: "/static/temp/portrait-img1.jpg",
	name: '摩托姐姐',
	integral: 18888,
	
}, {
	id: "002",
	rank: 2,
	img: "/static/temp/portrait-img2.jpg",
	name: 'Guwufeiyang',
	integral: 1888,
}, {
	id: "003",
	rank: 3,
	img: "/static/temp/portrait-img3.jpg",
	name: '最爱甜甜了',
	integral: 1885,
}, {
	id: "004",
	rank: 4,
	img: "/static/temp/portrait-img4.jpg",
	name: '摩托姐姐',
	integral: 1883,
}, {
	id: "005",
	rank: 5,
	img: "/static/temp/portrait-img1.jpg",
	name: 'Guwufeiyang',
	integral: 1880
}
]

/* 粉丝团 */
const fanlist = [
{ 
	fanId: 1,
	integral: 18888,
	name: 'Guwufeiyang',
	portrait: '/static/temp/portrait-img1.jpg',
	message: '欢迎大家来到这里。',
	time: "14:09:31"
}, {
	fanId: 2,
	integral: 18882342,
	name: '摩托姐姐',
	portrait: '/static/temp/portrait-img2.jpg',
	message: '甜甜加油啊！',
	time: "14:09:31"
}, {
	fanId: 3,
	integral: 188883,
	name: '最爱甜甜了',
	portrait: '/static/temp/portrait-img3.jpg',
	message: '小摩托一起加油！',
	time: "14:09:31"
},
{ 
	fanId: 4,
	integral: 1823224,
	name: 'Guwufeiyang',
	portrait: '/static/temp/portrait-img1.jpg',
	message: '欢迎大家来到这里。',
	time: "14:09:31"
}, {
	fanId: 5,
	integral: 18882342,
	name: '摩托姐姐',
	portrait: '/static/temp/portrait-img2.jpg',
	message: '甜甜加油啊！',
	time: "14:09:31"
}, {
	fanId: 6,
	integral: 188883,
	name: '最爱甜甜了',
	portrait: '/static/temp/portrait-img3.jpg',
	message: '小摩托一起加油！',
	time: "14:09:31"
}, { 
	fanId: 4,
	integral: 18888888888,
	name: 'Guwufeiyang',
	portrait: '/static/temp/portrait-img1.jpg',
	message: '欢迎大家来到这里。',
	time: "14:09:31"
}, {
	fanId: 5,
	integral: 18882342,
	name: '摩托姐姐',
	portrait: '/static/temp/portrait-img2.jpg',
	message: '甜甜加油啊！',
	time: "14:09:31"
}, {
	fanId: 6,
	integral: 188883,
	name: '最爱甜甜了',
	portrait: '/static/temp/portrait-img3.jpg',
	message: '小摩托一起加油！',
	time: "14:09:31"
}]

/* 贡献积分底部弹窗 */
const propList = [
	{
		img: '/static/prop-img1.png',
		name: '荧光棒',
		integral: '100'
	},
	{
		img: '/static/prop-img2.png',
		name: '应援灯牌',
		integral: '300'
	},
	{
		img: '/static/prop-img3.png',
		name: '为你比心',
		integral: '500'
	},
	{
		img: '/static/prop-img4.png',
		name: '玫瑰花',
		integral: '800'
	},
	{
		img: '/static/prop-img5.png',
		name: '好运锦鲤',
		integral: '2000'
	},
	{
		img: '/static/prop-img6.png',
		name: '大吉他',
		integral: '5000'
	},
	{
		img: '/static/prop-img7.png',
		name: '歌神话筒',
		integral: '8000'
	},
	{
		img: '/static/prop-img8.png',
		name: '金唱片',
		integral: '9999'
	}
]

/*订单列表*/
const orderList = [
	{
		id: 1,
		img: "/static/logo.png",
		title: '程新林演唱会门票',
		detail: '详情相亲相亲',
		status: 1,
		type: 0,
	},
	{
		id: 2,
		img: "/static/logo.png",
		title: '程新林演唱会门票',
		detail: '详情相亲相亲',
		status: 0,
		type: 0,
	},
	{
		id: 3,
		img: "/static/logo.png",
		title: '程新林演唱会门票',
		detail: '详情相亲相亲',
		status: 0,
		type: 2,
	},
	{
		id: 4,
		img: "/static/logo.png",
		title: '程新林演唱会门票',
		detail: '详情相亲相亲',
		status: 0,
		type: 2,
	},
	{
		id: 5,
		img: "/static/logo.png",
		title: '程新林演唱会门票',
		detail: '详情相亲相亲',
		status: 2,
		type: 2,
	},
]

export default {
	contributeList,
	contributeAllList,
	fanlist,
	propList,
	orderList
}
