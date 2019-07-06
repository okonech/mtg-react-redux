import React from 'react';
import { SelectableConsumer, SelectableContext } from './SelectableContext';

export const WithSelectableContext = <P extends {}>(Component: React.ComponentType<P>) =>
    class WithContext extends React.PureComponent<P> {
        public render() {
            return (
                <SelectableConsumer>
                    {(context: SelectableContext) => <Component {...this.props as P} context={context} />}
                </SelectableConsumer>
            );
        }
    };
