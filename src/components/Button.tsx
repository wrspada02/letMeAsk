
    import { useState } from "react";

    export function Button(){

        const [counter, setCounter] = useState(0); 
        //A variavel que eu vou acessar na primeira posicao, e 2 posicao a funcao que vai atualizar essa variavel

        function increment(){
            setCounter(counter + 1);
            console.log(counter);
        }

        return (
            <button onClick={increment}>
                {counter}
            </button>
        );
    }
