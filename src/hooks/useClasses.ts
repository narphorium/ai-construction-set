import { useState, useEffect, DependencyList } from 'react';

type Classable = undefined | string | string[] | Set<string> | (() => string[]);

const computeClasses = (...args: Classable[]): string => {
  let classes: string[] = [];
  args.forEach((arg: Classable) => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes = classes.concat(arg);
    } else if (arg instanceof Set) {
      classes = classes.concat(Array.from(arg));
    } else if (typeof arg === 'function') {
      classes = classes.concat(arg());
    }
  });
  return classes.join(' ');
};

export const useClasses = (args: Classable[], deps: DependencyList = []): string => {
  const [classes, setClasses] = useState<string>('');

  useEffect(() => {
    setClasses(computeClasses(...args));
  }, deps);

  return classes;
};