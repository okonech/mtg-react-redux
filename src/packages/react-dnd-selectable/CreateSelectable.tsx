import React from 'react';
import uuid from 'uuid';
import { SelectableContext } from './SelectableContext';
import { WithSelectableContext } from './WithSelectableContext';

interface SelectableState {
    selected: boolean;
    selecting: boolean;
}

interface SelectableProps {
    context: SelectableContext;
}

// only wrapped components can be selected
const CreateSelectable = <P extends object>(Component: React.ComponentType<P>) => {
    class Selectable extends React.PureComponent<P & SelectableProps, SelectableState> {

        public selectableRef: React.RefObject<HTMLDivElement>;

        public state = {
            selected: false,
            selecting: false,
            id: uuid()
        };

        constructor(props: P & SelectableProps) {
            super(props);
            this.selectableRef = React.createRef();
        }

        public componentDidMount() {
            const { current } = this.selectableRef;
            // put mounted item into registry
            this.props.context.registry.set(this.state.id, current);
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
            const { id, selected, selecting } = state;

            // remove context prop from passed props
            const { context, ...origProps } = props;
            return (
                <div ref={selectableRef} id={id}>
                    <Component
                        selected={selected}
                        selecting={selecting}
                        {...origProps as P}
                    />
                </div>
            );
        }
    }

    return WithSelectableContext(Selectable);
};

export default CreateSelectable;
