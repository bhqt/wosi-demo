const state = {
	userInfo: {
		days: 0,
		plan: 25,
		status: "normal",
		date: ""
	},
	bookInfo: {
		bookid: "",
		bookName: "未选择单词书",
		bookLength: 1,
		curid: 0,
		pass: 0
	},
	todayInfo: {
		count: 0,
		wordsLength: 0
	},
	books: [],
	review: [],
	words: [],
	section: []
};

export default state;
