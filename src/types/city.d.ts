declare interface City {
	[key: number]: CityItem;
}

declare interface CityItem {
	id: number;
	name: string;
	city: Array<Area>;
}

declare interface Area {
	id: number;
	name: string;
	district: District;
}

declare interface District {
	[key: number]: {id: number; name: string};
}