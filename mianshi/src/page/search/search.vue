<template>
	<el-container>
		<el-header height="50px">
			<!-- Header content -->
			<div class="layout_header page_w">
				<div class="left_box">
					<el-link
						class="left_title"
						type="primary"
						:underline="false"
						href=""
						target="_blank">
						<img
							src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png"
							alt=""
							style="width: 30px; height: 30px" />
						<h1>共创云</h1>
					</el-link>
					<div class="nav_box">
						<el-link type="info" :underline="false" href="" target="_blank">
							服务产品
						</el-link>
						<el-link type="info" :underline="false" href="" target="_blank">
							科创需求
						</el-link>
						<el-link type="info" :underline="false" href="" target="_blank">
							专利论文
						</el-link>
						<el-link type="info" :underline="false" href="" target="_blank">
							交易大数据
						</el-link>
					</div>
				</div>
				<div class="right-box">
					<el-button type="primary">登入</el-button>
					<el-button plain @click="">注册</el-button>
				</div>
			</div>
		</el-header>
		<el-main class="page_w">
			<!-- Main content -->
			<el-card shadow="never" :body-style="{ padding: '30px' }">
				<!-- card body -->
				<div class="panel_header">
					<div class="title_box">
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOE/tlL9Kw1AYxc9JCyIodLKLID5Bi6MI/kFdipgOtmP7JtY3SUd1aKR1UdEO4ijtE4jgUqeCgghJjyRaiMQ0qVJcmuly8/vOuTn3y0ckeMyGMjPpQUVE1cMpWO+OUbeL7MeVcxRQasoE3ApJ8ydOkk0jZR0XeBalEzI4OFeeGlQgVElk4k7ovZfQB2GJRv20wE6wxjcIRkAgn0Q0ihHQCUbIcsuxAe7/RTTSzIuw3HI1CfGhZugOSk23RuLwK9ujk71UzVuPux8yuO4pR8C8un8rPvWcnN+OjvvIgR58M4PLSqeWRu0vZtPd7ZXZhgB7K8uuzw6dbp7ldY51cfuCy7vXX6W2szqH3bV5T7W6ucD61CAU4zSi2M7634gm/qMNv3/ckRDFfxsVQSg26ISABH+O8VNc6wA3EtYmxNQW2Z74uP4A+kAQbn8IYmUAAAAASUVORK5CYII="
							alt="" />
						<p>资源大厅</p>
					</div>
					<div class="search_box">
						<el-input
							v-model="form.keywords"
							placeholder="请输入资源名称或用户名搜索"
							size="large"
							style="width: 100%">
							<template #append>
								<el-button type="primary" @click="onSearch">
									<el-icon><Search /></el-icon>
									<span>搜索</span>
								</el-button>
							</template>
						</el-input>
					</div>
				</div>
				<div class="panel_tabs">
					<div
						class="tabs_item"
						:class="{ active: activeName === 1 }"
						@click="tabsChange(1)">
						服务
					</div>
					<div
						class="tabs_item"
						:class="{ active: activeName === 2 }"
						@click="tabsChange(2)">
						需求
					</div>
					<div
						class="tabs_item"
						:class="{ active: activeName === 3 }"
						@click="tabsChange(3)">
						科创资源
					</div>
				</div>

				<div class="panel_main">
					<template v-if="activeName === 1">
						<div class="panel_condition">
							<condition
								v-model="form.serviceTypeId"
								title="服务类型"
								:list="technicalList"
								@change="getData"></condition>
							<div class="divider"></div>
							<condition
								v-model="form.technicalId"
								title="技术领域"
								:list="serviceList"
								@change="getData"></condition>
							<div class="divider"></div>
							<condition
								v-model="form.dataOrigin"
								title="数据来源"
								:list="dataOriginList"
								@change="getData"></condition>
							<div class="divider"></div>
							<condition
								v-model="form.province"
								title="地区"
								:list="provinceList"
								@change="getData"></condition>
						</div>
						<div class="panel_table">
							<el-table
								v-loading="loading"
								:data="tableData"
								@row-click="handleRowClick"
								border>
								<el-table-column label="服务名称" width="250">
									<template #default="{ row }">
										<p class="table_title">{{ row.title }}</p>
									</template>
								</el-table-column>
								<el-table-column label="发布用户" width="320">
									<template #default="{ row }">
										<div class="table_Name_box">
											<el-avatar
												shape="square"
												:size="40"
												:src="row.avatarUrl"
												style="margin-right: 20px">
												<img
													src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
											</el-avatar>
											<span class="table_orgName">{{ row.orgName }}</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="服务类型">
									<template #default="{ row }">
										<span>{{ row.serviceTypeName }}</span>
									</template>
								</el-table-column>
								<el-table-column label="成功成交数">
									<template #default="{ row }">
										<span class="table_totalDeal">{{ row.totalDeal }}</span>
									</template>
								</el-table-column>
								<el-table-column label="信用评价">
									<template #default="{ row }">
										<span class="table_avgScore">{{ row.avgScore }}</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="panel_pagination">
							<el-pagination
								:current-page="form.pageNum"
								:page-size="form.pageSize"
								background
								layout="prev, pager, next, jumper"
								:total="total"
								@current-change="handleCurrentChange" />
						</div>
					</template>
				</div>
			</el-card>
		</el-main>
	</el-container>
