'use strict';

var React = require('react');
var styled = require('styled-components');
var theme = require('styled-theming');
var reactDom = require('react-dom');

class Base {
    uuid = crypto.randomUUID();
    classNames = new Set();
    getClassNames(selected_index) {
        return Array.from(this.classNames);
    }
}

class Selectable extends Base {
    selected = false;
    selection_index = null;
    getClassNames(selected_index) {
        const classNames = new Set(super.getClassNames(selected_index));
        if (this.selection_index !== null) {
            classNames.add('selectable');
        }
        if (selected_index === this.selection_index) {
            classNames.add('selected');
        }
        return Array.from(classNames);
    }
}

class Section extends Selectable {
    name = null;
    spans = [];
}

class Code extends Section {
    language = null;
}

class Content extends Selectable {
    children = [];
}

class List extends Base {
    items = [];
}

class NamedContent extends Content {
    name;
    collapsed = true;
    constructor(name) {
        super();
        this.name = name;
    }
}

class Span extends Selectable {
    content;
    constructor(content) {
        super();
        this.content = content;
    }
}

const BlockFactoryContext = React.createContext({
    factory: undefined,
    setFactory: (factory) => { }
});

const selectedVariants = (mode, values) => {
    return (props) => {
        const variant = props['selected'] ? 'selected' : 'default';
        return theme(mode, values[variant])(props);
    };
};
const backgroundColor$3 = theme('mode', {
    light: '#fff',
    dark: '#000',
});
const selectedBackgroundColor = theme('mode', {
    light: 'rgb(253 235 184)',
    dark: 'rgb(73 69 61)',
});
const borderColor$2 = theme('mode', {
    light: '#fff',
    dark: '#000',
});
const selectedBorderColor = theme('mode', {
    light: 'rgb(237, 211, 137)',
    dark: 'rgb(109 102 81)',
});
const textColor$3 = theme('mode', {
    light: '#fff',
    dark: '#eee',
});
const selectedTextColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const defaultFont = theme('mode', {
    light: 'Arial',
    dark: 'Arial',
});
const fontWeight = theme('mode', {
    light: 500,
    dark: 400,
});

const BlockListComponent = React.forwardRef(({ className, list, selected, onSelected, key }, ref) => {
    const { factory, setFactory } = React.useContext(BlockFactoryContext);
    React.useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected);
        }
    }, [selected]);
    const getClasses = () => {
        let classes = ['aics-block-list'];
        if (className != undefined) {
            if (typeof className === 'string') {
                classes.push(className);
            }
            else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        if (selected) {
            classes.push('selected');
        }
        return classes.join(' ');
    };
    return React.createElement("div", { ref: ref, className: getClasses() }, list.items.map((item, index) => {
        return factory?.build(item, list);
    }));
});
const BlockList = styled(BlockListComponent) `
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${borderColor$2};
`;

const ContentBlockComponent = React.forwardRef(({ className, content, selected, onSelected, onClick, key }, ref) => {
    const { factory, setFactory } = React.useContext(BlockFactoryContext);
    React.useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected);
        }
    }, [selected]);
    const getClasses = () => {
        let classes = ['aics-content-block'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            }
            else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        if (selected) {
            classes.push('selected');
        }
        return classes.join(' ');
    };
    const handleClick = (e) => {
        if (onClick !== undefined) {
            onClick(e);
        }
    };
    return React.createElement("div", { ref: ref, className: getClasses(), onClick: handleClick }, content.children.map((child) => {
        return factory?.build(child, content);
    }));
});
const textColor$2 = selectedVariants('mode', {
    default: { light: '#222', dark: '#292b2f' },
    selected: { light: '#222', dark: '#ffde98' },
});
const backgroundColor$2 = selectedVariants('mode', {
    default: { light: 'white', dark: '#292b2f' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});
const borderColor$1 = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});
const ContentBlock = styled(ContentBlockComponent) `
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${textColor$2};
  background-color: ${backgroundColor$2};
  border-color: ${borderColor$1};
`;

