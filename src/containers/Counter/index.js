import React, { useState, useReducer } from 'react';
import useAxios from '../../components/Axios';

const reducer = function (state, action) {
    switch (action.type) {
        case 'increment':
            return {count2: state.count2 + 1};
        case 'decrement':
            return {count2: state.count2 - 1};
        default: 
            return {count2: state.count2};
    }
}

function Counter () {
    const [ count, setCount ] = useState(0);
    const [ state, dispatch ] = useReducer(reducer, { count2: 0 });
    const { count2 } = state;
    const [ isLoading, response, error ] = useAxios('labels',[]);
    console.log('111', isLoading, response, error);
    return (
        <div>
            <div>
                <p>直接使用useState控制状态</p>
                <button onClick={() => setCount(count + 1)}>+</button>
                <span>{ count }</span>
                <button onClick={() => setCount(count - 1)}>-</button>
            </div>
            <div>
                <p>通过useReducer管理状态</p>
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <span>{ count2 }</span>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </div>
        </div>
    )
}

export default Counter;