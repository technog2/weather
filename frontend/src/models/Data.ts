export interface Data {
	lat:      number
	lon:      number
	timezone: string
	date:     string
	units:    string
	cloud_cover: {
		afternoon: number
		unit:      string
	},
	humidity: {
		afternoon: number
		unit:      string
	},
	precipitation: {
		total: number
		unit:  string
	},
	temperature: {
		minimum:   number
		maximum:   number
		daytime:   number
		nighttime: number
		evening:   number
		morning:   number
		unit:      string
	},
	pressure: {
		afternoon: number
		unit:      string
	},
	wind: {
		max_speed: number
		degree:    number
		direction: string
		unit:      string
	}
}