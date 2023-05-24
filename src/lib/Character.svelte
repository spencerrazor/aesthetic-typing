<script>
    import { characters } from "./stores";
    import { currentChar } from "./stores";
    import { onMount, onDestroy } from "svelte";
    export let char;
    export let color;
    export let ev;

    let body = document.querySelector('body');

    onDestroy(() => {
        body.removeEventListener('keydown', ev)
    });



</script>

<p style="background-color: {color}">{char}</p>


<style>
    p {
        display: inline;
        padding-left: 5px;
        padding-right: 5px;
        font-family: 'Nunito', Georgia, Times, 'Times New Roman', serif;

    }
</style>