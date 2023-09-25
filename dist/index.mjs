import e,{createContext as t,forwardRef as l,useContext as r,useEffect as s,useCallback as o,useRef as a,useState as n}from"react";import{styled as c}from"styled-components";import i from"styled-theming";import{useResizeDetector as d}from"react-resize-detector";const u=t({factory:void 0,setFactory:e=>{}}),m=(e,t)=>l=>{const r=l.selected?"selected":"default";return i(e,t[r])(l)},p=i("mode",{light:"#fff",dark:"#000"}),g=i("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),b=i("mode",{light:"#fff",dark:"#000"}),f=i("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),h=i("mode",{light:"#fff",dark:"#eee"}),k=i("mode",{light:"#222",dark:"#ffde98"}),y=i("mode",{light:"Arial",dark:"Arial"}),x=i("mode",{light:500,dark:400}),v=l((({className:t,list:l,selected:o,onSelected:a,key:n},c)=>{const{factory:i,setFactory:d}=r(u);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-block-list"];return null!=t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>i?.build(e,l))))})),E=c(v)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${b};
`,N=l((({className:t,stream:l},s)=>{const{factory:o,setFactory:a}=r(u);return e.createElement("div",{ref:s,className:"aics-block-stream"},l.blocks.map(((e,t)=>o?.build(e))))})),C=c(N)`
`,w=l((({className:t,content:l,selected:o,onSelected:a,onClick:n,key:c},i)=>{const{factory:d,setFactory:m}=r(u);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:i,className:(()=>{let e=["aics-content-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==n&&n(e)}},l.children.map((e=>d?.build(e,l))))})),$=m("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),A=m("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),S=m("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),T=c(w)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${$};
  background-color: ${A};
  border-color: ${S};
`,z=l((({className:t,section:l,selected:a,onSelected:n,onClick:c,key:i},d)=>{const{factory:m,setFactory:p}=r(u);s((()=>{void 0!==n&&n(a)}),[a]);const g=o((e=>{void 0!==c&&c(e)}),[c]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),e.join(" ")})(),onClick:g},e.createElement("span",null,e.createElement("label",null,l.name?l.name+": ":""),l.spans.map((e=>m?.build(e,l)))))})),j=m("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),_=m("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),F=i("mode",{light:"#222",dark:"#ffde98"}),B=c(z)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${x} + 200);
  }

  &.selected > span {
    color: ${j};
    background-color: ${_};
  }

  & > span > label {
    color: ${j} !important;
  }

  .selected & > span > label {
    color: ${F} !important;
  }
`,L=l((({className:t,span:l,selected:r,onSelected:o,onClick:a,key:n},c)=>{s((()=>{void 0!==o&&o(r)}),[r]);return e.createElement("span",{ref:c,className:(()=>{let e=["aics-content-span"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),r&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==a&&a(e)},dangerouslySetInnerHTML:{__html:l.content}})})),H=m("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),I=m("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),M=i("mode",{light:"#222",dark:"#ffde98"}),P=c(L)`
  color: ${H};
  background-color: ${I};

  .selected & {
    color: ${M} !important;
  }

  a {
    color: ${H};
  }
`,R=({svg:t})=>e.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),O=c.div`
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
`,W=c.div`
  position: relative;
  font-size: 11pt;
`,Z=c.button`
  position: absolute;
  top: 0;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${h};
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
    fill: ${h};
  }
`,q=c.div`
  display: inline-block;
  margin: 2px 0;
  padding-left: 22px;
  font-family: ${y};
  font-size: 11pt;
  user-select: none;
  position: relative;

  &:focus {
    outline: 0;
  }

  & i {
    margin-right: 4px;
  }
