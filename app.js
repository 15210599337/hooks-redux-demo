import React from 'react'
import HooksRedux from './hooks-redux'

const { Provider, store } = HooksRedux({
    initialState: {
        name: '小王',
        age: 18
    }
})

function actionOfIncrease() {
    return {
        type: 'init', // increase
        reducer: (state) => {
            return {...state, age: state.age + 1}
        }
    }
}

function actionOfDecrement() {
    return {
        type: 'decrement',
        reducer: (state) => {
            return {...state, age: state.age - 1}
        }
    }
}

function Button() {
    function handleIncrease() {
        store.dispatch(actionOfIncrease())
    }

    function handleDecrement() {
        store.dispatch(actionOfDecrement())
    }

    return (
        <>
            <button onClick={handleIncrease}>点击增加</button>
            <button onClick={handleDecrement}>点击减少</button>
        </>
    )
}

function Page() {
    const state = store.useContext()

    return(
        <>
            <div>{state.name}</div>
            <div>{state.age}</div>
            <Button></Button>
        </>
    )
}

export default function App() {
    return (
        <Provider>
            <Page />
        </Provider>
    )
}