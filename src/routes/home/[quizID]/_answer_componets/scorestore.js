import { writable } from 'svelte/store';

export const score = writable(0);

export function incrementscore() {
	score.update((n) => n + 1);
	console.log(score);
}
