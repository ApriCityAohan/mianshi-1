import axios from "@/axios";

export function getList() {
	return axios.get("https://service.test.nttcc.com.cn/api/v1/technical/list");
}
export function getLadderList() {
	return axios.get(
		"https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist"
	);
}

export function getTableData(params) {
	const r = queryParse(params);
	return axios.get(`https://service.test.nttcc.com.cn/api/v1/service/list${r}`);
}

function queryParse(query) {
	const q = [];
	for (const key in query) {
		if (query[key]) {
			q.push(`${key}=${encodeURIComponent(query[key])}`);
		}
	}
	let r = q.join("&");
	r = r ? "?" + r : "";
	return r;
}