`,D=c.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,G=c.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`,J=({className:t,children:l,title:r,collapsed:n,onToggle:c,onTransitionEnd:i})=>{const u=a(null);d({targetRef:u,onResize:()=>{m()}}),s((()=>{m()}),[]),s((()=>{m()}),[n]);const m=o((()=>{if(u.current)if(n){const e=-(u.current.offsetHeight+40);u.current.setAttribute("style","margin-top: "+e+"px")}else u.current.setAttribute("style","margin-top: 0px")}),[u,n]);return e.createElement(O,{className:(()=>{const e=["collapsible-block"];return null!=t&&e.push(t),n&&e.push("collapsed"),e.join(" ")})()},e.createElement(W,{className:"aics-collapsible-block-header"},e.createElement(Z,{className:"aics-collapsible-block-control",onClick:e=>{c?.(n),e.stopPropagation()}},e.createElement(R,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(q,{className:"aics-collapsible-block-title",onClick:e=>{c?.(n),e.stopPropagation()}},r)),e.createElement(D,{className:"aics-collapsible-block-content"},e.createElement(G,{className:"aics-collapsible-block-inner",ref:u,onTransitionEnd:i},l)))},K=l((({className:t,content:l,collapsed:o,selected:a,onToggle:n,onSelected:c,onTransitionEnd:i,key:d},m)=>{const{factory:p,setFactory:g}=r(u);s((()=>{void 0!==c&&c(a)}),[a]);return e.createElement("div",{ref:m,className:(()=>{let e=["aics-named-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{n&&n(!o)}},e.createElement(J,{title:l.name,collapsed:o,onToggle:n,onTransitionEnd:i},l.children.map(((e,t)=>p?.build(e,l)))))})),Q=m("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),U=m("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),V=m("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),X=m("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),Y=c(K)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${Q};
    background-color: ${U};
    border-color: ${V};

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
`,ee=c(Y)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${X};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`,te=l((({sentinal:t,selected:l,onSelected:r,key:o},a)=>(s((()=>{void 0!==r&&r(l)}),[l]),e.createElement("div",{ref:a,className:"aics-sentinal"}))));class le{builders=new Map;constructor(){Object.keys(this).forEach((e=>{if(e.startsWith("build")){const t=this[e];"function"==typeof t&&this.registerBuilder(e.substring(5),t)}}))}registerBuilder(e,t){this.builders.set(e,t)}getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}useCollapsed(e){const[t,l]=n(e.collapsed);return{collapsed:t,toggleCollapsed:o((e=>l(!e)),[t])}}buildNamedContent(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(Y,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildListItem(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(ee,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildContent(t,l){const r=a(null);return e.createElement(T,{ref:r,content:t,key:t.uuid})}buildSection(t,l){const r=a(null);return e.createElement(B,{ref:r,section:t,key:t.uuid})}buildList(t,l){const r=a(null);return e.createElement(E,{ref:r,list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const r=a(null);return e.createElement(P,{ref:r,span:t,key:t.uuid})}buildSelectable(t,l){const r=a(null);return e.createElement(te,{ref:r,sentinal:t,key:t.uuid})}buildStream(t,l){const r=a(null);return e.createElement(C,{ref:r,stream:t,key:t.uuid})}build(e,t){if(this.builders.has(e.constructor.name)){const l=this.builders.get(e.constructor.name);if(l)return l(e,t);throw new Error("Builder not found for class: "+e.constructor.name)}throw new Error("Builder not found for class: "+e.constructor.name)}}class re{uuid;classNames=new Set;iteration;constructor(e){this.uuid=e}getClassNames(e){return Array.from(this.classNames)}}class se extends re{selected=!1;selection_index=null;constructor(e){super(e)}getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selection_index&&t.add("selectable"),e===this.selection_index&&t.add("selected"),Array.from(t)}}class oe extends se{name=null;spans=[]}class ae extends oe{language=null}class ne extends se{children=[]}class ce extends ne{name;collapsed=!0;constructor(e,t){super(e),this.name=t}}class ie extends ce{}class de extends re{items=[]}class ue extends se{uuid;content;constructor(e,t){super(e),this.uuid=e,this.content=t}}class me extends re{name;blocks=[]}export{re as Base,u as BlockFactoryContext,E as BlockList,v as BlockListComponent,ee as BlockListItem,C as BlockStream,N as BlockStreamComponent,ae as Code,J as CollapsibleBlock,ne as Content,T as ContentBlock,w as ContentBlockComponent,B as ContentSection,P as ContentSpan,le as DefaultBlockFactory,de as List,ie as ListItem,Y as NamedBlock,ce as NamedContent,oe as Section,se as Selectable,te as SentinalView,ue as Span,me as Stream,p as backgroundColor,b as borderColor,y as defaultFont,x as fontWeight,g as selectedBackgroundColor,f as selectedBorderColor,k as selectedTextColor,m as selectedVariants,h as textColor};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWpzIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MvQmxvY2tGYWN0b3J5Q29udGV4dC50cyIsIi4uL3NyYy9jb21wb25lbnRzL3RoZW1lLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvQmxvY2tMaXN0LnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrU3RyZWFtLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0NvbnRlbnRCbG9jay50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50U2VjdGlvbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50U3Bhbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9JY29uLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0NvbGxhcHNpYmxlQmxvY2sudHN4IiwiLi4vc3JjL2Fzc2V0cy9pY29ucy50cyIsIi4uL3NyYy9jb21wb25lbnRzL05hbWVkQmxvY2sudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvU2VudGluYWxWaWV3LnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrRmFjdG9yeS50c3giLCIuLi9zcmMvZGF0YS9CYXNlLnRzIiwiLi4vc3JjL2RhdGEvU2VsZWN0YWJsZS50cyIsIi4uL3NyYy9kYXRhL1NlY3Rpb24udHMiLCIuLi9zcmMvZGF0YS9Db2RlLnRzIiwiLi4vc3JjL2RhdGEvQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL05hbWVkQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL0xpc3QudHMiLCIuLi9zcmMvZGF0YS9TcGFuLnRzIiwiLi4vc3JjL2RhdGEvU3RyZWFtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sIm5hbWVzIjpbIkJsb2NrRmFjdG9yeUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiZmFjdG9yeSIsInVuZGVmaW5lZCIsInNldEZhY3RvcnkiLCJzZWxlY3RlZFZhcmlhbnRzIiwibW9kZSIsInZhbHVlcyIsInByb3BzIiwidmFyaWFudCIsInRoZW1lIiwiYmFja2dyb3VuZENvbG9yIiwibGlnaHQiLCJkYXJrIiwic2VsZWN0ZWRCYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsInNlbGVjdGVkQm9yZGVyQ29sb3IiLCJ0ZXh0Q29sb3IiLCJzZWxlY3RlZFRleHRDb2xvciIsImRlZmF1bHRGb250IiwiZm9udFdlaWdodCIsIkJsb2NrTGlzdENvbXBvbmVudCIsImZvcndhcmRSZWYiLCJjbGFzc05hbWUiLCJsaXN0Iiwic2VsZWN0ZWQiLCJvblNlbGVjdGVkIiwia2V5IiwicmVmIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzZXMiLCJwdXNoIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uY2F0Iiwiam9pbiIsImdldENsYXNzZXMiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImJ1aWxkIiwiQmxvY2tMaXN0Iiwic3R5bGVkIiwiQmxvY2tTdHJlYW1Db21wb25lbnQiLCJzdHJlYW0iLCJibG9ja3MiLCJibG9jayIsIkJsb2NrU3RyZWFtIiwiQ29udGVudEJsb2NrQ29tcG9uZW50IiwiY29udGVudCIsIm9uQ2xpY2siLCJlIiwiY2hpbGRyZW4iLCJjaGlsZCIsImRlZmF1bHQiLCJDb250ZW50QmxvY2siLCJDb250ZW50U2VjdGlvbkNvbXBvbmVudCIsInNlY3Rpb24iLCJoYW5kbGVDbGljayIsInVzZUNhbGxiYWNrIiwibmFtZSIsInNwYW5zIiwic3BhbiIsInNlbGVjdGVkTGFiZWxDb2xvciIsIkNvbnRlbnRTZWN0aW9uIiwiQ29udGVudFNwYW5Db21wb25lbnQiLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsIl9faHRtbCIsInNwYW5UZXh0Q29sb3IiLCJzcGFuQmFja2dyb3VuZENvbG9yIiwic2VsZWN0ZWRDaGlsZFNwYW5Db2xvciIsIkNvbnRlbnRTcGFuIiwiSWNvbiIsInN2ZyIsIkNvbGxhcHNpYmxlQmxvY2tTdHlsZWQiLCJkaXYiLCJDb2xsYXBzaWJsZUJsb2NrSGVhZGVyU3R5bGVkIiwiQ29sbGFwc2libGVCbG9ja0NvbnRyb2xTdHlsZWQiLCJidXR0b24iLCJDb2xsYXBzaWJsZUJsb2NrVGl0bGVTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrQ29udGVudFN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2tJbm5lclN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2siLCJ0aXRsZSIsImNvbGxhcHNlZCIsIm9uVG9nZ2xlIiwib25UcmFuc2l0aW9uRW5kIiwiaW5uZXIiLCJ1c2VSZWYiLCJ1c2VSZXNpemVEZXRlY3RvciIsInRhcmdldFJlZiIsIm9uUmVzaXplIiwidXBkYXRlSW5uZXIiLCJjdXJyZW50IiwiaCIsIm9mZnNldEhlaWdodCIsInNldEF0dHJpYnV0ZSIsInN0b3BQcm9wYWdhdGlvbiIsIk5hbWVkQmxvY2tDb21wb25lbnQiLCJpdGVtQm9yZGVyQ29sb3IiLCJOYW1lZEJsb2NrIiwiQmxvY2tMaXN0SXRlbSIsIlNlbnRpbmFsVmlldyIsInNlbnRpbmFsIiwiRGVmYXVsdEJsb2NrRmFjdG9yeSIsImJ1aWxkZXJzIiwiTWFwIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJrZXlzIiwidGhpcyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwibWV0aG9kIiwicmVnaXN0ZXJCdWlsZGVyIiwic3Vic3RyaW5nIiwidGFyZ2V0X2NsYXNzIiwiYnVpbGRlciIsInNldCIsImdldENsYXNzTmFtZXMiLCJzZWxlY3RlZF9pbmRleCIsImNsYXNzTmFtZXMiLCJTZXQiLCJmcm9tIiwidXNlQ29sbGFwc2VkIiwic2V0Q29sbGFwc2VkIiwidXNlU3RhdGUiLCJ0b2dnbGVDb2xsYXBzZWQiLCJjIiwiYnVpbGROYW1lZENvbnRlbnQiLCJwYXJlbnQiLCJ1dWlkIiwiYnVpbGRMaXN0SXRlbSIsImJ1aWxkQ29udGVudCIsImJ1aWxkU2VjdGlvbiIsImJ1aWxkTGlzdCIsImJ1aWxkU3BhbiIsImJ1aWxkU2VsZWN0YWJsZSIsImJ1aWxkU3RyZWFtIiwiaGFzIiwiZ2V0IiwiRXJyb3IiLCJCYXNlIiwiaXRlcmF0aW9uIiwiU2VsZWN0YWJsZSIsInNlbGVjdGlvbl9pbmRleCIsInN1cGVyIiwiYWRkIiwiU2VjdGlvbiIsIkNvZGUiLCJsYW5ndWFnZSIsIkNvbnRlbnQiLCJOYW1lZENvbnRlbnQiLCJMaXN0SXRlbSIsIkxpc3QiLCJTcGFuIiwiU3RyZWFtIl0sIm1hcHBpbmdzIjoic1FBU08sTUFBTUEsRUFBc0JDLEVBQWlDLENBQ2hFQyxhQUFTQyxFQUNUQyxXQUFhRixJQUFELElDTkhHLEVBQW1CLENBQUNDLEVBQWNDLElBQ3JDQyxJQUNOLE1BQU1DLEVBQVVELEVBQWdCLFNBQUksV0FBYSxVQUNqRCxPQUFPRSxFQUFNSixFQUFNQyxFQUFPRSxHQUFuQkMsQ0FBNkJGLEVBQU0sRUFLakNHLEVBQWtCRCxFQUFNLE9BQVEsQ0FDM0NFLE1BQU8sT0FDUEMsS0FBTSxTQUdLQyxFQUEwQkosRUFBTSxPQUFRLENBQ25ERSxNQUFPLG1CQUNQQyxLQUFNLGtCQUdLRSxFQUFjTCxFQUFNLE9BQVEsQ0FDdkNFLE1BQU8sT0FDUEMsS0FBTSxTQUdLRyxFQUFzQk4sRUFBTSxPQUFRLENBQy9DRSxNQUFPLHFCQUNQQyxLQUFNLG9CQUdLSSxFQUFZUCxFQUFNLE9BQVEsQ0FDckNFLE1BQU8sT0FDUEMsS0FBTSxTQUdLSyxFQUFvQlIsRUFBTSxPQUFRLENBQzdDRSxNQUFPLE9BQ1BDLEtBQU0sWUFHS00sRUFBY1QsRUFBTSxPQUFRLENBQ3ZDRSxNQUFPLFFBQ1BDLEtBQU0sVUFHS08sRUFBYVYsRUFBTSxPQUFRLENBQ3RDRSxNQUFPLElBQ1BDLEtBQU0sTUNuQ0tRLEVBQXFCQyxHQUFXLEVBQUVDLFlBQVdDLE9BQU1DLFdBQVVDLGFBQVlDLE9BQXNCQyxLQUV4RyxNQUFNMUIsUUFBQ0EsRUFBT0UsV0FBRUEsR0FBY3lCLEVBQVc3QixHQUV6QzhCLEdBQVUsVUFDYTNCLElBQWZ1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
