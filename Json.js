/* 首页-榜单数据 */
const billboardList = [
	{
		id: 1,
		img: "/static/temp/portrait-img1.jpg",
		rank: 1,
		name: "新裤子",
		integral: "839989289"
	}, 
	{
		id: 2,
		img: "/static/temp/portrait-img2.jpg",
		rank: 2,
		name: "刺猬乐队",
		integral: "839989289"
	}, {
		id: 3,
		img: "/static/temp/portrait-img3.jpg",
		rank: 3,
		name: "新裤子",
		integral: "839989289"
	}, 
	{
		id: 4,
		img: "/static/temp/portrait-img4.jpg",
		rank: 4,
		name: "新裤子",
		integral: "839989289"
	}, 
	{
		id: 5,
		img: "/static/temp/portrait-img1.jpg",
		rank: 5,
		name: "新裤子",
		integral: "839989289"
	}, 
	{
		id: 6,
		img: "/static/temp/portrait-img2.jpg",
		rank: 6,
		name: "新裤子",
		integral: "839989289"
	},
	{
		id: 7,
		img: "/static/temp/portrait-img3.jpg",
		rank: 7,
		name: "新裤子",
		integral: "839989289"
	}, 
	{
		id: 8,
		img: "/static/temp/portrait-img4.jpg",
		rank: 8,
		name: "新裤子",
		integral: "839989289"
	}, {
		id: 9,
		img: "/static/temp/portrait-img1.jpg",
		rank: 9,
		name: "新裤子",
		integral: "839989289"
	}, 
	{
		id: 10,
		img: "/static/temp/portrait-img2.jpg",
		rank: 10,
		name: "新裤子",
		integral: "839989289"
	}
]

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
	billboardList,
	contributeList,
	fanlist,
	orderList
}