const ContentSectionComponent = React.forwardRef(({ className, section, selected, onSelected, onClick, key }, ref) => {
    const { factory, setFactory } = React.useContext(BlockFactoryContext);
    React.useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected);
        }
    }, [selected]);
    const getClasses = () => {
        let classes = ['aics-content-section'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            }
            else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        if (selected) {
            classes.push('selected');
        }
        return classes.join(' ');
    };
    const handleClick = React.useCallback((e) => {
        if (onClick !== undefined) {
            onClick(e);
        }
    }, [onClick]);
    return React.createElement("div", { ref: ref, className: getClasses(), onClick: handleClick },
        React.createElement("span", null,
            React.createElement("label", null, section.name ? section.name + ': ' : ''),
            section.spans.map((span) => {
                return factory?.build(span, section);
            })));
});
const textColor$1 = selectedVariants('mode', {
    default: { light: '#222', dark: '#eee' },
    selected: { light: '#222', dark: '#ffde98' },
});
const backgroundColor$1 = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});
const selectedLabelColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const ContentSection = styled(ContentSectionComponent) `
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${fontWeight} + 200);
  }

  &.selected > span {
    color: ${textColor$1};
    background-color: ${backgroundColor$1};
  }

  & > span > label {
    color: ${textColor$1} !important;
  }

  .selected & > span > label {
    color: ${selectedLabelColor} !important;
  }
`;

