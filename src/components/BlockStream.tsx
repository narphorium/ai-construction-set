import React, { ForwardedRef, forwardRef, useContext } from 'react';
import styled from 'styled-components';
import { Stream } from '../data';
import { BlockFactoryContext } from '../hooks';


interface BlockStreamProps {
    className?: string | string[];
    stream: Stream;
}

export const BlockStreamComponent = forwardRef(({className, stream}: BlockStreamProps, ref: ForwardedRef<HTMLDivElement>) => {

    const {factory, setFactory} = useContext(BlockFactoryContext);

    return <div ref={ref} className="aics-block-stream">
        { stream.blocks.map((block, index) => {
            return factory?.build(block);
        }) }
    </div>;
});

export const BlockStream = styled(BlockStreamComponent)`
`;