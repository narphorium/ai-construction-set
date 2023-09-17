import e,{createContext as t,forwardRef as l,useContext as r,useEffect as s,useCallback as o,useRef as a,useState as n}from"react";import i from"styled-components";import c from"styled-theming";import{useResizeDetector as d}from"react-resize-detector";class u{uuid=crypto.randomUUID();classNames=new Set;iteration;getClassNames(e){return Array.from(this.classNames)}}class m extends u{selected=!1;selection_index=null;getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selection_index&&t.add("selectable"),e===this.selection_index&&t.add("selected"),Array.from(t)}}class p extends m{name=null;spans=[]}class g extends p{language=null}class b extends m{children=[]}class f extends u{items=[]}class h extends b{name;collapsed=!0;constructor(e){super(),this.name=e}}class k extends m{content;constructor(e){super(),this.content=e}}class y extends u{name;blocks=[];constructor(){super()}}const x=t({factory:void 0,setFactory:e=>{}}),v=(e,t)=>l=>{const r=l.selected?"selected":"default";return c(e,t[r])(l)},E=c("mode",{light:"#fff",dark:"#000"}),N=c("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),C=c("mode",{light:"#fff",dark:"#000"}),w=c("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),$=c("mode",{light:"#fff",dark:"#eee"}),S=c("mode",{light:"#222",dark:"#ffde98"}),A=c("mode",{light:"Arial",dark:"Arial"}),T=c("mode",{light:500,dark:400}),z=l((({className:t,list:l,selected:o,onSelected:a,key:n},i)=>{const{factory:c,setFactory:d}=r(x);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:i,className:(()=>{let e=["aics-block-list"];return null!=t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>c?.build(e,l))))})),L=i(z)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${C};
`,_=l((({className:t,stream:l},s)=>{const{factory:o,setFactory:a}=r(x);return e.createElement("div",{ref:s,className:"aics-block-stream"},l.blocks.map(((e,t)=>o?.build(e))))})),j=i(_)`
`,F=l((({className:t,content:l,selected:o,onSelected:a,onClick:n,key:i},c)=>{const{factory:d,setFactory:u}=r(x);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-content-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==n&&n(e)}},l.children.map((e=>d?.build(e,l))))})),I=v("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),H=v("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),U=v("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),M=i(F)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${I};
  background-color: ${H};
  border-color: ${U};
`,P=l((({className:t,section:l,selected:a,onSelected:n,onClick:i,key:c},d)=>{const{factory:u,setFactory:m}=r(x);s((()=>{void 0!==n&&n(a)}),[a]);const p=o((e=>{void 0!==i&&i(e)}),[i]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),e.join(" ")})(),onClick:p},e.createElement("span",null,e.createElement("label",null,l.name?l.name+": ":""),l.spans.map((e=>u?.build(e,l)))))})),R=v("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),B=v("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),D=c("mode",{light:"#222",dark:"#ffde98"}),Z=i(P)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${T} + 200);
  }

  &.selected > span {
    color: ${R};
    background-color: ${B};
  }

  & > span > label {
    color: ${R} !important;
  }

  .selected & > span > label {
    color: ${D} !important;
  }
`,q=l((({className:t,span:l,selected:r,onSelected:o,onClick:a,key:n},i)=>{s((()=>{void 0!==o&&o(r)}),[r]);return e.createElement("span",{ref:i,className:(()=>{let e=["aics-content-span"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),r&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==a&&a(e)},dangerouslySetInnerHTML:{__html:l.content}})})),G=v("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),J=v("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),K=c("mode",{light:"#222",dark:"#ffde98"}),O=i(q)`
  color: ${G};
  background-color: ${J};

  .selected & {
    color: ${K} !important;
  }

  a {
    color: ${G};
  }
`,Q=({svg:t})=>e.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),V=i.div`
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

  & > .aics-collapsible-block-header > .aics-collapsible-block-control svg {
    transition: all 0.2s;
    transform: rotate(90deg);
  }

  &.collapsed > .aics-collapsible-block-header > .aics-collapsible-block-control svg {
    transform: rotate(0deg);
  }
`,W=i.div`
  position: relative;
  font-size: 11pt;
`,X=i.button`
  position: absolute;
  top: 0;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${$};
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

  & svg path {
    fill: ${$};
  }