</template>

<script setup>
import { reactive, ref } from "vue";
import condition from "@/components/condition.vue";
import { getList, getLadderList, getTableData } from "@/api/search.js";
const form = reactive({
	pageNum: 1,
	pageSize: 10,
	keywords: "",
	serviceTypeId: null,
	serviceTypeId2: null,
	technicalId: null,
	province: "",
	dataOrigin: "",
	logicStatus: 1,
});
//分类搜索数据
const serviceList = ref([]);
const technicalList = ref([]);
const dataOriginList = ref([
	{
		id: "nttcc",
		name: "共创网",
	},
	{
		id: "51kehui",
		name: "科惠网",
	},
	{
		id: "jxstc",
		name: "江西省网上常设技术市场",
	},
	{
		id: "hntpe",
		name: "潇湘科技要素大市场",
	},
]);
const provinceList = ref([
	{ id: "湖北省", name: "湖北省" },
	{ id: "湖南省", name: "湖南省" },
	{ id: "江西省", name: "江西省" },
	{ id: "北京市", name: "北京市" },
	{ id: "天津市", name: "天津市" },
	{ id: "河北省", name: "河北省" },
	{ id: "山西省", name: "山西省" },
	{ id: "内蒙古自治区", name: "内蒙古自治区" },
	{ id: "辽宁省", name: "辽宁省" },
	{ id: "吉林省", name: "吉林省" },
	{ id: "黑龙江省", name: "黑龙江省" },
	{ id: "上海市", name: "上海市" },
	{ id: "江苏省", name: "江苏省" },
	{ id: "浙江省", name: "浙江省" },
	{ id: "山东省", name: "山东省" },
	{ id: "河南省", name: "河南省" },
	{ id: "广东省", name: "广东省" },
	{ id: "广西壮族自治区", name: "广西壮族自治区" },
	{ id: "海南省", name: "海南省" },
	{ id: "重庆市", name: "重庆市" },
	{ id: "四川省", name: "四川省" },
	{ id: "贵州省", name: "贵州省" },
	{ id: "云南省", name: "云南省" },
	{ id: "西藏自治区", name: "西藏自治区" },
	{ id: "陕西省", name: "陕西省" },
	{ id: "甘肃省", name: "甘肃省" },
	{ id: "青海省", name: "青海省" },
	{ id: "宁夏回族自治区", name: "宁夏回族自治区" },
	{ id: "新疆维吾尔自治区", name: "新疆维吾尔自治区" },
	{ id: "台湾省", name: "台湾省" },
	{ id: "香港特别行政区", name: "香港特别行政区" },
	{ id: "澳门特别行政区", name: "澳门特别行政区" },
]);
// 表格数据
const tableData = ref([]);
const total = ref(0);
// 选中Tabs
const activeName = ref(1);
const tabsChange = (name) => {
	activeName.value = name;
};
// 获取分类搜索数据
const getServiceList = () => {
	getList()
		.then((res) => {
			// console.log(res.data);
			serviceList.value = res.data.data.list;
		})
		.catch((err) => {
			ElMessage({
				showClose: true,
				message: "获取数据失败...稍后再试。",
				type: "error",
			});
		});
};

