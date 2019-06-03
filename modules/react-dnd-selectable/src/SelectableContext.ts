import React from 'react';

export interface SelectableContext {
    registry: Map<string, HTMLDivElement>;
    selecting: string[];
    selected: string[];
    selectableRef: HTMLDivElement;
}

export const defaultContext = () => ({
    registry: new Map<string, HTMLDivElement>(),
    selecting: [],
    selected: [],
    selectableRef: document.createElement('div')
});

const { Provider, Consumer } = React.createContext<SelectableContext>(defaultContext());

export const SelectableProvider = Provider;

export const SelectableConsumer = Consumer;
