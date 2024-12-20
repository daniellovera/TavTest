<script lang="ts">
	export let onClick: () => void
	export let disabled = false
	export let className = ''
</script>

<button
	on:click={onClick}
	{disabled}
	class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 {className}"
>
	<slot />
</button>
