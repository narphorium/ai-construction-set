"use strict";var e=require("react"),t=require("styled-components"),l=require("styled-theming"),o=require("react-resize-detector");class s{uuid=crypto.randomUUID();classNames=new Set;getClassNames(e){return Array.from(this.classNames)}}class r extends s{selected=!1;selection_index=null;getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selection_index&&t.add("selectable"),e===this.selection_index&&t.add("selected"),Array.from(t)}}class n extends r{name=null;spans=[]}class a extends r{children=[]}class c extends s{items=[]}class i extends a{name;collapsed=!0;constructor(e){super(),this.name=e}}class d extends r{content;constructor(e){super(),this.content=e}}const u=e.createContext({factory:void 0,setFactory:e=>{}}),p=(e,t)=>o=>{const s=o.selected?"selected":"default";return l(e,t[s])(o)},f=l("mode",{light:"#fff",dark:"#000"}),m=l("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),g=l("mode",{light:"#fff",dark:"#000"}),b=l("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),k=l("mode",{light:"#fff",dark:"#eee"}),h=l("mode",{light:"#222",dark:"#ffde98"}),x=l("mode",{light:"Arial",dark:"Arial"}),y=l("mode",{light:500,dark:400}),C=e.forwardRef((({className:t,list:l,selected:o,onSelected:s,key:r},n)=>{const{factory:a,setFactory:c}=e.useContext(u);e.useEffect((()=>{void 0!==s&&s(o)}),[o]);return e.createElement("div",{ref:n,className:(()=>{let e=["aics-block-list"];return null!=t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>a?.build(e,l))))})),E=t(C)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${g};
`,v=e.forwardRef((({className:t,content:l,selected:o,onSelected:s,onClick:r,key:n},a)=>{const{factory:c,setFactory:i}=e.useContext(u);e.useEffect((()=>{void 0!==s&&s(o)}),[o]);return e.createElement("div",{ref:a,className:(()=>{let e=["aics-content-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==r&&r(e)}},l.children.map((e=>c?.build(e,l))))})),N=p("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),w=p("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),S=p("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),$=t(v)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${N};
  background-color: ${w};
  border-color: ${S};
`,A=e.forwardRef((({className:t,section:l,selected:o,onSelected:s,onClick:r,key:n},a)=>{const{factory:c,setFactory:i}=e.useContext(u);e.useEffect((()=>{void 0!==s&&s(o)}),[o]);const d=e.useCallback((e=>{void 0!==r&&r(e)}),[r]);return e.createElement("div",{ref:a,className:(()=>{let e=["aics-content-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:d},e.createElement("span",null,e.createElement("label",null,l.name?l.name+": ":""),l.spans.map((e=>c?.build(e,l)))))})),R=p("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),B=p("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),T=l("mode",{light:"#222",dark:"#ffde98"}),L=t(A)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${y} + 200);
  }

  &.selected > span {
    color: ${R};
    background-color: ${B};
  }

  & > span > label {
    color: ${R} !important;
  }

  .selected & > span > label {
    color: ${T} !important;
  }
`,z=e.forwardRef((({className:t,span:l,selected:o,onSelected:s,onClick:r,key:n},a)=>{e.useEffect((()=>{void 0!==s&&s(o)}),[o]);return e.createElement("span",{ref:a,className:(()=>{let e=["aics-content-span"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==r&&r(e)},dangerouslySetInnerHTML:{__html:l.content}})})),F=p("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),_=p("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),j=l("mode",{light:"#222",dark:"#ffde98"}),I=t(z)`
  color: ${F};
  background-color: ${_};

  .selected & {
    color: ${j} !important;
  }

  a {
    color: ${F};
  }
`,q=({svg:t})=>e.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),D=t.div`
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
`,H=t.div`
  position: relative;
  font-size: 11pt;
`,U=t.button`
  position: absolute;
  top: 2px;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${k};
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
`,M=t.div`
  display: inline-block;
  margin: 2px 0;
  padding-left: 22px;
  font-family: ${x};
  font-size: 11pt;
  user-select: none;
  position: relative;

  &:focus {
    outline: 0;
  }

  & i {
    margin-right: 4px;
  }
`,P=t.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,V=t.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;
`,W=({className:t,children:l,title:s,collapsed:r,onToggle:n,onTransitionEnd:a})=>{const c=e.useRef(null);o.useResizeDetector({targetRef:c,onResize:()=>{i()}}),e.useEffect((()=>{i()}),[]),e.useEffect((()=>{i()}),[r]);const i=e.useCallback((()=>{if(c.current)if(r){const e=-(c.current.offsetHeight+40);c.current.setAttribute("style","margin-top: "+e+"px")}else c.current.setAttribute("style","margin-top: 0px")}),[c,r]);return e.createElement(D,{className:(()=>{const e=["collapsible-block"];return null!=t&&e.push(t),r&&e.push("collapsed"),e.join(" ")})()},e.createElement(H,{className:"aics-collapsible-block-header"},e.createElement(U,{className:"aics-collapsible-block-control",onClick:e=>{n?.(r),e.stopPropagation()}},e.createElement(q,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(M,{className:"aics-collapsible-block-title",onClick:e=>{n?.(r),e.stopPropagation()}},s)),e.createElement(P,{className:"aics-collapsible-block-content"},e.createElement(V,{className:"aics-collapsible-block-inner",ref:c,onTransitionEnd:a},l)))},Z=e.forwardRef((({className:t,content:l,collapsed:o,selected:s,onToggle:r,onSelected:n,onTransitionEnd:a,key:c},i)=>{const{factory:d,setFactory:p}=e.useContext(u);e.useEffect((()=>{void 0!==n&&n(s)}),[s]);return e.createElement("div",{ref:i,className:(()=>{let e=["aics-named-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),s&&e.push("selected"),o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{r&&r(!o)}},e.createElement(W,{title:l.name,collapsed:o,onToggle:r,onTransitionEnd:a},l.children.map(((e,t)=>d?.build(e,l)))))})),G=p("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),J=p("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),K=p("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),O=p("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),Q=t(Z)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${G};
    background-color: ${J};
    border-color: ${K};

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
`,X=t(Q)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${O};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`,Y=e.forwardRef((({sentinal:t,selected:l,onSelected:o,key:s},r)=>(e.useEffect((()=>{void 0!==o&&o(l)}),[l]),e.createElement("div",{ref:r,className:"aics-sentinal"}))));const ee=t.div`
`;exports.Base=s,exports.BlockFactoryContext=u,exports.BlockList=E,exports.BlockListComponent=C,exports.BlockListItem=X,exports.BlockStream=({blocks:t})=>{const{factory:l,setFactory:o}=e.useContext(u);return e.createElement(ee,{className:"aics-block-stream"},t.map(((e,t)=>l?.build(e))))},exports.Code=class extends n{language=null},exports.CollapsibleBlock=W,exports.Content=a,exports.ContentBlock=$,exports.ContentBlockComponent=v,exports.ContentSection=L,exports.ContentSpan=I,exports.DefaultBlockFactory=class{getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}useCollapsed(t){const[l,o]=e.useState(t.collapsed);return{collapsed:l,toggleCollapsed:e.useCallback((e=>o(!e)),[l])}}buildNamedContent(t,l){const{collapsed:o,toggleCollapsed:s}=this.useCollapsed(t),r=e.useRef(null);return e.createElement(Q,{ref:r,content:t,collapsed:o,onToggle:s,key:t.uuid})}buildListItem(t,l){const{collapsed:o,toggleCollapsed:s}=this.useCollapsed(t),r=e.useRef(null);return e.createElement(X,{ref:r,content:t,collapsed:o,onToggle:s,key:t.uuid})}buildContent(t,l){const o=e.useRef(null);return e.createElement($,{ref:o,content:t,key:t.uuid})}buildSection(t,l){const o=e.useRef(null);return e.createElement(L,{ref:o,section:t,key:t.uuid})}buildList(t,l){const o=e.useRef(null);return e.createElement(E,{ref:o,list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const o=e.useRef(null);return e.createElement(I,{ref:o,span:t,key:t.uuid})}buildSentinal(t,l){const o=e.useRef(null);return e.createElement(Y,{ref:o,sentinal:t,key:t.uuid})}build(e,t){if(e instanceof i)return t instanceof c?this.buildListItem(e,t):this.buildNamedContent(e,t);if(e instanceof a)return this.buildContent(e,t);if(e instanceof n)return this.buildSection(e,t);if(e instanceof c)return this.buildList(e,t);if(e instanceof d)return this.buildSpan(e,t);if(e instanceof r)return this.buildSentinal(e,t);throw new Error("Unknown block data type: "+e.constructor.name)}},exports.List=c,exports.NamedBlock=Q,exports.NamedContent=i,exports.Section=n,exports.Selectable=r,exports.SentinalView=Y,exports.Span=d,exports.backgroundColor=f,exports.borderColor=g,exports.defaultFont=x,exports.fontWeight=y,exports.selectedBackgroundColor=m,exports.selectedBorderColor=b,exports.selectedTextColor=h,exports.selectedVariants=p,exports.textColor=k;
//# sourceMappingURL=index.js.map
