import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import MainLayout from "@/components/MainLayout.vue";

const routes = [
	{
		path: "/",
		component: MainLayout,
		children: [
			{
				path: "",
				name: "HomeView",
				component: () => import("@/views/HomeView.vue"),
				meta: { title: "Home" },
			},
			{
				path: "user/:id",
				name: "UserView",
				component: () => import("@/views/UserView.vue"),
				meta: { title: (route: RouteLocationNormalized) => `User ${route.params.id}` },
				props: true,
			},
			{
				path: "extra",
				name: "ExtraView",
				component: () => import("@/views/ExtraView.vue"),
				meta: { title: "Extra" },
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
