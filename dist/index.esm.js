import e,{createContext as t,forwardRef as l,useContext as r,useEffect as s,useCallback as o,useRef as a,useState as n}from"react";import c,{styled as i}from"styled-components";import d from"styled-theming";import{useResizeDetector as u}from"react-resize-detector";const m=t({factory:void 0,setFactory:e=>{}}),p=(e,t)=>l=>{const r=l.selected?"selected":"default";return d(e,t[r])(l)},g=d("mode",{light:"#fff",dark:"#000"}),b=d("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),f=d("mode",{light:"#fff",dark:"#000"}),h=d("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),k=d("mode",{light:"#fff",dark:"#eee"}),y=d("mode",{light:"#222",dark:"#ffde98"}),x=d("mode",{light:"Arial",dark:"Arial"}),v=d("mode",{light:500,dark:400}),E=l((({className:t,list:l,selected:o,onSelected:a,key:n},c)=>{const{factory:i,setFactory:d}=r(m);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-block-list"];return null!=t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>i?.build(e,l))))})),N=i(E)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${f};
`,C=l((({className:t,stream:l},s)=>{const{factory:o,setFactory:a}=r(m);return e.createElement("div",{ref:s,className:"aics-block-stream"},l.blocks.map(((e,t)=>o?.build(e))))})),w=i(C)`
`,$=l((({className:t,content:l,selected:o,onSelected:a,onClick:n,key:c},i)=>{const{factory:d,setFactory:u}=r(m);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:i,className:(()=>{let e=["aics-content-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==n&&n(e)}},l.children.map((e=>d?.build(e,l))))})),A=p("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),S=p("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),T=p("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),z=c($)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${A};
  background-color: ${S};
  border-color: ${T};
`,j=l((({className:t,section:l,selected:a,onSelected:n,onClick:c,key:i},d)=>{const{factory:u,setFactory:p}=r(m);s((()=>{void 0!==n&&n(a)}),[a]);const g=o((e=>{void 0!==c&&c(e)}),[c]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),e.join(" ")})(),onClick:g},e.createElement("span",null,e.createElement("label",null,l.name?l.name+": ":""),l.spans.map((e=>u?.build(e,l)))))})),_=p("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),F=p("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),B=d("mode",{light:"#222",dark:"#ffde98"}),L=c(j)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${v} + 200);
  }

  &.selected > span {
    color: ${_};
    background-color: ${F};
  }

  & > span > label {
    color: ${_} !important;
  }

  .selected & > span > label {
    color: ${B} !important;
  }
`,I=l((({className:t,span:l,selected:r,onSelected:o,onClick:a,key:n},c)=>{s((()=>{void 0!==o&&o(r)}),[r]);return e.createElement("span",{ref:c,className:(()=>{let e=["aics-content-span"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),r&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==a&&a(e)},dangerouslySetInnerHTML:{__html:l.content}})})),H=p("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),M=p("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),P=d("mode",{light:"#222",dark:"#ffde98"}),R=c(I)`
  color: ${H};
  background-color: ${M};

  .selected & {
    color: ${P} !important;
  }

  a {
    color: ${H};
  }
`,U=({svg:t})=>e.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),D=i.div`
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
`,O=i.div`
  position: relative;
  font-size: 11pt;
`,W=i.button`
  position: absolute;
  top: 0;
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

  & svg path {
    fill: ${k};
  }
