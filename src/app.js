function createStore (reducer, initialState) {
    let state = initialState;
    const listeners = [];

    function getState () {
        return state;
    }

    function on (sub) {
        listeners.push(sub);
        return function unsub (l) {
            listeners.filter((l) => l !== sub);
        };
    }

    function dispatch (action) {
        state = reducer(state, action);
        listeners.forEach((l) => l());
    }

    return { getState, dispatch, on };
}

function execComponent (component, context, children) {
    const vNode = component(context, children);
    if (context.state.hasOwnProperty('key')) {
        vNode.key = context.state.key;
    }
    return vNode;
}

export function createApp (component, reducer, initialState, render) {
    const store = createStore(reducer, initialState);
    const { getState, dispatch, on } = store;

    function ch (selector, prop, children) {
        if (typeof selector === 'function') {
            return execComponent(selector, {
                state: props,
                dispatch,
                ch
            }, children);
        }
        return h(selector, prop, children);
    }

    on(() => {
        const state = getState();
        render({
            state,
            dispatch,
            ch
        });
    });

    return { store, ch };
}