const getTechnical = () => {
	getLadderList()
		.then((res) => {
			// console.log(res.data);
			total.value = res.data.data.total;
			technicalList.value = res.data.data;
		})
		.catch((err) => {
			ElMessage({
				showClose: true,
				message: "获取数据失败...稍后再试。",
				type: "error",
			});
		});
};
// 表格加载状态
const loading = ref(false);
// 获取表格数据
const getData = () => {
	loading.value = true;
	getTableData(form)
		.then((res) => {
			// console.log(res.data.data);
			total.value = res.data.data.total;
			tableData.value = res.data.data.list;
		})
		.catch((err) => {
			ElMessage({
				showClose: true,
				message: "获取数据失败...稍后再试。",
				type: "error",
			});
		})
		.finally(() => {
			loading.value = false;
		});
};
getServiceList();
getTechnical();
getData();

// 表格发生点击事件
const handleRowClick = (row) => {
	// console.log(row);
	alert(row.description);
};
// 分页切换
const handleCurrentChange = (val) => {
	form.pageNum = val;
	getData();
};
// 搜索事件
const onSearch = () => {
	console.log(form.keywords);
	getData();
};
</script>

<style lang="scss" scoped>
// global style
.page_w {
	width: 1200px;
	margin: 0 auto;
}
:deep(.el-input-group__append) {
	background-color: #3473e6;
	color: #fff;
}
// scoped style :
.layout {
	height: 100vh;
}
.layout_header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	.left_box {
		display: flex;
		align-items: center;
		.left_title {
			display: flex;
			align-items: center;
			margin-right: 50px;
			img {
				margin-right: 10px;
			}
			h1 {
				font-size: 16px;
				font-weight: 700;
				line-height: 22px;
			}
		}
		.nav_box {
			display: flex;
			align-items: center;
			& > a + a {
				margin-left: 20px;
			}
		}
	}
}
.panel_header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.title_box {
		display: flex;
		align-items: center;
		img {
			margin-right: 10px;
		}
		p {
			font-size: 16px;
			font-weight: 700;
			line-height: 22px;
		}
	}
	.search_box {
		width: 540px;
	}
}

.panel_tabs {
	display: flex;
	align-items: center;
	height: 48px;
	padding: 0 30px;
	margin-bottom: 10px;
	background: #f7f8f9;
	border-radius: 4px;
	.tabs_item {
		position: relative;
		cursor: pointer;
		line-height: 20px;
		padding: 14px 6px;
		color: #303133;
		&:not(:last-child) {
			margin-right: 120px;
		}
		&::after {
			content: "";
			position: absolute;
			left: 50%;
			bottom: 8px;
			transform: translateX(-50%);
			width: 0;
			height: 2px;
			background-color: #3473e6;
			border-radius: 2px;
			transition: all 0.3s ease;
		}
		&:hover {
			color: #3473e6;
		}
		&:hover::after {
			width: 100%;
		}
	}
}
.panel_table {
	padding: 10px 0;
}
.table_title,
.table_orgName {
	font-size: 16px;
	font-weight: 700;
	color: #000;
}
.table_Name_box {
	display: flex;
	flex: 1;
	align-items: center;
}
.table_totalDeal {
	font-size: 16px;
	font-weight: 700;
	color: #f1b221;
}
.table_avgScore {
	font-size: 16px;
	font-weight: 700;
	color: #3473e6;
}
.panel_condition {
	padding: 0 20px;
	margin-bottom: 30px;
	background: #fff;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
}

.panel_pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
}
.divider {
	width: 100%;
	height: 1px;
	border-top: 1px dashed #dcdfe6;
}
.active {
	color: #3473e6 !important;
	&::after {
		width: 100% !important;
	}
}
</style>