`,Z=i.div`
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
`,q=i.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,G=i.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`,J=({className:t,children:l,title:r,collapsed:n,onToggle:c,onTransitionEnd:i})=>{const d=a(null);u({targetRef:d,onResize:()=>{m()}}),s((()=>{m()}),[]),s((()=>{m()}),[n]);const m=o((()=>{if(d.current)if(n){const e=-(d.current.offsetHeight+40);d.current.setAttribute("style","margin-top: "+e+"px")}else d.current.setAttribute("style","margin-top: 0px")}),[d,n]);return e.createElement(D,{className:(()=>{const e=["collapsible-block"];return null!=t&&e.push(t),n&&e.push("collapsed"),e.join(" ")})()},e.createElement(O,{className:"aics-collapsible-block-header"},e.createElement(W,{className:"aics-collapsible-block-control",onClick:e=>{c?.(n),e.stopPropagation()}},e.createElement(U,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(Z,{className:"aics-collapsible-block-title",onClick:e=>{c?.(n),e.stopPropagation()}},r)),e.createElement(q,{className:"aics-collapsible-block-content"},e.createElement(G,{className:"aics-collapsible-block-inner",ref:d,onTransitionEnd:i},l)))},K=l((({className:t,content:l,collapsed:o,selected:a,onToggle:n,onSelected:c,onTransitionEnd:i,key:d},u)=>{const{factory:p,setFactory:g}=r(m);s((()=>{void 0!==c&&c(a)}),[a]);return e.createElement("div",{ref:u,className:(()=>{let e=["aics-named-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{n&&n(!o)}},e.createElement(J,{title:l.name,collapsed:o,onToggle:n,onTransitionEnd:i},l.children.map(((e,t)=>p?.build(e,l)))))})),Q=p("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),V=p("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),X=p("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),Y=p("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),ee=c(K)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${Q};
    background-color: ${V};
    border-color: ${X};

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
`,te=c(ee)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${Y};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`,le=l((({sentinal:t,selected:l,onSelected:r,key:o},a)=>(s((()=>{void 0!==r&&r(l)}),[l]),e.createElement("div",{ref:a,className:"aics-sentinal"}))));class re{builders=new Map;constructor(){Object.keys(this).forEach((e=>{if(e.startsWith("build")){const t=this[e];"function"==typeof t&&this.registerBuilder(e.substring(5),t)}}))}registerBuilder(e,t){this.builders.set(e,t)}getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}useCollapsed(e){const[t,l]=n(e.collapsed);return{collapsed:t,toggleCollapsed:o((e=>l(!e)),[t])}}buildNamedContent(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(ee,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildListItem(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(te,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildContent(t,l){const r=a(null);return e.createElement(z,{ref:r,content:t,key:t.uuid})}buildSection(t,l){const r=a(null);return e.createElement(L,{ref:r,section:t,key:t.uuid})}buildList(t,l){const r=a(null);return e.createElement(N,{ref:r,list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const r=a(null);return e.createElement(R,{ref:r,span:t,key:t.uuid})}buildSelectable(t,l){const r=a(null);return e.createElement(le,{ref:r,sentinal:t,key:t.uuid})}buildStream(t,l){const r=a(null);return e.createElement(w,{ref:r,stream:t,key:t.uuid})}build(e,t){if(this.builders.has(e.constructor.name)){const l=this.builders.get(e.constructor.name);if(l)return l(e,t);throw new Error("Builder not found for class: "+e.constructor.name)}throw new Error("Builder not found for class: "+e.constructor.name)}}class se{uuid=crypto.randomUUID();classNames=new Set;iteration;getClassNames(e){return Array.from(this.classNames)}}class oe extends se{selected=!1;selection_index=null;getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selection_index&&t.add("selectable"),e===this.selection_index&&t.add("selected"),Array.from(t)}}class ae extends oe{name=null;spans=[]}class ne extends ae{language=null}class ce extends oe{children=[]}class ie extends ce{name;collapsed=!0;constructor(e){super(),this.name=e}}class de extends ie{}class ue extends se{items=[]}class me extends oe{content;constructor(e){super(),this.content=e}}class pe extends se{name;blocks=[];constructor(){super()}}export{se as Base,m as BlockFactoryContext,N as BlockList,E as BlockListComponent,te as BlockListItem,w as BlockStream,C as BlockStreamComponent,ne as Code,J as CollapsibleBlock,ce as Content,z as ContentBlock,$ as ContentBlockComponent,L as ContentSection,R as ContentSpan,re as DefaultBlockFactory,ue as List,de as ListItem,ee as NamedBlock,ie as NamedContent,ae as Section,oe as Selectable,le as SentinalView,me as Span,pe as Stream,g as backgroundColor,f as borderColor,x as defaultFont,v as fontWeight,b as selectedBackgroundColor,h as selectedBorderColor,y as selectedTextColor,p as selectedVariants,k as textColor};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXNtLmpzIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MvQmxvY2tGYWN0b3J5Q29udGV4dC50cyIsIi4uL3NyYy9jb21wb25lbnRzL3RoZW1lLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvQmxvY2tMaXN0LnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrU3RyZWFtLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0NvbnRlbnRCbG9jay50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50U2VjdGlvbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50U3Bhbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9JY29uLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0NvbGxhcHNpYmxlQmxvY2sudHN4IiwiLi4vc3JjL2Fzc2V0cy9pY29ucy50cyIsIi4uL3NyYy9jb21wb25lbnRzL05hbWVkQmxvY2sudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvU2VudGluYWxWaWV3LnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrRmFjdG9yeS50c3giLCIuLi9zcmMvZGF0YS9CYXNlLnRzIiwiLi4vc3JjL2RhdGEvU2VsZWN0YWJsZS50cyIsIi4uL3NyYy9kYXRhL1NlY3Rpb24udHMiLCIuLi9zcmMvZGF0YS9Db2RlLnRzIiwiLi4vc3JjL2RhdGEvQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL05hbWVkQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL0xpc3QudHMiLCIuLi9zcmMvZGF0YS9TcGFuLnRzIiwiLi4vc3JjL2RhdGEvU3RyZWFtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sIm5hbWVzIjpbIkJsb2NrRmFjdG9yeUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiZmFjdG9yeSIsInVuZGVmaW5lZCIsInNldEZhY3RvcnkiLCJzZWxlY3RlZFZhcmlhbnRzIiwibW9kZSIsInZhbHVlcyIsInByb3BzIiwidmFyaWFudCIsInRoZW1lIiwiYmFja2dyb3VuZENvbG9yIiwibGlnaHQiLCJkYXJrIiwic2VsZWN0ZWRCYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsInNlbGVjdGVkQm9yZGVyQ29sb3IiLCJ0ZXh0Q29sb3IiLCJzZWxlY3RlZFRleHRDb2xvciIsImRlZmF1bHRGb250IiwiZm9udFdlaWdodCIsIkJsb2NrTGlzdENvbXBvbmVudCIsImZvcndhcmRSZWYiLCJjbGFzc05hbWUiLCJsaXN0Iiwic2VsZWN0ZWQiLCJvblNlbGVjdGVkIiwia2V5IiwicmVmIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzZXMiLCJwdXNoIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uY2F0Iiwiam9pbiIsImdldENsYXNzZXMiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImJ1aWxkIiwiQmxvY2tMaXN0Iiwic3R5bGVkIiwiQmxvY2tTdHJlYW1Db21wb25lbnQiLCJzdHJlYW0iLCJibG9ja3MiLCJibG9jayIsIkJsb2NrU3RyZWFtIiwiQ29udGVudEJsb2NrQ29tcG9uZW50IiwiY29udGVudCIsIm9uQ2xpY2siLCJlIiwiY2hpbGRyZW4iLCJjaGlsZCIsImRlZmF1bHQiLCJDb250ZW50QmxvY2siLCJDb250ZW50U2VjdGlvbkNvbXBvbmVudCIsInNlY3Rpb24iLCJoYW5kbGVDbGljayIsInVzZUNhbGxiYWNrIiwibmFtZSIsInNwYW5zIiwic3BhbiIsInNlbGVjdGVkTGFiZWxDb2xvciIsIkNvbnRlbnRTZWN0aW9uIiwiQ29udGVudFNwYW5Db21wb25lbnQiLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsIl9faHRtbCIsInNwYW5UZXh0Q29sb3IiLCJzcGFuQmFja2dyb3VuZENvbG9yIiwic2VsZWN0ZWRDaGlsZFNwYW5Db2xvciIsIkNvbnRlbnRTcGFuIiwiSWNvbiIsInN2ZyIsIkNvbGxhcHNpYmxlQmxvY2tTdHlsZWQiLCJkaXYiLCJDb2xsYXBzaWJsZUJsb2NrSGVhZGVyU3R5bGVkIiwiQ29sbGFwc2libGVCbG9ja0NvbnRyb2xTdHlsZWQiLCJidXR0b24iLCJDb2xsYXBzaWJsZUJsb2NrVGl0bGVTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrQ29udGVudFN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2tJbm5lclN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2siLCJ0aXRsZSIsImNvbGxhcHNlZCIsIm9uVG9nZ2xlIiwib25UcmFuc2l0aW9uRW5kIiwiaW5uZXIiLCJ1c2VSZWYiLCJ1c2VSZXNpemVEZXRlY3RvciIsInRhcmdldFJlZiIsIm9uUmVzaXplIiwidXBkYXRlSW5uZXIiLCJjdXJyZW50IiwiaCIsIm9mZnNldEhlaWdodCIsInNldEF0dHJpYnV0ZSIsInN0b3BQcm9wYWdhdGlvbiIsIk5hbWVkQmxvY2tDb21wb25lbnQiLCJpdGVtQm9yZGVyQ29sb3IiLCJOYW1lZEJsb2NrIiwiQmxvY2tMaXN0SXRlbSIsIlNlbnRpbmFsVmlldyIsInNlbnRpbmFsIiwiRGVmYXVsdEJsb2NrRmFjdG9yeSIsImJ1aWxkZXJzIiwiTWFwIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJrZXlzIiwidGhpcyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwibWV0aG9kIiwicmVnaXN0ZXJCdWlsZGVyIiwic3Vic3RyaW5nIiwidGFyZ2V0X2NsYXNzIiwiYnVpbGRlciIsInNldCIsImdldENsYXNzTmFtZXMiLCJzZWxlY3RlZF9pbmRleCIsImNsYXNzTmFtZXMiLCJTZXQiLCJmcm9tIiwidXNlQ29sbGFwc2VkIiwic2V0Q29sbGFwc2VkIiwidXNlU3RhdGUiLCJ0b2dnbGVDb2xsYXBzZWQiLCJjIiwiYnVpbGROYW1lZENvbnRlbnQiLCJwYXJlbnQiLCJ1dWlkIiwiYnVpbGRMaXN0SXRlbSIsImJ1aWxkQ29udGVudCIsImJ1aWxkU2VjdGlvbiIsImJ1aWxkTGlzdCIsImJ1aWxkU3BhbiIsImJ1aWxkU2VsZWN0YWJsZSIsImJ1aWxkU3RyZWFtIiwiaGFzIiwiZ2V0IiwiRXJyb3IiLCJCYXNlIiwiY3J5cHRvIiwicmFuZG9tVVVJRCIsIml0ZXJhdGlvbiIsIlNlbGVjdGFibGUiLCJzZWxlY3Rpb25faW5kZXgiLCJzdXBlciIsImFkZCIsIlNlY3Rpb24iLCJDb2RlIiwibGFuZ3VhZ2UiLCJDb250ZW50IiwiTmFtZWRDb250ZW50IiwiTGlzdEl0ZW0iLCJMaXN0IiwiU3BhbiIsIlN0cmVhbSJdLCJtYXBwaW5ncyI6InlRQVNPLE1BQU1BLEVBQXNCQyxFQUFpQyxDQUNoRUMsYUFBU0MsRUFDVEMsV0FBYUYsSUFBRCxJQ05IRyxFQUFtQixDQUFDQyxFQUFjQyxJQUNyQ0MsSUFDTixNQUFNQyxFQUFVRCxFQUFnQixTQUFJLFdBQWEsVUFDakQsT0FBT0UsRUFBTUosRUFBTUMsRUFBT0UsR0FBbkJDLENBQTZCRixFQUFNLEVBS2pDRyxFQUFrQkQsRUFBTSxPQUFRLENBQzNDRSxNQUFPLE9BQ1BDLEtBQU0sU0FHS0MsRUFBMEJKLEVBQU0sT0FBUSxDQUNuREUsTUFBTyxtQkFDUEMsS0FBTSxrQkFHS0UsRUFBY0wsRUFBTSxPQUFRLENBQ3ZDRSxNQUFPLE9BQ1BDLEtBQU0sU0FHS0csRUFBc0JOLEVBQU0sT0FBUSxDQUMvQ0UsTUFBTyxxQkFDUEMsS0FBTSxvQkFHS0ksRUFBWVAsRUFBTSxPQUFRLENBQ3JDRSxNQUFPLE9BQ1BDLEtBQU0sU0FHS0ssRUFBb0JSLEVBQU0sT0FBUSxDQUM3Q0UsTUFBTyxPQUNQQyxLQUFNLFlBR0tNLEVBQWNULEVBQU0sT0FBUSxDQUN2Q0UsTUFBTyxRQUNQQyxLQUFNLFVBR0tPLEVBQWFWLEVBQU0sT0FBUSxDQUN0Q0UsTUFBTyxJQUNQQyxLQUFNLE1DbkNLUSxFQUFxQkMsR0FBVyxFQUFFQyxZQUFXQyxPQUFNQyxXQUFVQyxhQUFZQyxPQUFzQkMsS0FFeEcsTUFBTTFCLFFBQUNBLEVBQU9FLFdBQUVBLEdBQWN5QixFQUFXN0Is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
