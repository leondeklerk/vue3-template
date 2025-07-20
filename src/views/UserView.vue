<template>
	<div>
		<div v-if="loading">
			<p>Loading user data...</p>
		</div>
		<div v-else>
			User:
			{{ route.params.id }}
			<input
				type="text"
				class="border border-gray-300 rounded p-2"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useRoute } from "vue-router";

const loading = ref<boolean>(true);
const route = useRoute();

defineOptions({ name: "UserView" });

await new Promise((resolve) => {
	setTimeout(() => {
		loading.value = false;
		resolve(true);
	}, 1000); // Simulate a 1 second delay
});
</script>
