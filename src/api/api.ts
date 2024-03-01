import { PokeApiModel } from "../models/PokeApiModel";

export async function fetchPokeApi(): Promise<PokeApiModel> {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=-1");
	const data = await res.json();
	return data;
}
