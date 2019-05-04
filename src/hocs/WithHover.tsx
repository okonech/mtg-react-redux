import React from 'react';

const withHover = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P> {
        public state = {
            isHovered: false
        };

        public onMouseEnter = () => {
            this.setState({ isHovered: true });
        }

        public onMouseLeave = () => {
            this.setState({ isHovered: false });
        }

        public render() {
            const { ...props } = this.props;
            return (
                <Component
                    isHovered={this.state.isHovered}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    {...props as P}
                />
            );
        }
    };

export default withHover;
