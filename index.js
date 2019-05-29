const xlsx = require("node-xlsx");
const request = require("request-promise");
const iconv = require("iconv-lite");
const xl = require("excel4node");
const workSheetsFromFile = xlsx.parse(`${__dirname}/mobile.xlsx`);
const url = "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=";
const yidong = [];
const liantong = [];
const dianxin = [];
const unknown = [];
const wb = new xl.Workbook();
const ws = wb.addWorksheet('移动');
const ws2 = wb.addWorksheet('联通');
const ws3 = wb.addWorksheet('电信');
const ws4 = wb.addWorksheet('未知');
run();
async function run() {
	for (let work of workSheetsFromFile) {
		const mobiles = work.data;
		for (const item of mobiles) {
			for (const mobile of item) {
				const res = await request({url:`${url}${mobile}`, encoding: null});
				const decodeRes = iconv.decode(res, "gbk");
				const yunyingshang = decodeRes.substr(72, 4);
				switch(yunyingshang) {
					case "中国电信": 
						dianxin.push(mobile);
						break;
					case "中国移动":
						yidong.push(mobile);
						break;
					case "中国联通":
						liantong.push(mobile);
						break;
					default:
						unknown.push(mobile);
						break;
				}
			}
		}
	}
	for (let i = 0, len = yidong.length; i < len; i++) {
		const item = yidong[i];
		if (typeof item === "string") {
			ws.cell(1, i + 1).string(yidong[i]);
		}
		else {
			ws.cell(1, i + 1).string(yidong[i].toString());
		}
	}
	for (let i = 0, len = liantong.length; i < len; i++) {
		const item = liantong[i];
		if (typeof item === "string") {
			ws2.cell(1, i + 1).string(liantong[i]);
		}
		else {
			ws2.cell(1, i + 1).string(liantong[i].toString());
		}
	}
	for (let i = 0, len = dianxin.length; i < len; i++) {
		const item = dianxin[i];
		if (typeof item === "string") {
			ws3.cell(1, i + 1).string(dianxin[i]);
		}
		else {
			ws3.cell(1, i + 1).string(dianxin[i].toString());
		}
	}
	for (let i = 0, len = unknown.length; i < len; i++) {
		const item = unknown[i];
		if (typeof item === "string") {
			ws4.cell(1, i + 1).string(unknown[i]);
		}
		else {
			ws4.cell(1, i + 1).string(unknown[i].toString());
		}
	}
	wb.write('手机号整列结果.xlsx');
}