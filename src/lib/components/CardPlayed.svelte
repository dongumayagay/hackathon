<script>
    import { recentCardsStore } from '$lib/gamestate';
</script>

<div class="absolute inset-0 flex flex-col justify-center items-center z-0">
    <img alt="" src={$recentCardsStore[0]?.image ?? ''} class="rounded-lg h-56" />
    <!-- {$recentCardsStore[0]?.name ?? ''} -->
</div>