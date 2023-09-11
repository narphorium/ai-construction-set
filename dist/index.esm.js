import e,{createContext as t,forwardRef as l,useContext as r,useEffect as o,useCallback as s,useRef as n,useState as a}from"react";import i from"styled-components";import c from"styled-theming";import{useResizeDetector as d}from"react-resize-detector";class p{uuid=crypto.randomUUID();classNames=new Set;getClassNames(e){return Array.from(this.classNames)}}class u extends p{selected=!1;selection_index=null;getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selection_index&&t.add("selectable"),e===this.selection_index&&t.add("selected"),Array.from(t)}}class m extends u{name=null;spans=[]}class g extends m{language=null}class b extends u{children=[]}class f extends p{items=[]}class h extends b{name;collapsed=!0;constructor(e){super(),this.name=e}}class k extends u{content;constructor(e){super(),this.content=e}}const y=t({factory:void 0,setFactory:e=>{}}),x=(e,t)=>l=>{const r=l.selected?"selected":"default";return c(e,t[r])(l)},v=c("mode",{light:"#fff",dark:"#000"}),E=c("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),N=c("mode",{light:"#fff",dark:"#000"}),C=c("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),w=c("mode",{light:"#fff",dark:"#eee"}),$=c("mode",{light:"#222",dark:"#ffde98"}),A=c("mode",{light:"Arial",dark:"Arial"}),S=c("mode",{light:500,dark:400}),T=l((({className:t,list:l,selected:s,onSelected:n,key:a},i)=>{const{factory:c,setFactory:d}=r(y);o((()=>{void 0!==n&&n(s)}),[s]);return e.createElement("div",{ref:i,className:(()=>{let e=["aics-block-list"];return null!=t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),s&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>c?.build(e,l))))})),z=i(T)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${N};
`,L=l((({className:t,content:l,selected:s,onSelected:n,onClick:a,key:i},c)=>{const{factory:d,setFactory:p}=r(y);o((()=>{void 0!==n&&n(s)}),[s]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-content-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),s&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==a&&a(e)}},l.children.map((e=>d?.build(e,l))))})),_=x("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),j=x("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),F=x("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),I=i(L)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${_};
  background-color: ${j};
  border-color: ${F};
`,H=l((({className:t,section:l,selected:n,onSelected:a,onClick:i,key:c},d)=>{const{factory:p,setFactory:u}=r(y);o((()=>{void 0!==a&&a(n)}),[n]);const m=s((e=>{void 0!==i&&i(e)}),[i]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),n&&e.push("selected"),e.join(" ")})(),onClick:m},e.createElement("span",null,e.createElement("label",null,l.name?l.name+": ":""),l.spans.map((e=>p?.build(e,l)))))})),U=x("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),M=x("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),P=c("mode",{light:"#222",dark:"#ffde98"}),R=i(H)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${S} + 200);
  }

  &.selected > span {
    color: ${U};
    background-color: ${M};
  }

  & > span > label {
    color: ${U} !important;
  }

  .selected & > span > label {
    color: ${P} !important;
  }
`,B=l((({className:t,span:l,selected:r,onSelected:s,onClick:n,key:a},i)=>{o((()=>{void 0!==s&&s(r)}),[r]);return e.createElement("span",{ref:i,className:(()=>{let e=["aics-content-span"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),r&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==n&&n(e)},dangerouslySetInnerHTML:{__html:l.content}})})),D=x("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),Z=x("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),q=c("mode",{light:"#222",dark:"#ffde98"}),G=i(B)`
  color: ${D};
  background-color: ${Z};

  .selected & {
    color: ${q} !important;
  }

  a {
    color: ${D};
  }
`,J=({svg:t})=>e.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),K=i.div`
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
`,O=i.div`
  position: relative;
  font-size: 11pt;
