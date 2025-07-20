<template>
	<div class="flex flex-col h-screen w-screen">
		<!-- Top Bar -->
		<TopBar class="h-14 shrink-0" />

		<div class="flex flex-1 overflow-hidden">
			<!-- Sidebar -->
			<Sidebar class="w-64 shrink-0 border-r bg-gray-100 overflow-y-auto" />

			<!-- Main Area -->
			<div class="flex flex-col flex-1 overflow-hidden">
				<!-- Tab Bar -->
				<div class="h-10 flex items-center bg-white border-b px-2 overflow-x-auto whitespace-nowrap">
					<div
						v-for="tab in tabs"
						:key="tab.fullPath"
						class="flex items-center mr-2 px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
						:class="{
							'bg-blue-100 text-blue-700': tab.fullPath === $route.fullPath,
						}"
						@click="goToTab(tab)"
					>
						<span class="mr-1">{{ tab.title }}</span>
						<button
							class="text-xs text-red-500 hover:text-red-700"
							@click.stop="closeTab(tab)"
						>
							✕
						</button>
					</div>
				</div>

				<!-- Routed Content -->
				<div class="flex-1 overflow-auto bg-gray-50 p-4">
					<router-view v-slot="{ Component, route }">
						<keep-alive :include="cachedTabNames">
							<Suspense :key="route.fullPath">
								<template #default>
									<component :is="createWrappedComponent(Component, route)" />
								</template>
								<template #fallback>
									<div class="flex items-center justify-center h-full text-gray-500">Loading...</div>
								</template>
							</Suspense>
						</keep-alive>
					</router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter, type RouteLocationNormalized, type RouteLocationNormalizedLoaded, type RouteParamsGeneric } from "vue-router";
import TopBar from "./TopBar.vue";
import Sidebar from "./SideBar.vue";

interface Tab {
	name?: string;
	fullPath: string;
	params?: RouteParamsGeneric;
	title: string;
}

const currentRoute = useRoute();
const router = useRouter();

const tabs = ref<Tab[]>([]);

function addTab(route: RouteLocationNormalized) {
	const exists = tabs.value.some((tab) => tab.fullPath === route.fullPath);
	if (!exists) {
		const title = typeof route.meta.title === "function" ? route.meta.title(route) : route.meta.title || route.name || route.fullPath;

		tabs.value.push({
			name: route.name?.toString(),
			fullPath: route.fullPath,
			params: route.params,
			title: String(title),
		});
	}
}

function closeTab(tab: Tab) {
	const index = tabs.value.findIndex((t) => t.fullPath === tab.fullPath);
	if (index !== -1) {
		tabs.value.splice(index, 1);
		if (tab.fullPath === currentRoute.fullPath && tabs.value.length > 0) {
			router.push(tabs.value[Math.max(index - 1, 0)].fullPath);
		}
	}
}

import { defineComponent, h, type Component as VueComponent } from "vue";

const componentCache = new Map<string, VueComponent>();

function createWrappedComponent(component: VueComponent, route: RouteLocationNormalizedLoaded): VueComponent {
	const uniqueName = `${String(route.name)}-${route.fullPath}`;

	if (componentCache.has(uniqueName)) {
		return componentCache.get(uniqueName)!;
	}

	const wrapped = defineComponent({
		name: uniqueName,
		setup(props, { attrs }) {
			return () => h(component, { ...attrs });
		},
	});

	componentCache.set(uniqueName, wrapped);
	return wrapped;
}

function goToTab(tab: Tab) {
	router.push(tab.fullPath);
}

import { computed } from "vue";

const cachedTabNames = computed(() => {
	const names = tabs.value.map((tab) => `${tab.name}-${tab.fullPath}`);
	return names;
});

watch(
	() => currentRoute.fullPath,
	async () => {
		addTab(currentRoute);
	},
	{ immediate: true, flush: "post" },
);
</script>
