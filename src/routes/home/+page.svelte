<script lang="ts">


    import Icon from '@iconify/svelte'
import FeaturedContent from './_components/FeaturedContent.svelte'
import JoinQuiz from './_components/JoinQuiz.svelte'
import UserStats from './_components/UserStats.svelte'


</script>
<div class="mt-3">
  
</div>

<div
  class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1  grid-rows-2 grid-flow-col gap-2 my-3"
>
<UserStats />
<JoinQuiz />
    

</div>
<div class="flex flex-col border border-none bg-muted-foreground/10 rounded-lg p-4">
  <div class="flex flex-row items-center bg-purple-700 w-fit rounded-lg mb-3 px-2 py-1">
    <Icon icon="mdi:star" width="1rem" height="1rem" />
    <h2 class=" font-semibold text-sm ">Featured Content</h2>
  </div>

  <div class="flex flex-row overflow-hidden rounded-lg">
    
    <div class=" w-72">
      
      <FeaturedContent/>
    </div>
  </div>
</div>
