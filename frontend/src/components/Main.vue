<script setup lang="ts">
import { computed }  from 'vue';
import check         from '../assets/Check';
import Item          from './Item.vue';
import type { Data } from '../models/Data';

interface Item {
	image: string
	title: string
	value: string
}

const props   = defineProps<{ data: Data | any }>();
const checked = computed<any>(() => check(props.data));
const items   = computed<Item[]>(() => [
	{
		image: 'sun-wind',
		title: 'Wind',
		value: (props.data?.wind?.max_speed * 3.6).toFixed() + ' km/h'
	},
	{
		image: 'rain',
		title: 'Humidity',
		value: props.data?.humidity?.afternoon?.toFixed() + '%'
	},
	{
		image: 'cloud-rain-light',
		title: 'Precipitation',
		value: props.data?.precipitation?.total + ' mm'
	}
]);

// function toCelsius(tmp: number): string {
// 	return (tmp - 273.15).toFixed();
// }

// function toFahrenheit(tmp: number): string {
// 	return ((9/5) * (tmp - 273.15) + 32).toFixed();
// }
</script>

<template>
	<main class="p-7">
		<div class="text-xl">Today's Report</div> 
		<img 
			:src="`src/assets/3d-icons/${checked.icon}.png`" 
			class="block w-3/4 mx-auto my-8" 
			style="filter: drop-shadow(-120px 15px 50px #3c7dc5) drop-shadow(120px -15px 50px #faea4a)"
			loading="lazy"
		>
		<div class="text-center">
			<span>Its {{ checked.text }}</span>
			<div class="text-5xl font-bold mt-5">{{ (data.temperature?.daytime).toFixed() }} <span class="text-blue-400">°</span></div>
		</div>
		<div class="grid grid-cols-3 gap-4 mt-12 -mx-5">
			<Item 
				v-for="item, index in items"
				:image="item.image" 
				:title="item.title" 
				:value="item.value" 
				:key="index"
			/>
		</div>
	</main>
</template>
