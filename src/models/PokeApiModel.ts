export interface PokeApiModel {
	count: number;
	next: string | null;
	previous: string | null;
	results: ({ name: string; url: string; } & { index: number; })[];
}