`,Q=i.button`
  position: absolute;
  top: 2px;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${w};
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
`,V=i.div`
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
`,W=i.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,X=i.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;
`,Y=({className:t,children:l,title:r,collapsed:a,onToggle:i,onTransitionEnd:c})=>{const p=n(null);d({targetRef:p,onResize:()=>{u()}}),o((()=>{u()}),[]),o((()=>{u()}),[a]);const u=s((()=>{if(p.current)if(a){const e=-(p.current.offsetHeight+40);p.current.setAttribute("style","margin-top: "+e+"px")}else p.current.setAttribute("style","margin-top: 0px")}),[p,a]);return e.createElement(K,{className:(()=>{const e=["collapsible-block"];return null!=t&&e.push(t),a&&e.push("collapsed"),e.join(" ")})()},e.createElement(O,{className:"aics-collapsible-block-header"},e.createElement(Q,{className:"aics-collapsible-block-control",onClick:e=>{i?.(a),e.stopPropagation()}},e.createElement(J,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(V,{className:"aics-collapsible-block-title",onClick:e=>{i?.(a),e.stopPropagation()}},r)),e.createElement(W,{className:"aics-collapsible-block-content"},e.createElement(X,{className:"aics-collapsible-block-inner",ref:p,onTransitionEnd:c},l)))},ee=l((({className:t,content:l,collapsed:s,selected:n,onToggle:a,onSelected:i,onTransitionEnd:c,key:d},p)=>{const{factory:u,setFactory:m}=r(y);o((()=>{void 0!==i&&i(n)}),[n]);return e.createElement("div",{ref:p,className:(()=>{let e=["aics-named-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),n&&e.push("selected"),s&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{a&&a(!s)}},e.createElement(Y,{title:l.name,collapsed:s,onToggle:a,onTransitionEnd:c},l.children.map(((e,t)=>u?.build(e,l)))))})),te=x("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),le=x("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),re=x("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),oe=x("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),se=i(ee)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${te};
    background-color: ${le};
    border-color: ${re};

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
`,ne=i(se)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${oe};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`,ae=l((({sentinal:t,selected:l,onSelected:r,key:s},n)=>(o((()=>{void 0!==r&&r(l)}),[l]),e.createElement("div",{ref:n,className:"aics-sentinal"}))));class ie{getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}useCollapsed(e){const[t,l]=a(e.collapsed);return{collapsed:t,toggleCollapsed:s((e=>l(!e)),[t])}}buildNamedContent(t,l){const{collapsed:r,toggleCollapsed:o}=this.useCollapsed(t),s=n(null);return e.createElement(se,{ref:s,content:t,collapsed:r,onToggle:o,key:t.uuid})}buildListItem(t,l){const{collapsed:r,toggleCollapsed:o}=this.useCollapsed(t),s=n(null);return e.createElement(ne,{ref:s,content:t,collapsed:r,onToggle:o,key:t.uuid})}buildContent(t,l){const r=n(null);return e.createElement(I,{ref:r,content:t,key:t.uuid})}buildSection(t,l){const r=n(null);return e.createElement(R,{ref:r,section:t,key:t.uuid})}buildList(t,l){const r=n(null);return e.createElement(z,{ref:r,list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const r=n(null);return e.createElement(G,{ref:r,span:t,key:t.uuid})}buildSentinal(t,l){const r=n(null);return e.createElement(ae,{ref:r,sentinal:t,key:t.uuid})}build(e,t){if(e instanceof h)return t instanceof f?this.buildListItem(e,t):this.buildNamedContent(e,t);if(e instanceof b)return this.buildContent(e,t);if(e instanceof m)return this.buildSection(e,t);if(e instanceof f)return this.buildList(e,t);if(e instanceof k)return this.buildSpan(e,t);if(e instanceof u)return this.buildSentinal(e,t);throw new Error("Unknown block data type: "+e.constructor.name)}}const ce=i.div`
`,de=({blocks:t})=>{const{factory:l,setFactory:o}=r(y);return e.createElement(ce,{className:"aics-block-stream"},t.map(((e,t)=>l?.build(e))))};export{p as Base,y as BlockFactoryContext,z as BlockList,T as BlockListComponent,ne as BlockListItem,de as BlockStream,g as Code,Y as CollapsibleBlock,b as Content,I as ContentBlock,L as ContentBlockComponent,R as ContentSection,G as ContentSpan,ie as DefaultBlockFactory,f as List,se as NamedBlock,h as NamedContent,m as Section,u as Selectable,ae as SentinalView,k as Span,v as backgroundColor,N as borderColor,A as defaultFont,S as fontWeight,E as selectedBackgroundColor,C as selectedBorderColor,$ as selectedTextColor,x as selectedVariants,w as textColor};
//# sourceMappingURL=index.esm.js.map
