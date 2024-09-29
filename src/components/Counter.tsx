import { useState } from "react";
import cl from './Counter.module.scss';

const Counter = () => {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1) 
    }
    return ( 
        <div>
            <h1>{count}</h1>
            <button className={cl.h1} onClick={increment}>increment</button>
        </div>
     );
}
 
export default Counter;