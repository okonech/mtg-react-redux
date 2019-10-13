import React, { useEffect, useState } from 'react';

const WithHover = <P extends Omit<{}, 'isHovered'>>(Component: React.ComponentType<P>) => {
    const WithHoverHoc: React.SFC<P> = (props) => {
        const [isHovered, setIsHovered] = useState(false);
        const onMouseEnter = () => setIsHovered(true);
        const onMouseLeave = () => setIsHovered(false);
        useEffect(() => {
            setIsHovered(false);
        }, [props]);
        return (
            <div
                style={{ display: 'initial' }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Component
                    isHovered={isHovered}
                    {...props as P}
                />
            </div>

        );
    };
    return WithHoverHoc;
};

export default WithHover;
