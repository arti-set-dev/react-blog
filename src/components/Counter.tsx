import { useState } from "react";
import cl from './Counter.module.scss';

const Counter = () => {
    const [count, setCount] = useState(1);
    const increment = () => {
        setCount(count + 1);
    }
    return ( 
        <>
        <h1>{count}</h1>
        <button className={cl.button} onClick={increment}>increment</button>
        </>
     );
}
 
export default Counter;