import React from 'react';

const WithHover = <P extends Omit<{}, 'isHovered'>>(Component: React.ComponentType<P>) =>
    class WithHoverHoc extends React.PureComponent<P & { isHovered?: boolean }> {
        public state = {
            isHovered: false
        };

        public onMouseEnter = () => {
            this.setState({ isHovered: true });
        }

        public onMouseLeave = () => {
            this.setState({ isHovered: false });
        }

        public componentDidMount() {
            if (this.state.isHovered) {
                this.setState({ isHovered: false });
            }
        }

        public componentDidUpdate(prevProps, prevState) {
            if (prevState.isHovered) {
                this.setState({ isHovered: false });
            }
        }

        public render() {
            const { ...props } = this.props;
            return (
                <div
                    style={{ display: 'initial' }}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <Component
                        isHovered={this.state.isHovered}
                        {...props as P}
                    />
                </div>

            );
        }
    };

export default WithHover;
