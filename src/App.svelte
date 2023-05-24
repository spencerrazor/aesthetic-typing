<script>
  import Stats from "./lib/Stats.svelte";
  import TypeArea from "./lib/TypeArea.svelte";
</script>

<main>
  <TypeArea/>
  <Stats/>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 30vh;
    justify-content: left;
    width: 100%;
  }
</style>
