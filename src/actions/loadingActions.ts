
export interface LoadingAction {
    type: 'LOADING' | 'LOADED';
}

export function loading(): LoadingAction {
    return {
        type: 'LOADING'
    };
}

export function loaded(): LoadingAction {
    return {
        type: 'LOADED'
    };
}
