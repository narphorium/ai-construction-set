
import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NamedContent } from '../data';
import { BlockFactoryContext } from '../hooks';
import { CollapsibleBlock, } from './CollapsibleBlock';
import { selectedVariants } from './theme';

interface NamedBlockProps {
    className?: string | string[];
    content: NamedContent;
    collapsed: boolean | Dispatch<SetStateAction<boolean>>;
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onToggle?: (collapsed: boolean) => void;
    onSelected?: (selected: boolean) => void;
    onTransitionEnd?: () => void;
    key: any;
}

const NamedBlockComponent = forwardRef(({className, content, collapsed, selected, onToggle, onSelected, onTransitionEnd, key}: NamedBlockProps, ref: ForwardedRef<HTMLDivElement>) => {

    const {factory, setFactory} = useContext(BlockFactoryContext);

    useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected as boolean);
        }
    }, [selected]);

    const getClasses = () => {
        let classes = ['aics-named-block'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            } else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        if (selected) {
            classes.push('selected');
        }
        if (collapsed) {
            classes.push('collapsed');
        }
        return classes.join(' ');
    };

    const handleClick = () => {
        if (onToggle) {
            onToggle(!collapsed);
        }
    };

    return <div ref={ref} className={getClasses()} onClick={handleClick} >
        <CollapsibleBlock title={content.name} collapsed={collapsed} onToggle={onToggle} onTransitionEnd={onTransitionEnd}>
        { content.children.map((child, index) => {
            return factory?.build(child, content);
         })}
        </CollapsibleBlock>
    </div>;
});

const textColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#292b2f' },
    selected: { light: '#222', dark: '#ffde98' },
});

const backgroundColor = selectedVariants('mode', {
    default: { light: 'white', dark: '#292b2f' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

const borderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});

// FIXME:  Highlight border color of selected list item.
const itemBorderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: '#ccc', dark: '#595b60' },
});

export const NamedBlock = styled(NamedBlockComponent)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${textColor};
    background-color: ${backgroundColor};
    border-color: ${borderColor};

    & .aics-content-section,
    & .aics-block-list,
    & .aics-name-block {
        margin: 8px 0;
    }

    & .aics-content-section:first-child,
    & .aics-block-list:first-child,
    & .aics-name-block:first-child {
        margin-top: 0;
    }

    & .aics-content-section:last-child,
    & .aics-block-list:first-child,
    & .aics-name-block:first-child {
        margin-bottom: 0;
    }
`;

export const BlockListItem = styled(NamedBlock)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${itemBorderColor};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`;