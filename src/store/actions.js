import cml from "chameleon-api";
import dayjs from "dayjs";
import * as mutationTypes from "./mutation-types";
import * as actionTypes from "./action-types";
const SECTION_LENGTH = 7;
export default {
	[actionTypes.GET_INFO]({ dispatch }) {
		return Promise.all([
			dispatch(actionTypes.GET_USER_INFO),
			dispatch(actionTypes.GET_BOOK_INFO),
			dispatch(actionTypes.GET_TODAY_INFO)
		]);
	},
	/**
	 * 获取user信息
	 * 先从storage中拿，拿不到，再去请求（后面类似方法基本都是这么做的）
	 * date用来记录user信息的时效，第二天需重新请求
	 */
	async [actionTypes.GET_USER_INFO]({ commit, state }) {
		const date = dayjs().format("YY-MM-DD");
		let userInfo;
		try {
			userInfo = await cml.getStorage("userInfo");
		} catch (error) {}

		(!userInfo || date !== userInfo.date) &&
			((userInfo = await cml.get({
				url: "/api/user/info"
			})),
			await cml.setStorage("userInfo", { ...userInfo, date }));
		!!userInfo && commit(mutationTypes.UPDATE_USERINFO, userInfo);
	},
	/**
	 * 获取词库信息
	 */
	async [actionTypes.GET_BOOK_INFO]({ commit }) {
		let bookInfo;
		try {
			bookInfo = await cml.getStorage("bookInfo");
		} catch (error) {}
		!bookInfo &&
			((bookInfo = await cml.get({
				url: "/api/book/info"
			})),
			await cml.setStorage("bookInfo", bookInfo));
		!!bookInfo && commit(mutationTypes.UPDATE_BOOKINFO, bookInfo);
	},
	/**
	 * 获取今日学习情况
	 * todo success后 清空缓存的情况
	 */
	async [actionTypes.GET_TODAY_INFO]({ commit, state }) {
		let todayInfo;
		try {
			todayInfo = await cml.getStorage("todayInfo");
		} catch (error) {}
		!!todayInfo
			? commit(mutationTypes.UPDATE_TODAYINFO, todayInfo)
			: cml.setStorage("todayInfo", state.todayInfo);
	},
	/**
	 * 获取单词库
	 * 不存stroage，保持时效
	 */
	async [actionTypes.GET_BOOKS]({ commit }) {
		const books = await cml.get({
			url: "/api/book"
		});
		!!books && commit(mutationTypes.UPDATE_BOOKS, books);
	},
	/**
	 * 选择词库
	 * url:"/api/user/info/2" 是为了mock出不同status的情况
	 * 对接前需修改
	 */
	async [actionTypes.CHOOSE_BOOK]({ commit, state }, payload) {
		const data = await cml.request({
			url: "/api/book",
			data: payload,
			method: "PUT"
		});
		commit(mutationTypes.UPDATE_BOOKINFO, data);
		await cml.setStorage("bookInfo", data);
		if (state.userInfo.status === "new") {
			let userInfo = await cml.getStorage("userInfo");
			const data = await cml.get({
				url: "/api/user/info/2"
			});
			userInfo = { ...userInfo, ...data };
			await cml.setStorage("userInfo", userInfo),
				commit(mutationTypes.UPDATE_USERINFO, userInfo);
		}
	},
	/**
	 * 更改每日学习计划
	 */
	async [actionTypes.CHANGE_PLAN]({ commit }, payload) {
		let { plan } = payload;
		plan = parseInt(plan);
		await cml.request({
			url: "/api/plan",
			data: { plan },
			method: "PUT"
		});
		commit(mutationTypes.UPDATE_USERINFO, { plan: plan });
		const userInfo = await cml.getStorage("userInfo");
		userInfo.plan = plan;
		await cml.setStorage("userInfo", userInfo);
	},
	/**
	 * 获取复习单词
	 */
	async [actionTypes.GET_REVIEW]({ commit }) {
		let review = [];
		try {
			review = await cml.getStorage("review");
		} catch (error) {}
		review.length === 0 &&
			(review = await cml.get({
				url: "/api/review"
			}));
		commit(mutationTypes.UPDATE_REVIEW, review);
	},
	/**
	 * 获取新单词，与复习单词合并为今日要背的单词words
	 * 重置review，留以存放第二天需要复习的单词
	 * 过滤熟练度5和6的单词
	 * 初始化status和times
	 */
	async [actionTypes.GET_WORDS]({ commit, state, dispatch }) {
		let words;
		try {
			words = await cml.getStorage("words");
		} catch (error) {}
		if (!words) {
			await dispatch(actionTypes.GET_REVIEW);
			const data = await cml.get({
				url: "/api/words"
			});
			const newWords = data.map(item => {
				return {
					...item,
					proficiency: 0
				};
			});
			const review = state.review.filter(item => {
				const { proficiency } = item;
				return proficiency === 5 || proficiency === 6;
			});
			const _review = state.review.filter(item => {
				const { proficiency } = item;
				return !(proficiency === 5 || proficiency === 6);
			});
			words = [..._review, ...newWords];
			words = words.map(item => {
				return {
					...item,
					status: 0,
					times: 0
				};
			});
			words.sort(() => {
				return Math.random() - 0.5;
			});
			await cml.setStorage("words", words);
			await cml.setStorage("review", review);
			commit(mutationTypes.UPDATE_REVIEW, review);

			await dispatch(actionTypes.SET_WORDS_LENGTH, words.length);
		}
		commit(mutationTypes.UPDATE_WORDS, words);
	},
	/**
	 * 获取section,
	 * section用来存放固定数量的单词
	 * 每次随机从section中取一个单词出来
	 */
	async [actionTypes.GET_SECTION]({ commit, state }) {
		let section;
		try {
			section = await cml.getStorage("section");
		} catch (error) {}
		if (!section) {
			section = state.words.splice(0, SECTION_LENGTH);
			await cml.setStorage("section", section);
		}
		commit(mutationTypes.UPDATE_SECTION, section);
	},
	/**
	 * 设置wordsLength，即当天的单词量
	 */
	async [actionTypes.SET_WORDS_LENGTH]({ commit }, wordsLength) {
		const todayInfo = await cml.getStorage("todayInfo");
		commit(mutationTypes.UPDATE_TODAYINFO, { wordsLength });
		await cml.setStorage("todayInfo", { ...todayInfo, wordsLength });
	},
	/**
	 * count自增1，count是当天已学习的单词
	 */
	async [actionTypes.ADD_TODAY_COUNT]({ commit, state }) {
		const todayInfo = await cml.getStorage("todayInfo");
		let count = state.todayInfo.count;
		commit(mutationTypes.UPDATE_TODAYINFO, { count: ++count });
		await cml.setStorage("todayInfo", { ...todayInfo, count });
	},
	/**
	 * pass自增1，pass是熟词的数量
	 */
	async [actionTypes.ADD_USER_PASS]({ commit, state }) {
		const bookInfo = await cml.getStorage("bookInfo");
		let pass = state.bookInfo.pass;
		commit(mutationTypes.UPDATE_USERINFO, { pass: ++pass });
		await cml.setStorage("bookInfo", { ...bookInfo, pass });
	},
	/**
	 * 将当前的单词取出，附上属性，重新放到section末尾
	 */
	async [actionTypes.PUSH_WORDS_TO_SECTION](
		{ commit, state },
		{ index, proficiency, status, times }
	) {
		const section = state.section.slice();
		const word = {
			...section.splice(index, 1)[0],
			proficiency,
			status,
			times
		};
		section.push(word);
		commit(mutationTypes.UPDATE_SECTION, section);
		await cml.setStorage("section", section);
	},
	/**
	 * 将当前的单词取出，附上属性，放到review中，
	 * 并从words中取出一单词放入section
	 */
	async [actionTypes.PUSH_WORDS_TO_REVIEW](
		{ commit, dispatch, state },
		{ index, proficiency }
	) {
		const section = state.section.slice();
		const words = state.words.slice();
		let word = { ...section.splice(index, 1)[0], proficiency };
		if (proficiency !== 8) {
			let review = await cml.getStorage("review");
			review.push(word);
			await cml.setStorage("review", review);
		} else {
			await dispatch(actionTypes.ADD_USER_PASS);
		}
		if (words.length > 0) {
			word = { ...words.shift() };
			section.unshift(word);
			await cml.setStorage("words", words);
			commit(mutationTypes.UPDATE_WORDS, words);
		}
		await cml.setStorage("section", section);
		commit(mutationTypes.UPDATE_SECTION, section);
		await dispatch(actionTypes.ADD_TODAY_COUNT);
	},
	/**
	 * 打卡
	 */
	async [actionTypes.POST_RECORD]({ commit }, { review, pass }) {
		await cml.removeStorage("words");
		const data = await cml.post({
			url: "/api/record",
			data: {
				review,
				pass
			}
		});
		const { status, days, curid, pass: _pass } = data;
		commit(mutationTypes.UPDATE_USERINFO, { days, status });
		commit(mutationTypes.UPDATE_BOOKINFO, { curid, pass: _pass });
		let userInfo = await cml.getStorage("userInfo");
		let bookInfo = await cml.getStorage("bookInfo");
		userInfo = { ...userInfo, days, status };
		await cml.setStorage("userInfo", userInfo);
		bookInfo = { ...bookInfo, curid, pass: _pass };
		await cml.setStorage("bookInfo", bookInfo);
	}
};
