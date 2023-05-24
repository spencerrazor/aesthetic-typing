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
                    n[current] = {[Object.keys(charsVal[current])[0]]:''};
                    return n;
                }
                if (Object.values(n[current-1])[0] == '#2F2D2E') {
                    correct.update(n => n - 1)
                }
                n[current-1] = {[Object.keys(charsVal[current-1])[0]]:''};
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
                    n[current] = {[Object.keys(charsVal[current])[0]]:'#2F2D2E'};
                    correct.update(n => n + 1);
                } else {
                    n[current] = {[Object.keys(charsVal[current])[0]]: '#D72483'};
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
            colorsText.push({[textSplit[i]]:''});
        }

        characters.set(colorsText)

        document.querySelector('body').addEventListener('keydown', handleKey);
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
            colorsText.push({[textSplit[i]]:''});
        }

        characters.set(colorsText)
        correct.set(0)

        document.querySelector('body').addEventListener('keydown', handleKey);
    }


</script>

<div id='container'>
    {#if done}
        <div id="end">
            <p>WoW</p>
            <button on:click={restart}>Again</button>
        </div>
    {:else}
        <div>
            {#each charsVal as c}
            <Character char={Object.keys(c)[0]} color={Object.values(c)[0]} ev={handleKey}/>
            {/each}
        </div>
    {/if}
</div>


<svelte:body
  on:keydown={handleKey}
/>

<style>
    #container {
        width: 75%;
        margin: auto;
        background-color: gray;
        padding: 50px;
        border-radius: 20px;
        text-align: left;
        display: flex;
        flex-direction: columns;;
        justify-content: center;
    }

    p {
        text-align: center;
    }

    #end {
        display: flex;
        flex-direction: column;
    }

    button:hover {
        background-color: #2F2D2E;
    }
</style>