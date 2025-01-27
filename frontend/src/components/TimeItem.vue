<script setup lang="ts">
defineProps<{
	// image: string
	title: string
	value: string | number
}>();
</script>

<template>
	<li class="flex items-baseline gap-2 px-1 py-2 border-b-2 border-gray-700 first:pt-0 last:pb-0 last:border-none">
		<!-- <img :src="`src/assets/3d-icons/${image}.png`" class="h-6" loading="lazy"> -->
		<span class="text-gray-300">{{ title }}: </span>
		<div class="text-base">{{ (value).toFixed() }} <span class="text-blue-400">°</span></div>
	</li>
</template>
