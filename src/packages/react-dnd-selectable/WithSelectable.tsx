import React from 'react';
import { SelectableContext } from './SelectableContext';
import { WithSelectableContext } from './WithSelectableContext';

interface SelectableState {
    selected: boolean;
    selecting: boolean;
    id: string;
}

interface SelectableProps {
    context?: SelectableContext;
}

// only wrapped components can be selected
const WithSelectable = <P extends { id: string }>(Component: React.ComponentType<P>) => {
    class Selectable extends React.PureComponent<P & SelectableProps, SelectableState> {

        public selectableRef = (ref: HTMLDivElement) => (this.childNode = ref);
        public childNode: HTMLDivElement;

        public state: SelectableState = {
            selected: false,
            selecting: false,
            id: this.props.id
        };

        public componentDidMount() {
            const { context } = this.props;
            // put mounted item into registry
            context.registry.set(this.state.id, this.childNode);
        }

        public componentWillUnmount() {
            // remove item from registry
            this.props.context.registry.delete(this.state.id);
        }

        public componentDidUpdate() {
            const { selected, selecting } = this.props.context;
            const { id, selected: wasSelected, selecting: wasSelecting } = this.state;

            // update states
            const isSelected = selected.includes(id);
            if (isSelected !== wasSelected) {
                this.setState({ selected: isSelected });
            }
            const isSelecting = selecting.includes(id);
            if (isSelecting !== wasSelecting) {
                this.setState({ selecting: isSelecting });
            }
        }

        public render() {
            const { props, state, selectableRef } = this;
            const { selected, selecting } = state;

            // remove context prop from passed props
            const { context, ...origProps } = props;
            return (
                <Component
                    selectableRef={selectableRef}
                    selected={selected}
                    selecting={selecting}
                    {...origProps as P}
                />
            );
        }
    }

    return WithSelectableContext(Selectable);
};

export default WithSelectable;
