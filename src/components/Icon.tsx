import React from 'react';

interface IconProps {
  svg: string;
}

export const Icon = ({svg}: IconProps) => {
    return <span dangerouslySetInnerHTML={{ __html: svg }}></span>;
};