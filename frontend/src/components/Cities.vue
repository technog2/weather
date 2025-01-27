<script setup lang="ts">
import cities from '../assets/Cities';
</script>

<template>
	<ul class="fixed top-12 left-5 max-h-96 overflow-y-scroll flex flex-col gap-2 px-5 py-3 bg-gray-900 rounded-2xl border-2 border-gray-700 text-sm">
		<li v-for="city in cities">{{ city }}</li>
	</ul>
</template>
