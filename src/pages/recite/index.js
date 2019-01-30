import cml from "chameleon-api";
import store from "../../store";
import {
	PUSH_WORDS_TO_REVIEW,
	PUSH_WORDS_TO_SECTION,
	GET_SECTION,
	POST_RECORD
} from "../../store/action-types";
const soundBaseUrl = "https://wosiwords.oss-cn-hangzhou.aliyuncs.com/mp3";
class Index {
	data = {
		src: "",
		soundImgSrc: require("../../assets/images/sound.png"),
		eyeImgSrc: require("../../assets/images/eye.png"),
		translationShow: false,
		showEasyButton: true,
		loading: false,
		word: {},
		sectionIndex: 0,
		translation: "",
		end: false,
		iconStyle: {
			width: "60cpx",
			height: "60cpx"
		},
		viewportHeight: 0
	};
	computed = store.mapState({
		todayInfo: "todayInfo",
		words: "words",
		section: "section",
		translation() {
			if (!!this.word.translation) {
				return `${this.word.translation.slice(1)}`;
			}
			return "";
		},
		percent(state) {
			return state.todayInfo.wordsLength === 0
				? 0
				: (state.todayInfo.count / state.todayInfo.wordsLength) * 100;
		}
	});
	watch = {
		word: function(newVal) {
			const { proficiency, status, times } = newVal;
			this.showEasyButton =
				proficiency === 0 && status === 0 && times === 0 ? true : false;
		}
	};
	beforeCreate() {
		cml.setTitle("我思背单词");
	}
	created() {
		cml.getSystemInfo().then(info => {
			this.viewportHeight = info.viewportHeight;
		});
	}

	async mounted() {
		await store.dispatch(GET_SECTION);
		this.getRandomWord();
	}
	methods = {
		/**
		 * 点击太简单按钮
		 * 单词熟悉度规则index/index.js中有描述
		 */
		async handleEasy() {
			const englishWord = this.word.word;
			const { sectionIndex } = this;
			await store.dispatch(PUSH_WORDS_TO_REVIEW, {
				index: sectionIndex,
				proficiency: 8
			});
			this.getRandomWord();
			cml.showToast({
				message: `单词${englishWord}加入熟词`,
				duration: 1000
			});
		},
		/**
		 * 点击认识按钮
		 * 单词熟悉度规则index/index.js中有描述
		 */
		async handleCognizant() {
			const { sectionIndex } = this;
			let { proficiency, status, times, word: englishWord } = this.word;
			if (proficiency === 7) {
				await store.dispatch(PUSH_WORDS_TO_REVIEW, {
					index: sectionIndex,
					proficiency: 8
				});
				cml.showToast({
					message: `单词${englishWord}加入熟词`,
					duration: 1000
				});
			} else if (status === 2 || (proficiency === 4 && status === 1)) {
				if (proficiency === 4) {
					if (times === 0) {
						proficiency++;
					}
				} else {
					if (times === 0) {
						proficiency += 2;
					} else {
						proficiency++;
					}
				}
				await store.dispatch(PUSH_WORDS_TO_REVIEW, {
					index: sectionIndex,
					proficiency
				});
			} else {
				if (proficiency === 0 && status === 0 && times === 0) {
					proficiency = 2;
					status = 1;
				} else {
					status++;
				}
				await store.dispatch(PUSH_WORDS_TO_SECTION, {
					index: sectionIndex,
					proficiency,
					status
				});
			}
			this.getRandomWord();
		},
		/**
		 * 点击不认识按钮
		 * 单词熟悉度规则index/index.js中有描述
		 */
		async handleIncognizant() {
			const { sectionIndex } = this;
			let { proficiency, status, times } = this.word;
			if ((proficiency === 7 || proficiency === 4) && status === 0) {
				proficiency === 7 ? (proficiency = 4) : (proficiency = 3);
				time++;
			} else {
				times++;
			}
			await store.dispatch(PUSH_WORDS_TO_SECTION, {
				index: sectionIndex,
				proficiency,
				status,
				times
			});
			this.getRandomWord();
		},
		/**
		 * 从section中随机拿单词
		 */
		getRandomWord() {
			this.translationShow = false;
			if (this.section.length === 0) {
				this.end = true;
				return;
			}
			const length = this.section.length;
			let index;
			if (length > 2) {
				index = Math.floor(Math.random() * (length - 3));
			} else {
				index = 0;
			}
			this.sectionIndex = index;
			this.word = this.section[index];
			this.pronounce();
		},
		pronounce() {
			const { word } = this;
			this.src =
				`${soundBaseUrl}/${word.word}.mp3#` + new Date().getTime();
		},
		showTranslation() {
			this.translationShow = true;
		},
		/**
		 * 打卡
		 */
		async handleRecord() {
			this.end = false;
			this.loading = true;
			const review = await cml.getStorage("review");
			const bookInfo = await cml.getStorage("bookInfo");
			await store.dispatch(POST_RECORD, { review, pass: bookInfo.pass });
			this.loading = false;
			cml.navigateTo({
				path: "/pages/index/index"
			});
		}
	};
}

export default new Index();
