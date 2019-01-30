import cml from "chameleon-api";
import store from "../../store";
import { CHOOSE_BOOK, CHANGE_PLAN, GET_BOOKS } from "../../store/action-types";
class Index {
	data = {
		rightImgSrc: require("../../assets/images/right.png"),
		bookSelects: [""],
		planSelects: [
			"5",
			"10",
			"15",
			"20",
			"25",
			"30",
			"35",
			"40",
			"45",
			"50"
		],
		bookPickerShow: false,
		planPickerShow: false,
		loading: false,
		bookIndex: 0,
		planIndex: 0,
		viewportHeight: 0,
		switchValue: false
	};

	beforeCreate() {
		cml.setTitle("我思背单词");
	}

	created() {
		cml.getSystemInfo().then(info => {
			this.viewportHeight = info.viewportHeight;
		});
	}

	computed = store.mapState({
		bookInfo: "bookInfo",
		userInfo: "userInfo",
		books: "books",
		planDefaultIndex() {
			return this.planSelects.indexOf(this.userInfo.plan + "");
		},
		bookDefaultIndex() {
			let index = this.bookSelects.indexOf(this.bookInfo.bookName);
			index === -1 && (index = 0);
			return index;
		}
	});

	methods = {
		switchChange(e) {
			this.switchValue = e.detail.value;
		},
		bookCancel() {
			this.bookPickerShow = false;
		},
		async bookConfirm() {
			this.loading = true;
			const book = this.books[this.bookIndex];
			const { id: bookid } = book;
			store.dispatch(CHOOSE_BOOK, { bookid });
			this.bookPickerShow = false;
			this.loading = false;
		},
		planCancel() {
			this.planPickerShow = false;
		},
		async planConfirm() {
			this.loading = true;
			const plan = this.planSelects[this.planIndex];
			await store.dispatch(CHANGE_PLAN, { plan });
			this.loading = false;
			this.planPickerShow = false;
		},
		async selectBook() {
			this.loading = true;
			this.bookPickerShow = true;
			await store.dispatch(GET_BOOKS);
			this.bookSelects = this.books.map(item => {
				return item.name;
			});
			this.loading = false;
		},
		selectPlan() {
			this.planPickerShow = true;
		},
		bookSelectchange(e) {
			this.bookIndex = e.detail.index;
		},
		planSelectchange(e) {
			this.planIndex = e.detail.index;
		}
	};
}

export default new Index();
