import React from 'react';

export interface SelectableContext {
    registry: Map<string, HTMLDivElement>;
    selecting: string[];
    selected: string[];
}

const { Provider, Consumer } = React.createContext<SelectableContext>({
    registry: new Map<string, HTMLDivElement>(),
    selecting: [],
    selected: []
});

export const SelectableProvider = Provider;

export const SelectableConsumer = Consumer;
