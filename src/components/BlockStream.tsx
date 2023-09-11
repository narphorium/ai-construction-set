import React, { useContext } from 'react';
import styled from 'styled-components';
import { Base } from '../data';
import { BlockFactoryContext } from '../hooks';


interface BlockStreamProps {
    blocks: Base[]
}

export const BlockStreamComponent = ({blocks}: BlockStreamProps) => {

    const {factory, setFactory} = useContext(BlockFactoryContext);

    return <div className="aics-block-stream">
        { blocks.map((block, index) => {
            return factory?.build(block);
        }) }
    </div>;
};

export const BlockStreamStyled = styled(BlockStreamComponent)`
`;