import {
	UPDATE_USERINFO,
	UPDATE_BOOKINFO,
	UPDATE_TODAYINFO,
	UPDATE_BOOKS,
	UPDATE_REVIEW,
	UPDATE_WORDS,
	UPDATE_SECTION
} from "./mutation-types";
export default {
	[UPDATE_USERINFO](state, info) {
		state.userInfo = { ...state.userInfo, ...info };
	},
	[UPDATE_BOOKINFO](state, info) {
		state.bookInfo = { ...state.bookInfo, ...info };
	},
	[UPDATE_TODAYINFO](state, info) {
		state.todayInfo = { ...state.todayInfo, ...info };
	},
	[UPDATE_BOOKS](state, books) {
		state.books = books.slice();
	},
	[UPDATE_REVIEW](state, review) {
		state.review = review.slice();
	},
	[UPDATE_WORDS](state, words) {
		state.words = words.slice();
	},
	[UPDATE_SECTION](state, section) {
		state.section = section.slice();
	}
};
