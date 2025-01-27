<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Header                 from './components/Header.vue';
import Main                   from './components/Main.vue';
import Footer                 from './components/Footer.vue';
import Cities                 from './components/Cities.vue';
import type { Data }          from './models/Data';

const data = ref<Data>();
const city = ref<string>('Tehran');
const date = ref<string>(new Date().toLocaleDateString());
const show = ref<boolean>(false);

onBeforeMount(getData);

async function getData() {
	try {
		// const res = await fetch(`https://weather-api167.p.rapidapi.com/api/weather/summery?place=${city.value}%2CGB&date=2025-01-17`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'x-rapidapi-key': '7ae01c6e4emsh372b01069fe4316p1e8478jsn2811b8db3e14',
		// 		'x-rapidapi-host': 'weather-api167.p.rapidapi.com'
		// 	}
		// });
		// data.value = await res.json();
		// data.value = {
		// 	lat: 51.5073219,
		// 	lon: -0.1276474,
		// 	timezone: "+00:00",
		// 	date: "2025-01-17",
		// 	units: "standard",
		// 	cloud_cover: {
		// 		afternoon: 100,
		// 		unit: "%"
		// 	},
		// 	humidity: {
		// 		afternoon: 84,
		// 		unit: "%"
		// 	},
		// 	precipitation: {
		// 		total: 0,
		// 		unit: "mm"
		// 	},
		// 	temperature: {
		// 		minimum: 276.98,
		// 		maximum: 279.42,
		// 		daytime: 278.67,
		// 		nighttime: 279.42,
		// 		evening: 277.84,
		// 		morning: 278.52,
		// 		unit: "K"
		// 	},
		// 	pressure: {
		// 		afternoon: 1036,
		// 		unit: "hPa"
		// 	},
		// 	wind: {
		// 		max_speed: 4.12,
		// 		degree: 210,
		// 		direction: "South-Southwest",
		// 		unit: "meter/sec"
		// 	}
		// }
		data.value = {
			lat: 48.2,
			lon: -124.87,
			timezone: "-08:00",
			date: "2025-01-17",
			units: "metric",
			cloud_cover: {
				afternoon: 74.8,
				unit: "%"
			},
			humidity: {
				afternoon: 65.88,
				unit: "%"
			},
			precipitation: {
				total: 0.05,
				unit: "mm"
			},
			temperature: {
				minimum: 5.27,
				maximum: 7.06,
				daytime: 6.23,
				nighttime: 7.06,
				evening: 6.27,
				morning: 5.34,
				unit: "°C"
			},
			pressure: {
				afternoon: 1029.7,
				unit: "hPa"
			},
			wind: {
				max_speed: 4.13,
				degree: 45.98,
				direction: "Northeast",
				unit: "meter/sec"
			}
		}
	} 
	catch(err) { console.error(err) }
}
</script>

<template>
	<Header :city="city" :date="date" @showCities="show = !show" />
	<Main   :data="data" />
	<Footer :data="data" @updateData="getData" />

	<Cities v-if="show" />
</template>
