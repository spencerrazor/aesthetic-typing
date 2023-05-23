<script>
    import { characters, correct } from "./stores";

    let charVals;
    let total;

    correct.subscribe(value => {
        total = value;
    })

    characters.subscribe(value => {
        charVals = value;
    });
</script>

<div>
    <p>
        WPM: {total / 5}
    </p>
</div>


<style>
    p {
        font-size: 1.5rem;
        font-family:'Bowlby One SC', Georgia, Times, 'Times New Roman', serif;
    }
</style>