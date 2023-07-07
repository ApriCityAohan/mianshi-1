import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("@/page/index.vue"),
		},
		{
			path: "/login",
			name: "login",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("@/page/index.vue"),
		},
		{
			path: "/search",
			name: "search",
			component: () => import("@/page/search/search.vue"),
		},
	],
});

export default router;