const ContentSpanComponent = React.forwardRef(({ className, span, selected, onSelected, onClick, key }, ref) => {
    React.useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected);
        }
    }, [selected]);
    const getClasses = () => {
        let classes = ['aics-content-span'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            }
            else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        if (selected) {
            classes.push('selected');
        }
        return classes.join(' ');
    };
    const handleClick = (obj) => ((e) => {
        if (onClick !== undefined) {
            onClick(e);
        }
    });
    return React.createElement("span", { ref: ref, className: getClasses(), onClick: handleClick(), dangerouslySetInnerHTML: {
            __html: span.content
        } });
});
const spanTextColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#eee' },
    selected: { light: '#222', dark: '#ffde98' },
});
const spanBackgroundColor = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});
const selectedChildSpanColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const ContentSpan = styled(ContentSpanComponent) `
  color: ${spanTextColor};
  background-color: ${spanBackgroundColor};

  .selected & {
    color: ${selectedChildSpanColor} !important;
  }

  a {
    color: ${spanTextColor};
  }
`;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$3(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$3;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

var root$1 = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

var now_1 = now$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var root = _root;

/** Built-in value references. */
var Symbol$2 = root.Symbol;

var _Symbol = Symbol$2;

var Symbol$1 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var baseTrim = _baseTrim,
    isObject$2 = isObject_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject$1 = isObject_1,
    now = now_1,
    toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce$1;

var debounce$2 = /*@__PURE__*/getDefaultExportFromCjs(debounce_1);

var debounce = debounce_1,
    isObject = isObject_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

var throttle$1 = /*@__PURE__*/getDefaultExportFromCjs(throttle_1);

/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}var patchResizeCallback = function (resizeCallback, refreshMode, refreshRate, refreshOptions) {
    switch (refreshMode) {
        case 'debounce':
            return debounce$2(resizeCallback, refreshRate, refreshOptions);
        case 'throttle':
            return throttle$1(resizeCallback, refreshRate, refreshOptions);
        default:
            return resizeCallback;
    }
};
var isFunction = function (fn) { return typeof fn === 'function'; };
var isSSR = function () { return typeof window === 'undefined'; };
var isDOMElement = function (element) {
    return element instanceof Element || element instanceof HTMLDocument;
};/** @class */ ((function (_super) {
    __extends(ResizeDetector, _super);
    function ResizeDetector(props) {
        var _this = _super.call(this, props) || this;
        _this.cancelHandler = function () {
            if (_this.resizeHandler && _this.resizeHandler.cancel) {
                // cancel debounced handler
                _this.resizeHandler.cancel();
                _this.resizeHandler = null;
            }
        };
        _this.attachObserver = function () {
            var _a = _this.props, targetRef = _a.targetRef, observerOptions = _a.observerOptions;
            if (isSSR()) {
                return;
            }
            if (targetRef && targetRef.current) {
                _this.targetRef.current = targetRef.current;
            }
            var element = _this.getElement();
            if (!element) {
                // can't find element to observe
                return;
            }
            if (_this.observableElement && _this.observableElement === element) {
                // element is already observed
                return;
            }
            _this.observableElement = element;
            _this.resizeObserver.observe(element, observerOptions);
        };
        _this.getElement = function () {
            var _a = _this.props, querySelector = _a.querySelector, targetDomEl = _a.targetDomEl;
            if (isSSR())
                return null;
            // in case we pass a querySelector
            if (querySelector)
                return document.querySelector(querySelector);
            // in case we pass a DOM element
            if (targetDomEl && isDOMElement(targetDomEl))
                return targetDomEl;
            // in case we pass a React ref using React.createRef()
            if (_this.targetRef && isDOMElement(_this.targetRef.current))
                return _this.targetRef.current;
            // the worse case when we don't receive any information from the parent and the library doesn't add any wrappers
            // we have to use a deprecated `findDOMNode` method in order to find a DOM element to attach to
            var currentElement = reactDom.findDOMNode(_this);
            if (!currentElement)
                return null;
            var renderType = _this.getRenderType();
            switch (renderType) {
                case 'renderProp':
                    return currentElement;
                case 'childFunction':
                    return currentElement;
                case 'child':
                    return currentElement;
                case 'childArray':
                    return currentElement;
                default:
                    return currentElement.parentElement;
            }
        };
        _this.createResizeHandler = function (entries) {
            var _a = _this.props, _b = _a.handleWidth, handleWidth = _b === void 0 ? true : _b, _c = _a.handleHeight, handleHeight = _c === void 0 ? true : _c, onResize = _a.onResize;
            if (!handleWidth && !handleHeight)
                return;
            var notifyResize = function (_a) {
                var width = _a.width, height = _a.height;
                if (_this.state.width === width && _this.state.height === height) {
                    // skip if dimensions haven't changed
                    return;
                }
                if ((_this.state.width === width && !handleHeight) || (_this.state.height === height && !handleWidth)) {
                    // process `handleHeight/handleWidth` props
                    return;
                }
                onResize === null || onResize === void 0 ? void 0 : onResize(width, height);
                _this.setState({ width: width, height: height });
            };
            entries.forEach(function (entry) {
                var _a = (entry && entry.contentRect) || {}, width = _a.width, height = _a.height;
                var shouldSetSize = !_this.skipOnMount && !isSSR();
                if (shouldSetSize) {
                    notifyResize({ width: width, height: height });
                }
                _this.skipOnMount = false;
            });
        };
        _this.getRenderType = function () {
            var _a = _this.props, render = _a.render, children = _a.children;
            if (isFunction(render)) {
                // DEPRECATED. Use `Child Function Pattern` instead
                return 'renderProp';
            }
            if (isFunction(children)) {
                return 'childFunction';
            }
            if (React.isValidElement(children)) {
                return 'child';
            }
            if (Array.isArray(children)) {
                // DEPRECATED. Wrap children with a single parent
                return 'childArray';
            }
            // DEPRECATED. Use `Child Function Pattern` instead
            return 'parent';
        };
        var skipOnMount = props.skipOnMount, refreshMode = props.refreshMode, _a = props.refreshRate, refreshRate = _a === void 0 ? 1000 : _a, refreshOptions = props.refreshOptions;
        _this.state = {
            width: undefined,
            height: undefined
        };
        _this.sizeRef = {
            current: _this.state
        };
        _this.skipOnMount = skipOnMount;
        _this.targetRef = React.createRef();
        _this.observableElement = null;
        if (isSSR()) {
            return _this;
        }
        _this.resizeHandler = patchResizeCallback(_this.createResizeHandler, refreshMode, refreshRate, refreshOptions);
        _this.resizeObserver = new window.ResizeObserver(_this.resizeHandler);
        return _this;
    }
    ResizeDetector.prototype.componentDidMount = function () {
        this.attachObserver();
    };
    ResizeDetector.prototype.componentDidUpdate = function () {
        this.attachObserver();
        this.sizeRef.current = this.state;
    };
    ResizeDetector.prototype.componentWillUnmount = function () {
        if (isSSR()) {
            return;
        }
        this.observableElement = null;
        this.resizeObserver.disconnect();
        this.cancelHandler();
    };
    ResizeDetector.prototype.render = function () {
        var _a = this.props, render = _a.render, children = _a.children, _b = _a.nodeType, WrapperTag = _b === void 0 ? 'div' : _b;
        var _c = this.state, width = _c.width, height = _c.height;
        var childProps = { width: width, height: height, targetRef: this.targetRef };
        var renderType = this.getRenderType();
        switch (renderType) {
            case 'renderProp':
                return render === null || render === void 0 ? void 0 : render(childProps);
            case 'childFunction': {
                var childFunction = children;
                return childFunction === null || childFunction === void 0 ? void 0 : childFunction(childProps);
            }
            case 'child': {
                // @TODO bug prone logic
                var child = children;
                if (child.type && typeof child.type === 'string') {
                    // child is a native DOM elements such as div, span etc
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    childProps.targetRef; var nativeProps = __rest(childProps, ["targetRef"]);
                    return React.cloneElement(child, nativeProps);
                }
                // class or functional component otherwise
                return React.cloneElement(child, childProps);
            }
            case 'childArray': {
                var childArray = children;
                return childArray.map(function (el) { return !!el && React.cloneElement(el, childProps); });
            }
            default:
                return React.createElement(WrapperTag, null);
        }
    };
    return ResizeDetector;
})(React.PureComponent));function useResizeDetector(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.skipOnMount, skipOnMount = _c === void 0 ? false : _c, refreshMode = _b.refreshMode, _d = _b.refreshRate, refreshRate = _d === void 0 ? 1000 : _d, refreshOptions = _b.refreshOptions, _e = _b.handleWidth, handleWidth = _e === void 0 ? true : _e, _f = _b.handleHeight, handleHeight = _f === void 0 ? true : _f, targetRef = _b.targetRef, observerOptions = _b.observerOptions, onResize = _b.onResize;
    var skipResize = React.useRef(skipOnMount);
    var _g = React.useState({
        width: undefined,
        height: undefined
    }), size = _g[0], setSize = _g[1];
    // we are going to use this ref to store the last element that was passed to the hook
    var _h = React.useState((targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) || null), refElement = _h[0], setRefElement = _h[1];
    // if targetRef is passed, we need to update the refElement
    // we have to use setTimeout because ref get assigned after the hook is called
    // in the future releases we are going to remove targetRef and force users to use ref returned by the hook
    if (targetRef) {
        setTimeout(function () {
            if (targetRef.current !== refElement) {
                setRefElement(targetRef.current);
            }
        }, 0);
    }
    // this is a callback that will be called every time the ref is changed
    // we call setState inside to trigger rerender
    var onRefChange = React.useCallback(function (node) {
        if (node !== refElement) {
            setRefElement(node);
        }
    }, [refElement]);
    // adding `current` to make it compatible with useRef shape
    onRefChange.current = refElement;
    React.useEffect(function () {
        return function () {
            // component is unmounted
            // clear ref to avoid memory leaks
            setRefElement(null);
            onRefChange.current = null;
        };
    }, []);
    var shouldSetSize = React.useCallback(function (prevSize, nextSize) {
        if (prevSize.width === nextSize.width && prevSize.height === nextSize.height) {
            // skip if dimensions haven't changed
            return false;
        }
        if ((prevSize.width === nextSize.width && !handleHeight) ||
            (prevSize.height === nextSize.height && !handleWidth)) {
            // process `handleHeight/handleWidth` props
            return false;
        }
        return true;
    }, [handleWidth, handleHeight]);
    var resizeCallback = React.useCallback(function (entries) {
        if (!handleWidth && !handleHeight)
            return;
        if (skipResize.current) {
            skipResize.current = false;
            return;
        }
        entries.forEach(function (entry) {
            var _a = (entry === null || entry === void 0 ? void 0 : entry.contentRect) || {}, width = _a.width, height = _a.height;
            setSize(function (prevSize) {
                if (!shouldSetSize(prevSize, { width: width, height: height }))
                    return prevSize;
                return { width: width, height: height };
            });
        });
    }, [handleWidth, handleHeight, skipResize, shouldSetSize]);
    var resizeHandler = React.useCallback(patchResizeCallback(resizeCallback, refreshMode, refreshRate, refreshOptions), [
        resizeCallback,
        refreshMode,
        refreshRate,
        refreshOptions
    ]);
    // on refElement change
    React.useEffect(function () {
        var resizeObserver;
        if (refElement) {
            resizeObserver = new window.ResizeObserver(resizeHandler);
            resizeObserver.observe(refElement, observerOptions);
        }
        else {
            if (size.width || size.height) {
                setSize({ width: undefined, height: undefined });
            }
        }
        return function () {
            var _a, _b, _c;
            (_a = resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect) === null || _a === void 0 ? void 0 : _a.call(resizeObserver);
            (_c = (_b = resizeHandler).cancel) === null || _c === void 0 ? void 0 : _c.call(_b);
        };
    }, [resizeHandler, refElement]);
    React.useEffect(function () {
        onResize === null || onResize === void 0 ? void 0 : onResize(size.width, size.height);
    }, [size]);
    return __assign({ ref: onRefChange }, size);
}

