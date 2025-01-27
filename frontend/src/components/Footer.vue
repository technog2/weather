<script setup lang="ts">
import { 
	ref, 
	computed, 
	onMounted 
} from 'vue';
import TimeItem      from './TimeItem.vue';
import type { Data } from './models/Data';

const props   = defineProps<{ data: Data }>();
const emit    = defineEmits(['updateData']);
const times   = { sunrise: { hours: 7, minutes: 1 }, sunset: { hours: 5, minutes: 36 } };
const loading = ref<boolean>(false);
const button  = ref<string>('Tommorrow');
const hours   = ref<number>(new Date().getHours());
const minutes = ref<number>(new Date().getMinutes());
const clock   = computed<string>(() => `${hours.value % 12}:${fixNum(minutes.value)} ${hours.value > 12 ? 'P' : 'A'}M`);
const left    = computed<number>(() => (toMin(hours.value, minutes.value) - 420) / 6);
const top     = computed<number>(() => 50 - (Math.sqrt(2500 - Math.abs(50 - left.value) ** 2)));

console.log(hours.value % 12)

onMounted(() => setInterval(() => {
	hours.value   = new Date().getHours();
	minutes.value = new Date().getMinutes();
}, 1_000));

function getTommorrow() {
	loading.value = true;

	setTimeout(() => {
		emit('updateData');
		button.value  = button.value === 'Tommorrow' ? 'Reset' : 'Tommorrow';
		loading.value = false;
	}, 3_000);
}

function fixNum(num: number): string {
	return num < 10 ? `0${num}` : `${num}`;
}

function toMin(h: number, m: number): number {
	return (h % 12) * 60 + m;
}

function isPM(): boolean {
	return (hours.value > 12 && toMin(hours.value, minutes.value) > toMin(times.sunset.hours, times.sunset.minutes)) || 
		   (hours.value < 12 && toMin(hours.value, minutes.value) < toMin(times.sunrise.hours, times.sunrise.minutes));
}
</script>

<template>
	<footer class="p-7">
		<div class="relative w-full aspect-square border-t-2 border-gray-700 rounded-full -mb-24 text-center">
			<img 
				:src="`src/assets/3d-icons/${isPM() ? 'moon' : 'sun'}.png`" 
				:class="`absolute w-8 drop-shadow-[0_0_10px_${isPM() ? '#3c7dc5' : '#faea4a'}]`" 
				:style="`
					top:  calc(${top}%  - 1rem);
					left: calc(${left}% - 1rem);
				`"
			>
			<div class="absolute top-[20%] inset-x-0 text-2xl">{{ clock }}</div>
			<div class="absolute top-[45%] inset-x-4 flex items-center justify-between text-xs">
				<div class=""><span class="text-gray-500">Sunrise:</span> {{ times.sunrise.hours }}:{{ fixNum(times.sunrise.minutes) }} AM</div>
				<div class=""><span class="text-gray-500">Sunset:</span> {{ times.sunset.hours }}:{{ fixNum(times.sunset.minutes) }} PM</div>
			</div>
		</div>
		<ul class="bg-gray-800 border-2 border-gray-700 rounded-3xl p-3 mt-3 text-sm">
			<TimeItem title="Morning" :value="data.temperature?.morning" />
			<TimeItem title="Evening" :value="data.temperature?.evening" />
			<TimeItem title="Night"   :value="data.temperature?.nighttime" />
			<TimeItem title="Maximum" :value="data.temperature?.maximum" />
			<TimeItem title="Minimum" :value="data.temperature?.minimum" />
		</ul>
		<button @click="getTommorrow" class="w-full p-2 bg-blue-500 text-white rounded-3xl mt-4">
			<span v-if="loading" class="block size-6 rounded-full border-2 border-white mx-auto loader"></span>
			<span v-else>{{ button }}</span>
		</button>
	</footer>
</template>

<style scoped>
.loader {
	animation:
		l20-1 0.8s infinite linear alternate,
		l20-2 1.6s infinite linear;
}

@keyframes l20-1{
	0%    { clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% ) }
	12.5% { clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% ) }
	25%   { clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% ) }
	50%   { clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% ) }
	62.5% { clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% ) }
	75%   { clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% ) }
	100%  { clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% ) }
}

@keyframes l20-2{ 
	0%     { transform:scaleY(1)  rotate(0deg)    }
	49.99% { transform:scaleY(1)  rotate(135deg)  }
	50%    { transform:scaleY(-1) rotate(0deg)    }
	100%   { transform:scaleY(-1) rotate(-135deg) }
}
</style>
