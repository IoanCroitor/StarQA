<script>
	// @ts-nocheck

	let options = ['Adevarat', 'Fals'];
	export let answer = 3;
	export let intrebare = 'Primul animal pe orbita, cainele Laika a fost o misune legata de:';
	export let detalii =
		'Pe 3 Noiembrie 1957 in cadrul misiunii Sputnik 2 catelul Laika din Uniunea Sovietica a devenit primul animal lansat in spatiu si prima fiinta decedata inafara pamantului. Sputnik 2 nu a fost proiectata pentru intoarcere asfel destinul Laikai a fost decesul. Misiunea a pregatit terenul pentru urmatoarele msisuni spatiale cu subiecti umani. ';

	export let source = '/assets/laika.jpg';
	import { incrementscore } from './scorestore';

	let raspunsCorect = false;
	let rezolvat = false;
	function handleClick(number) {
		if (number === answer) {
			rezolvat = true;
			raspunsCorect = true;
			incrementscore();
		} else {
			raspunsCorect = false;
			rezolvat = true;
		}
	}
</script>

<div class="bg-black/50 pb-2 rounded-xl p-4">
	{#if rezolvat === false}
		<h2 class="text-xl ml-4 font-semibold text-slate-200">Adevarat sau fals?</h2>
		<p class="ml-4 text-slate-100">{intrebare}</p>

		<div class="grid grid-flow-row grid-rows-2 grid-cols-2 gap-2 m-4">
			<button
				on:click={() => handleClick(1)}
				class=" text-l font-semibold flex justify-center place-items-center h-16 bg-green-400 hover:bg-green-500 hover:rounded-2xl hover:text-white transition-all rounded-md"
			>
				{options[0]}
			</button>
			<button
				on:click={() => handleClick(2)}
				class=" text-l font-semibold flex justify-center place-items-center h-16 bg-red-400 hover:bg-red-500 hover:rounded-2xl hover:text-white transition-all rounded-md"
			>
				{options[1]}
			</button>
		</div>
	{:else}
		{#if raspunsCorect === true}
			<p class="text-xl ml-4 font-semibold text-green-500 pb-1">Bravo, ai rapuns corect!</p>
		{:else}
			<p class="text-xl ml-4 font-semibold text-red-500 pb-1">Ai raspuns gresit</p>
		{/if}

		<p class="text-xl ml-4 text-slate-200">{detalii}</p>
		<div class="flex justify-center">
			<img src={source} preload alt="Laika" class="object-cover rounded-xl my-4" />
		</div>
	{/if}
</div>
