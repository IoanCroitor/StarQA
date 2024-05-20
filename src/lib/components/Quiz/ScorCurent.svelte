<script>
  // @ts-nocheck
  import { score } from './scorestore'
  export let nrq=1;
  let procentage = 0
  $: procentage = Math.round(($score / nrq) * 100)
</script>

<div class="p-4 bg-gray-800/10 rounded-xl mb-2 flex flex-col items-center">
  <p class="text-lg font-semibold text-primary/80">
    Scor: {$score}
    Procentaj: {procentage}%, in alte cuvinte ai raspuns corect la {$score} intrebari
    din {nrq}
  </p>
</div>
