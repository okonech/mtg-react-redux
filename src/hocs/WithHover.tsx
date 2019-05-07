import React from 'react';

const WithHover = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.PureComponent<P> {
        public state = {
            isHovered: false
        };

        public onMouseEnter = () => {
            this.setState({ isHovered: true });
        }

        public onMouseLeave = () => {
            this.setState({ isHovered: false });
        }

        public componentDidUpdate(prevProps, prevState) {
            if (prevState.isHovered) {
                this.setState({ isHovered: false });
            }
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

export default WithHover;
