import React from 'react';
import { SelectableContext, SelectableProvider } from './SelectableContext';

export const WithSelectableContextProvider = (value: SelectableContext) => <P extends {}>(
    Component: React.ComponentType<P>) =>
    class WithContextProvider extends React.PureComponent<P> {
        public render() {
            return (
                <SelectableProvider value={value}>
                    {(context: SelectableContext) => <Component {...this.props as P} context={context} />}
                </SelectableProvider>
            );
        }
    };