const CollapsibleBlockStyled = styled.div `
  position: relative;

  &.collapsed {
    .aics-collapsible-block-inner {
      margin-top: 0;
      transition: margin-top ease 0.2s;
    }
    .aics-collapsible-block-content {
      padding: 0;
    }
  }

  & > .aics-collapsible-block-header > .aics-collapsible-block-control i {
    transition: all 0.2s;
  }

  &.collapsed > .aics-collapsible-block-header > .aics-collapsible-block-control i {
    transform: rotate(-90deg);
  }
`;
const CollapsibleBlockHeaderStyled = styled.div `
  position: relative;
  font-size: 11pt;
`;
const CollapsibleBlockControlStyled = styled.button `
  position: absolute;
  top: 2px;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${textColor$3};
  padding: 0;
  margin: 0;
  font-size: 11pt;
  vertical-align: text-top;
  height: 1em;
  transition: all 0.2s;
  outline: 0;

  &:focus {
    outline: 0;
  }
`;
const CollapsibleBlockTitleStyled = styled.div `
  display: inline-block;
  margin: 2px 0;
  padding-left: 22px;
  font-family: ${defaultFont};
  font-size: 11pt;
  user-select: none;
  position: relative;

  &:focus {
    outline: 0;
  }

  & i {
    margin-right: 4px;
  }
`;
const CollapsibleBlockContentStyled = styled.div `
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;
const CollapsibleBlockInnerStyled = styled.div `
  font-size: 10pt;
  transition: margin-top ease 0.2s;
