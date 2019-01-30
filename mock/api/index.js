module.exports = [
	{
		method: ["get"],
		path: "/api/user/info",
		controller: function(req, res, next) {
			res.json({
				status: "new",
				days: 0,
				plan: 25
			});
		}
	},
	{
		method: ["get"],
		path: "/api/book/info",
		controller: function(req, res, next) {
			res.json({});
		}
	},
	{
		method: ["get"],
		path: "/api/user/info/2",
		controller: function(req, res, next) {
			res.json({
				status: "normal"
			});
		}
	},
	{
		method: ["get"],
		path: "/api/book",
		controller: function(req, res, next) {
			res.json([{ name: "托福", id: "123", length: 4535 }]);
		}
	},
	{
		method: ["put"],
		path: "/api/book",
		controller: function(req, res, next) {
			res.json({
				bookid: "123",
				bookName: "托福",
				bookLength: "4535",
				curid: 0,
				pass: 0
			});
		}
	},
	{
		method: ["put"],
		path: "/api/plan",
		controller: function(req, res, next) {
			res.json({});
		}
	},
	{
		method: ["get"],
		path: "/api/review",
		controller: function(req, res, next) {
			res.json([]);
		}
	},
	{
		method: ["post"],
		path: "/api/record",
		controller: function(req, res, next) {
			res.json({
				status: "success",
				days: 1,
				curid: 25,
				pass: req.body.pass
			});
		}
	},
	{
		method: ["get"],
		path: "/api/words",
		controller: function(req, res, next) {
			res.json([
				{
					_id: 0,
					word: "prosperity",
					translation: " n. 繁荣,兴旺",
					phonetic: "prɑ'spɛrətɪ"
				},
				{
					_id: 1,
					word: "sympathy",
					translation: " n. 同情,忠诚,感应",
					phonetic: "'sɪmpəθi"
				},
				{
					_id: 2,
					word: "strengthen",
					translation: " vt. &amp;vi. 加强,变坚固",
					phonetic: "'strɛŋθn"
				},
				{
					_id: 3,
					word: "gull",
					translation: " n. 鸥\nn. 易受骗之人\nvt. 诈欺, 骗",
					phonetic: "ɡʌl"
				},
				{
					_id: 4,
					word: "bandmaster",
					translation: " n. 乐队队长",
					phonetic: "'bænd,mæstɚ"
				},
				{
					_id: 5,
					word: "currency",
					translation: " n. 货币; 流通",
					phonetic: "ˈkɜrənsi"
				},
				{
					_id: 6,
					word: "aggregation",
					translation: " n. 集合, 聚合, 集合体",
					phonetic: ",ægrɪ'geʃən"
				},
				{
					_id: 7,
					word: "temporarily",
					translation: " adj. 临时的\nadv. 暂时地,临时地",
					phonetic: "ˈtɛmpəˌrɛrili"
				},
				{
					_id: 8,
					word: "bloom",
					translation:
						" n. 花,钢块,兴旺\nvt. 使...开花\nvi. 开花,变得健康",
					phonetic: "blum"
				},
				{
					_id: 9,
					word: "crustacean",
					translation: " n. 甲壳类动物\nadj. 甲壳纲的",
					phonetic: "krʌ'steʃən"
				},
				{
					_id: 10,
					word: "fertilize",
					translation: " vt.使肥沃； 使受孕； 施肥",
					phonetic: "'fɝtəlaɪz"
				},
				{
					_id: 11,
					word: "leadership",
					translation: " n. 领导, 领导才干",
					phonetic: "'lidɚʃɪp"
				},
				{
					_id: 12,
					word: "complicated",
					translation: " adj. 复杂的, 难懂的",
					phonetic: "'kɑmplɪketɪd"
				},
				{
					_id: 13,
					word: "fluent",
					translation: " adj. 流利的, 流畅的",
					phonetic: "'fluənt"
				},
				{
					_id: 14,
					word: "hornet",
					translation: " n. 大黄蜂类,难缠的人物",
					phonetic: "'hɔrnɪt"
				},
				{
					_id: 15,
					word: "appropriate",
					translation: " adj. 适当的, 相称的\nvt. 拨出(款项); 占用",
					phonetic: "əˈproprɪət;(for v.) əˈproprɪet"
				},
				{
					_id: 16,
					word: "linger",
					translation: " vt. 消磨, 无所事事\nvi. 逗留,消磨,徘徊,漫步",
					phonetic: "'lɪŋɡɚ"
				},
				{
					_id: 17,
					word: "an army of",
					translation: " 一大批，一大群"
				},
				{
					_id: 18,
					word: "assure",
					translation: " vt. 保险,保证,确信,担保",
					phonetic: "ə'ʃʊr"
				},
				{
					_id: 19,
					word: "diverse",
					translation: " adj. 不同的,相异的,多种多样的",
					phonetic: "daɪ'vɝs"
				},
				{
					_id: 20,
					word: "countless",
					translation: " adj. 无数的，数不尽的",
					phonetic: "'kaʊntləs"
				},
				{
					_id: 21,
					word: "reversible",
					translation: " adj. 可逆的(双向的,回行的,可反转的)",
					phonetic: "rɪ'vɝsəbl"
				},
				{
					_id: 22,
					word: "unprecedented",
					translation: " adj. 空前的,前所未有的",
					phonetic: "ʌn'prɛsɪdɛntɪd"
				},
				{
					_id: 23,
					word: "indispensable",
					translation: " adj. 不可缺少的",
					phonetic: "'ɪndɪ'spɛnsəbl"
				},
				{
					_id: 24,
					word: "exterminate",
					translation: " vt. 扑灭, 消灭, 根绝",
					phonetic: "ɪk'stɝmə'net"
				}
			]);
		}
	}
];
