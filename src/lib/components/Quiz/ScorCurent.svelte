<script>
  // @ts-nocheck
  import { score } from './scorestore'

  let procentage = 0
  let totalproblems = 10
  $: procentage = Math.round(($score / totalproblems) * 100)
</script>

<div class="p-4 bg-gray-800/10 rounded-xl mb-2 flex flex-col items-center">
  <p class="text-lg font-semibold text-primary/80">
    Scor: {$score}
    Procentaj: {procentage}%, in alte cuvinte ai raspuns corect la {$score} intrebari
    din {totalproblems}
  </p>
</div>