`;
const CollapsibleBlock = ({ className, children, title, collapsed, onToggle, onTransitionEnd }) => {
    const inner = React.useRef(null);
    useResizeDetector({ targetRef: inner, onResize: () => {
            updateInner();
        } });
    React.useEffect(() => {
        updateInner();
    }, []);
    React.useEffect(() => {
        updateInner();
    }, [collapsed]);
    const updateInner = React.useCallback(() => {
        if (inner.current) {
            if (collapsed) {
                const h = -(inner.current.offsetHeight + 40);
                inner.current.setAttribute('style', 'margin-top: ' + h + 'px');
            }
            else {
                inner.current.setAttribute('style', 'margin-top: 0px');
            }
        }
    }, [inner, collapsed]);
    const getClasses = () => {
        const classes = ['collapsible-block'];
        if (className != undefined) {
            classes.push(className);
        }
        if (collapsed) {
            classes.push('collapsed');
        }
        return classes.join(' ');
    };
    return (React.createElement(CollapsibleBlockStyled, { className: getClasses() },
        React.createElement(CollapsibleBlockHeaderStyled, { className: "aics-collapsible-block-header" },
            React.createElement(CollapsibleBlockControlStyled, { className: "aics-collapsible-block-control", onClick: (e) => {
                    onToggle?.(collapsed);
                    e.stopPropagation();
                } },
                React.createElement("i", { className: 'codicon codicon-chevron-down' })),
            React.createElement(CollapsibleBlockTitleStyled, { className: "aics-collapsible-block-title", onClick: (e) => {
                    onToggle?.(collapsed);
                    e.stopPropagation();
                } }, title)),
        React.createElement(CollapsibleBlockContentStyled, { className: 'aics-collapsible-block-content' },
            React.createElement(CollapsibleBlockInnerStyled, { className: 'aics-collapsible-block-inner', ref: inner, onTransitionEnd: onTransitionEnd }, children))));
};

const NamedBlockComponent = React.forwardRef(({ className, content, collapsed, selected, onToggle, onSelected, onTransitionEnd, key }, ref) => {
    const { factory, setFactory } = React.useContext(BlockFactoryContext);
    React.useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected);
        }
    }, [selected]);
    const getClasses = () => {
        let classes = ['aics-named-block'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            }
            else if (Array.isArray(className)) {
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
    return React.createElement("div", { ref: ref, className: getClasses(), onClick: handleClick },
        React.createElement(CollapsibleBlock, { title: content.name, collapsed: collapsed, onToggle: onToggle, onTransitionEnd: onTransitionEnd }, content.children.map((child, index) => {
            return factory?.build(child, content);
        })));
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
const NamedBlock = styled(NamedBlockComponent) `
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
const BlockListItem = styled(NamedBlock) `
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

const SentinalView = React.forwardRef(({ sentinal, selected, onSelected, key }, ref) => {
    React.useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected);
        }
    }, [selected]);
    return React.createElement("div", { ref: ref, className: "aics-sentinal" });
});

class DefaultBlockFactory {
    getClassNames(block, selected_index) {
        const classNames = new Set(Array.from(block.classNames));
        return Array.from(classNames);
    }
    ;
    useCollapsed(block) {
        const [collapsed, setCollapsed] = React.useState(block.collapsed);
        const toggleCollapsed = React.useCallback((c) => setCollapsed(!c), [collapsed]);
        return { collapsed, toggleCollapsed };
    }
    buildNamedContent(block, parent) {
        const { collapsed, toggleCollapsed } = this.useCollapsed(block);
        const ref = React.useRef(null);
        return React.createElement(NamedBlock, { ref: ref, content: block, collapsed: collapsed, onToggle: toggleCollapsed, key: block.uuid });
    }
    buildListItem(block, parent) {
        const { collapsed, toggleCollapsed } = this.useCollapsed(block);
        const ref = React.useRef(null);
        return React.createElement(BlockListItem, { ref: ref, content: block, collapsed: collapsed, onToggle: toggleCollapsed, key: block.uuid });
    }
    buildContent(block, parent) {
        const ref = React.useRef(null);
        return React.createElement(ContentBlock, { ref: ref, content: block, key: block.uuid });
    }
    buildSection(block, parent) {
        const ref = React.useRef(null);
        return React.createElement(ContentSection, { ref: ref, section: block, key: block.uuid });
    }
    buildList(block, parent) {
        const ref = React.useRef(null);
        return React.createElement(BlockList, { ref: ref, list: block, selected: false, key: block.uuid });
    }
    buildSpan(block, parent) {
        const ref = React.useRef(null);
        return React.createElement(ContentSpan, { ref: ref, span: block, key: block.uuid });
    }
    buildSentinal(block, parent) {
        const ref = React.useRef(null);
        return React.createElement(SentinalView, { ref: ref, sentinal: block, key: block.uuid });
    }
    build(block, parent) {
        if (block instanceof NamedContent) {
            if (parent instanceof List) {
                return this.buildListItem(block, parent);
            }
            else {
                return this.buildNamedContent(block, parent);
            }
        }
        else if (block instanceof Content) {
            return this.buildContent(block, parent);
        }
        else if (block instanceof Section) {
            return this.buildSection(block, parent);
        }
        else if (block instanceof List) {
            return this.buildList(block, parent);
        }
        else if (block instanceof Span) {
            return this.buildSpan(block, parent);
        }
        else if (block instanceof Selectable) {
            return this.buildSentinal(block, parent);
        }
        else {
            throw new Error("Unknown block data type: " + block.constructor.name);
        }
    }
}

const BlockStreamStyled = styled.div `
`;
const BlockStream = ({ blocks }) => {
    const { factory, setFactory } = React.useContext(BlockFactoryContext);
    return React.createElement(BlockStreamStyled, { className: "aics-block-stream" }, blocks.map((block, index) => {
        return factory?.build(block);
    }));
};

exports.Base = Base;
exports.BlockFactoryContext = BlockFactoryContext;
exports.BlockList = BlockList;
exports.BlockListComponent = BlockListComponent;
exports.BlockListItem = BlockListItem;
exports.BlockStream = BlockStream;
exports.Code = Code;
exports.CollapsibleBlock = CollapsibleBlock;
exports.Content = Content;
exports.ContentBlock = ContentBlock;
exports.ContentBlockComponent = ContentBlockComponent;
exports.ContentSection = ContentSection;
exports.ContentSpan = ContentSpan;
exports.DefaultBlockFactory = DefaultBlockFactory;
exports.List = List;
exports.NamedBlock = NamedBlock;
exports.NamedContent = NamedContent;
exports.Section = Section;
exports.Selectable = Selectable;
exports.SentinalView = SentinalView;
exports.Span = Span;
exports.backgroundColor = backgroundColor$3;
exports.borderColor = borderColor$2;
exports.defaultFont = defaultFont;
exports.fontWeight = fontWeight;
exports.selectedBackgroundColor = selectedBackgroundColor;
exports.selectedBorderColor = selectedBorderColor;
exports.selectedTextColor = selectedTextColor;
exports.selectedVariants = selectedVariants;
exports.textColor = textColor$3;
//# sourceMappingURL=index.js.map
