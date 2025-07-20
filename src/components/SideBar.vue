<template>
	<nav class="w-64 h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl flex flex-col">
		<!-- Header -->
		<div class="p-6 border-b border-slate-700">
			<h2 class="text-xl font-semibold text-center">Navigation</h2>
		</div>

		<!-- Navigation Links -->
		<div class="flex-1 p-4 space-y-2">
			<button
				class="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-700 hover:translate-x-1 transition-all duration-200 border-l-4 border-transparent hover:border-blue-400"
				@click="$router.push('/')"
			>
				<span class="text-lg">🏠</span>
				<span class="font-medium">Home</span>
			</button>

			<button
				class="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-700 hover:translate-x-1 transition-all duration-200 border-l-4 border-transparent hover:border-green-400"
				@click="$router.push('/user/123')"
			>
				<span class="text-lg">👤</span>
				<span class="font-medium">User 123</span>
			</button>

			<button
				class="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-700 hover:translate-x-1 transition-all duration-200 border-l-4 border-transparent hover:border-purple-400"
				@click="$router.push('/user/456')"
			>
				<span class="text-lg">👤</span>
				<span class="font-medium">User 456</span>
			</button>
			<button
				class="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-700 hover:translate-x-1 transition-all duration-200 border-l-4 border-transparent hover:border-yellow-400"
				@click="$router.push('/extra')"
			>
				<span class="text-lg">✨</span>
				<span class="font-medium">Extra View</span>
			</button>
		</div>

		<!-- Footer (optional) -->
		<div class="p-4 border-t border-slate-700">
			<div class="text-xs text-slate-400 text-center">v1.0.0</div>
		</div>
	</nav>
</template>

<script setup lang="ts"></script>
