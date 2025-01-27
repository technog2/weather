<script setup lang="ts">
defineProps<{
	image: string
	title: string
	value: string
}>();
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-1">
		<img :src="`src/assets/3d-icons/${image}.png`" class="h-8" loading="lazy">
		<span class="mt-2">{{ value }}</span>
		<span class="text-gray-400 text-xs">{{ title }}</span>
	</div>
</template>
