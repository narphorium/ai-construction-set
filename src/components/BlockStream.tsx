import React, { useContext } from 'react';
import styled from 'styled-components';
import { Base } from '../data';
import { BlockFactoryContext } from '../hooks';


interface BlockStreamProps {
    blocks: Base[]
}

const BlockStreamStyled = styled.div`
`;

export const BlockStream = ({blocks}: BlockStreamProps) => {

    const {factory, setFactory} = useContext(BlockFactoryContext);

    return <BlockStreamStyled className="aics-block-stream">
        { blocks.map((block, index) => {
            return factory?.build(block);
        }) }
    </BlockStreamStyled>;
};