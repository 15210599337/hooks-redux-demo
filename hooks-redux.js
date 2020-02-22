import React, { useContext, createContext, useReducer } from 'react'


function reducerInAction(state, action) {
    if (typeof action.reducer == 'function') {
        return action.reducer(state)
    }
    return state
}

// reducer in action (state, action) = > (params)
export default function createStore(params) {
    const { reducer, initialState } = {
        reducer: reducerInAction,
        initialState: {},
        ...params
    }

    const Appcontext = createContext()

    const middlewareReducer = (lastState, action) => {
        // switch(action.type) {
        //     case 'init':
        //         return {...state}
        //     case 'increase':
        //         return {...state}
        //     case 'decrement':
        //             return {...state}
        //     default:
        //         return {...state}
        // }

        const nextState = reducer(lastState, action);
        return nextState
    }

    const store = {
        _state: initialState,
        dispatch: undefined,
        getState: () => {
            return store._state
        },
        useContext: () => {
            return useContext(Appcontext)
        }
    }

    // 灌值
    const Provider = props => {
        const [state, dispatch] = useReducer(middlewareReducer, initialState)
        
        if (!store.dispatch) {
            store.dispatch = action => { // 异步处理可用async
                dispatch(action)
            }
        }

        return <Appcontext.Provider {...props} value={state} />
    }

    return {
        Provider,
        store
    }
}