<template>
	<div class="condition" :style="{ height: more ? 'auto' : '40px' }">
		<p class="condition_label" data-v-6ff90b00="">{{ title }}:</p>
		<div class="condition_list">
			<div
				class="condition_list_item"
				:class="{ selected: selectedID === '' }"
				@click="handleClick('')">
				不限
			</div>
			<div
				v-for="(item, index) in list"
				:key="index"
				class="condition_list_item"
				:class="{ selected: selectedID === item.id }"
				@click="handleClick(item.id)">
				{{ item.name }}
			</div>
		</div>
		<div class="condition_switch" @click="moreBtn">
			<span>{{ more ? "收起" : "更多" }}</span>
			<el-icon><component :is="more ? 'ArrowUp' : 'ArrowDown'" /></el-icon>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: "",
	},
	list: {
		type: Array,
		default: () => [],
	},
	title: {
		type: String,
		default: "",
	},
});
const emit = defineEmits(["update:modelValue", "change"]);

const more = ref(false);

const selectedID = ref("");

const handleClick = (id) => {
	selectedID.value = id;
	emit("update:modelValue", id);
	emit("change");
};
const moreBtn = () => {
	more.value = !more.value;
};
</script>

<style lang="scss" scoped>
.condition {
	display: flex;
	overflow: hidden;
	margin-bottom: 10px;
}
.condition_label {
	width: 120px;
	line-height: 30px;
	padding-left: 10px;
	margin-top: 10px;
	color: #909399;
	font-size: 14px;
}
.condition_list {
	flex: 1;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-right: 74px;
}
.condition_list_item {
	cursor: pointer;
	line-height: 20px;
	padding: 5px 10px;
	margin-right: 10px;
	margin-top: 10px;
	border-radius: 2px;
	color: #303133;
	&:hover {
		color: #fff;
		background-color: #3473e6;
	}
}
.selected {
	color: #fff;
	background-color: #3473e6;
}
.condition_switch {
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 48px;
	height: 30px;
	margin-top: 10px;
	color: #3473e6;
}
</style>
