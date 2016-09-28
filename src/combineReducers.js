
export function combineReducers (reducers) {
    const reducerKeys = Object.keys(reducers);

    return function combination (state, action) {
        const nextState = {};
        let hasChanged = false;
        for (let key of reducerKeys) {
            const reducer = reducers[key];
            const prevStateFromKey = state[key];
            const nextStateFromKey = reducer(prevStateFromKey, action);

            if (typeof nextStateFromKey === 'undefined') {
                throw new Error(`reducer ${key} returned an undefined state`);
            }

            nextState[key] = nextStateFromKey;
            hasChanged = hasChanged || nextStateFromKey !== prevStateFromKey;
        }
        return hasChanged ? nextState : state;
    };
}
