<script>
    import Character from "./Character.svelte";
    import { characters, correct } from "./stores";
    import { currentChar } from "./stores";

    let charsVal;
    let current;
    let hasStarted = false;
    let firstKey = false;
    let count = 0;
    let done = false;
    let inter;

    $: {
        console.log(count)
        if (current == charsVal.length) {
            reload();
        }

        if (count == 60) {
            done = true;
            clearInterval(inter);
        }

        if (done) {
            
        }
    }

    let disallow = ['Shift', 'Tab', 'Alt', 'Caps Lock'];


    // access current character states
    characters.subscribe(value => {
        charsVal = value;
    })


    // accesses value of current index
    currentChar.subscribe(value => {
        current = value;
    })


    // sets a min limit on current
    $: if (current < 0) {
        current = 0;
    }

    function handleFirst() {
        const interval = setInterval(() => count += 1, 1000);
        return interval;
    }


    // handles key up event
    function handleKey(e) {

        if (e.key == 'Backspace') {
            characters.update(n=> {
                if (current - 1 < 0) {
                    n[current] = {[Object.keys(charsVal[current])[0]]:'black'};
                    return n;
                }
                if (Object.values(n[current-1])[0] == 'green') {
                    correct.update(n => n - 1)
                }
                n[current-1] = {[Object.keys(charsVal[current-1])[0]]:'black'};
                currentChar.update(n => n - 1);
                return n;
            })
        } else if (disallow.includes(e.key)) {
            // nothing to do here
        } else {
            if (firstKey) {
                // nothing to do here
            } else {
                inter = handleFirst();
                firstKey = true;
            }  

            characters.update((n) => {
                let copied = [...n];
                if (Object.keys(charsVal[current])[0] == e.key) {
                    n[current] = {[Object.keys(charsVal[current])[0]]:'green'};
                    correct.update(n => n + 1);
                } else {
                    n[current] = {[Object.keys(charsVal[current])[0]]: 'red'};
                }
                return n;
            })
            currentChar.update(n => n + 1);
        }
    }

    // reloads new text
    function reload() {
        currentChar.set(0);
        let text = 'as she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts.';
        let textSplit = text.split('');
        let colorsText = [];

        for(let i=0; i < textSplit.length; i++) {
            colorsText.push({[textSplit[i]]:'black'});
        }

        characters.set(colorsText)

        document.querySelector('body').addEventListener('keyup', handleKey);
    }
    // restarts the typing test
    function restart() {
        done = false;
        currentChar.set(0);
        count = 0;
        firstKey = false;
        let text = 'as she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts.';
        let textSplit = text.split('');
        let colorsText = [];

        for(let i=0; i < textSplit.length; i++) {
            colorsText.push({[textSplit[i]]:'black'});
        }

        characters.set(colorsText)
        correct.set(0)

        document.querySelector('body').addEventListener('keyup', handleKey);
    }


</script>

<div>
    {#if done}
        <p>Done Typing</p>
        <button on:click={restart}>New Typing Test</button>
    {:else}
        {#each charsVal as c}
        <Character char={Object.keys(c)[0]} color={Object.values(c)[0]} ev={handleKey}/>
        {/each}
    {/if}
</div>


<svelte:body
  on:keyup={handleKey}
/>

<style>
    div {
        width: 75%;
        margin: auto;
        background-color: gray;
        padding: 50px;
        border-radius: 20px;
        text-align: left;
    }

    p {
        text-align: center;
    }

    button {

    }
</style>