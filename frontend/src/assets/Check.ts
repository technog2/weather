import type { Data } from '../models/Data';

function check(data: Data) {
	if (data.precipitation.total > 0.1)  return obj('Rainy', 'cloud-rain-snow-light');
	if (data.cloud_cover.afternoon > 90) return obj('Cloudy', 'cloud');
	if (data.cloud_cover.afternoon > 70) return obj('Cloudy', 'sun-cloud');
	return obj('Sunny', 'sun');
}

function obj(
	text: string, 
	icon: string
) {
	return {
		text,
		icon
	}
}

export default check;

const x = {
	cloud_cover: {
		afternoon: 4.8,
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