`,Y=i.div`
  display: inline-block;
  margin: 2px 0;
  padding-left: 22px;
  font-family: ${A};
  font-size: 11pt;
  user-select: none;
  position: relative;

  &:focus {
    outline: 0;
  }

  & i {
    margin-right: 4px;
  }
`,ee=i.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,te=i.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`,le=({className:t,children:l,title:r,collapsed:n,onToggle:i,onTransitionEnd:c})=>{const u=a(null);d({targetRef:u,onResize:()=>{m()}}),s((()=>{m()}),[]),s((()=>{m()}),[n]);const m=o((()=>{if(u.current)if(n){const e=-(u.current.offsetHeight+40);u.current.setAttribute("style","margin-top: "+e+"px")}else u.current.setAttribute("style","margin-top: 0px")}),[u,n]);return e.createElement(V,{className:(()=>{const e=["collapsible-block"];return null!=t&&e.push(t),n&&e.push("collapsed"),e.join(" ")})()},e.createElement(W,{className:"aics-collapsible-block-header"},e.createElement(X,{className:"aics-collapsible-block-control",onClick:e=>{i?.(n),e.stopPropagation()}},e.createElement(Q,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(Y,{className:"aics-collapsible-block-title",onClick:e=>{i?.(n),e.stopPropagation()}},r)),e.createElement(ee,{className:"aics-collapsible-block-content"},e.createElement(te,{className:"aics-collapsible-block-inner",ref:u,onTransitionEnd:c},l)))},re=l((({className:t,content:l,collapsed:o,selected:a,onToggle:n,onSelected:i,onTransitionEnd:c,key:d},u)=>{const{factory:m,setFactory:p}=r(x);s((()=>{void 0!==i&&i(a)}),[a]);return e.createElement("div",{ref:u,className:(()=>{let e=["aics-named-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{n&&n(!o)}},e.createElement(le,{title:l.name,collapsed:o,onToggle:n,onTransitionEnd:c},l.children.map(((e,t)=>m?.build(e,l)))))})),se=v("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),oe=v("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),ae=v("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),ne=v("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),ie=i(re)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${se};
    background-color: ${oe};
    border-color: ${ae};

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
`,ce=i(ie)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${ne};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`,de=l((({sentinal:t,selected:l,onSelected:r,key:o},a)=>(s((()=>{void 0!==r&&r(l)}),[l]),e.createElement("div",{ref:a,className:"aics-sentinal"}))));class ue{getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}useCollapsed(e){const[t,l]=n(e.collapsed);return{collapsed:t,toggleCollapsed:o((e=>l(!e)),[t])}}buildNamedContent(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(ie,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildListItem(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(ce,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildContent(t,l){const r=a(null);return e.createElement(M,{ref:r,content:t,key:t.uuid})}buildSection(t,l){const r=a(null);return e.createElement(Z,{ref:r,section:t,key:t.uuid})}buildList(t,l){const r=a(null);return e.createElement(L,{ref:r,list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const r=a(null);return e.createElement(O,{ref:r,span:t,key:t.uuid})}buildSentinal(t,l){const r=a(null);return e.createElement(de,{ref:r,sentinal:t,key:t.uuid})}buildStream(t,l){const r=a(null);return e.createElement(j,{ref:r,stream:t,key:t.uuid})}build(e,t){if(e instanceof h)return t instanceof f?this.buildListItem(e,t):this.buildNamedContent(e,t);if(e instanceof b)return this.buildContent(e,t);if(e instanceof p)return this.buildSection(e,t);if(e instanceof f)return this.buildList(e,t);if(e instanceof k)return this.buildSpan(e,t);if(e instanceof y)return this.buildStream(e,t);if(e instanceof m)return this.buildSentinal(e,t);throw new Error("Unknown block data type: "+e.constructor.name)}}export{u as Base,x as BlockFactoryContext,L as BlockList,z as BlockListComponent,ce as BlockListItem,j as BlockStream,_ as BlockStreamComponent,g as Code,le as CollapsibleBlock,b as Content,M as ContentBlock,F as ContentBlockComponent,Z as ContentSection,O as ContentSpan,ue as DefaultBlockFactory,f as List,ie as NamedBlock,h as NamedContent,p as Section,m as Selectable,de as SentinalView,k as Span,y as Stream,E as backgroundColor,C as borderColor,A as defaultFont,T as fontWeight,N as selectedBackgroundColor,w as selectedBorderColor,S as selectedTextColor,v as selectedVariants,$ as textColor};
//# sourceMappingURL=index.esm.js.map
