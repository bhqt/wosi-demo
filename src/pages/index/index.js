import cml from "chameleon-api";
import store from "../../store";
import { GET_INFO, GET_WORDS } from "../../store/action-types";
class Index {
	data = {
		settingImgSrc: require("../../assets/images/setting.png"),
		dialogShow: false,
		iconStyle: {
			width: "60cpx",
			height: "60cpx"
		},
		loading: false,
		viewportHeight: 0
	};

	computed = store.mapState({
		userInfo: "userInfo",
		bookInfo: "bookInfo",
		todayInfo: "todayInfo",
		status(state) {
			return state.userInfo.status === "success" ? "success" : "normal";
		},
		title(state) {
			const { todayInfo } = state;
			const { wordsLength, count } = todayInfo;
			if (count === 0) {
				return "今天还没有背单词";
			} else if (count <= wordsLength) {
				return "今天单词还没有背完";
			} else {
				return "今天单词已背完";
			}
		}
	});

	beforeCreate() {
		cml.setTitle("我思背单词");
	}

	created() {
		cml.getSystemInfo().then(info => {
			this.viewportHeight = info.viewportHeight;
		});
	}

	async mounted() {
		this.loading = true;
		await store.dispatch(GET_INFO);
		this.loading = false;
	}
	methods = {
		judgeUserInfo() {
			this.userInfo.status === "new"
				? (this.dialogShow = true)
				: this.gotoRecite();
		},
		/**
		 * 单词熟练度规则（初版，待改进）
		 * 【0】 新词 第一次学习（即times为0）为太简单，直接标记为熟词 7
		 * 第一次学习为认识，标记熟练度为2；其他情况 学习一轮后熟练度+1
		 * 【1】 一轮学习后熟练度+1 一次通过再+1
		 * 【2】 一轮学习后熟练度+1 一次通过再+1
		 * 【3】 一轮学习后熟练度+1 一次通过再+1
		 * 【4】 一轮学习数量为2 一次通过熟练度+1
		 * 【5】 在初始化今日单词的时候熟练度+1并过滤直接加到review
		 * 【6】 在初始化今日单词的时候熟练度+1并过滤直接加到review
		 * 【7】 认识：标记为熟词；不认识，熟练度置为4
		 */
		async gotoRecite() {
			this.loading = true;
			await store.dispatch(GET_WORDS);
			this.loading = false;
			return cml.navigateTo({
				path: "/pages/recite/index"
			});
		},
		gotoSetting() {
			this.dialogShow = false;
			cml.navigateTo({
				path: "/pages/setting/index"
			});
		},
		handleNewUser() {
			this.dialogShow = true;
		},
		closeDialog() {
			this.dialogShow = false;
		}
	};
}

export default new Index();
