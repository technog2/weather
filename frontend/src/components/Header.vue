<script setup lang="ts">
import IconMapPin   from '../icons/MapPin.vue';
import IconCalendar from '../icons/Calendar.vue';

defineProps<{
	city: string
	date: string
}>();

const emit = defineEmits(['showCities']);
</script>

<template>
	<header class="flex items-center justify-between gap-4 p-4">
		<button @click="emit('showCities')" class="flex items-center gap-1.5 font-sans">
			<IconMapPin class="text-blue-500" />
			<span class="">{{ city }}</span>
		</button>
		<div class="flex items-center gap-1.5 font-sans">
			<span class="text-sm text-gray-300">{{ date }}</span>
			<IconCalendar class="text-blue-500" />
		</div>
	</header>
</template>
