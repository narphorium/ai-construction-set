import e,{createContext as t,forwardRef as l,useContext as r,useEffect as s,useCallback as o,useRef as a,useState as i}from"react";import{styled as n}from"styled-components";import c from"styled-theming";import{useResizeDetector as d}from"react-resize-detector";class u{uuid;classNames=new Set;iteration;constructor(e){this.uuid=e}getClassNames(e){return Array.from(this.classNames)}}class p extends u{selected=!1;selection_index=null;constructor(e){super(e)}getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selection_index&&t.add("selectable"),e===this.selection_index&&t.add("selected"),Array.from(t)}}class m extends p{name=null;spans=[]}class g extends m{language=null}class b extends p{children=[]}class h extends b{name;collapsed=!0;constructor(e,t){super(e),this.name=t}}class f extends h{}class k extends u{items=[]}class y extends p{uuid;content;constructor(e,t){super(e),this.uuid=e,this.content=t}}class x extends u{name;blocks=[]}const v=t({factory:void 0,setFactory:e=>{}}),E=(e,t)=>l=>{const r=l.selected?"selected":"default";return c(e,t[r])(l)},N=c("mode",{light:"#fff",dark:"#000"}),C=c("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),$=c("mode",{light:"#fff",dark:"#000"}),w=c("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),S=c("mode",{light:"#fff",dark:"#eee"}),A=c("mode",{light:"#222",dark:"#ffde98"}),B=c("mode",{light:"Arial",dark:"Arial"}),T=c("mode",{light:500,dark:400}),_=l((({className:t,list:l,selected:o,onSelected:a,key:i},n)=>{const{factory:c,setFactory:d}=r(v);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:n,className:(()=>{let e=["aics-block-list"];return null!=t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>c?.build(e,l))))})),z=n(_)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${$};
`,L=l((({className:t,stream:l},s)=>{const{factory:o,setFactory:a}=r(v);return e.createElement("div",{ref:s,className:"aics-block-stream"},l.blocks.map(((e,t)=>o?.build(e))))})),j=n(L)`
`,F=l((({className:t,content:l,selected:o,onSelected:a,onClick:i,key:n},c)=>{const{factory:d,setFactory:u}=r(v);s((()=>{void 0!==a&&a(o)}),[o]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-content-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==i&&i(e)}},l.children.map((e=>d?.build(e,l))))})),I=E("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),H=E("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),M=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),P=n(F)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${I};
  background-color: ${H};
  border-color: ${M};
`,R=l((({className:t,section:l,selected:a,onSelected:i,onClick:n,key:c},d)=>{const{factory:u,setFactory:p}=r(v);s((()=>{void 0!==i&&i(a)}),[a]);const m=o((e=>{void 0!==n&&n(e)}),[n]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),e.join(" ")})(),onClick:m},e.createElement("span",null,e.createElement("label",null,l.name?l.name+": ":""),l.spans.map((e=>u?.build(e,l)))))})),Z=E("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),q=E("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),D=c("mode",{light:"#222",dark:"#ffde98"}),G=n(R)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${T} + 200);
  }

  &.selected > span {
    color: ${Z};
    background-color: ${q};
  }

  & > span > label {
    color: ${Z} !important;
  }

  .selected & > span > label {
    color: ${D} !important;
  }
`,J=l((({className:t,span:l,selected:r,onSelected:o,onClick:a,key:i},n)=>{s((()=>{void 0!==o&&o(r)}),[r]);return e.createElement("span",{ref:n,className:(()=>{let e=["aics-content-span"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),r&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==a&&a(e)},dangerouslySetInnerHTML:{__html:l.content}})})),K=E("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),O=E("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),Q=c("mode",{light:"#222",dark:"#ffde98"}),U=n(J)`
  color: ${K};
  background-color: ${O};

  .selected & {
    color: ${Q} !important;
  }

  a {
    color: ${K};
  }
`,V=({svg:t})=>e.createElement("span",{dangerouslySetInnerHTML:{__html:t}}),W=n.div`
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
`,X=n.div`
  position: relative;
  font-size: 11pt;
`,Y=n.button`
  position: absolute;
  top: 0;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${S};
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
    fill: ${S};
  }
`,ee=n.div`
  display: inline-block;
  margin: 2px 0;
  padding-left: 22px;
  font-family: ${B};
  font-size: 11pt;
  user-select: none;
  position: relative;

  &:focus {
    outline: 0;
  }

  & i {
    margin-right: 4px;
  }
`,te=n.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,le=n.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`,re=({className:t,children:l,title:r,collapsed:i,onToggle:n,onTransitionEnd:c})=>{const u=a(null);d({targetRef:u,onResize:()=>{p()}}),s((()=>{p()}),[]),s((()=>{p()}),[i]);const p=o((()=>{if(u.current)if(i){const e=-(u.current.offsetHeight+40);u.current.setAttribute("style","margin-top: "+e+"px")}else u.current.setAttribute("style","margin-top: 0px")}),[u,i]);return e.createElement(W,{className:(()=>{const e=["collapsible-block"];return null!=t&&e.push(t),i&&e.push("collapsed"),e.join(" ")})()},e.createElement(X,{className:"aics-collapsible-block-header"},e.createElement(Y,{className:"aics-collapsible-block-control",onClick:e=>{n?.(i),e.stopPropagation()}},e.createElement(V,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(ee,{className:"aics-collapsible-block-title",onClick:e=>{n?.(i),e.stopPropagation()}},r)),e.createElement(te,{className:"aics-collapsible-block-content"},e.createElement(le,{className:"aics-collapsible-block-inner",ref:u,onTransitionEnd:c},l)))},se=l((({className:t,content:l,collapsed:o,selected:a,onToggle:i,onSelected:n,onTransitionEnd:c,key:d},u)=>{const{factory:p,setFactory:m}=r(v);s((()=>{void 0!==n&&n(a)}),[a]);return e.createElement("div",{ref:u,className:(()=>{let e=["aics-named-block"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{i&&i(!o)}},e.createElement(re,{title:l.name,collapsed:o,onToggle:i,onTransitionEnd:c},l.children.map(((e,t)=>p?.build(e,l)))))})),oe=E("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),ae=E("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),ie=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),ne=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),ce=n(se)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${oe};
    background-color: ${ae};
    border-color: ${ie};

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
`,de=n(ce)`
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
`,ue=l((({sentinal:t,selected:l,onSelected:r,key:o},a)=>(s((()=>{void 0!==r&&r(l)}),[l]),e.createElement("div",{ref:a,className:"aics-sentinal"}))));class pe{block_types=[];builders=[];constructor(){this.registerBuilder(f,this.buildListItem),this.registerBuilder(h,this.buildNamedContent),this.registerBuilder(b,this.buildContent),this.registerBuilder(m,this.buildSection),this.registerBuilder(k,this.buildList),this.registerBuilder(y,this.buildSpan),this.registerBuilder(p,this.buildSelectable),this.registerBuilder(x,this.buildStream)}registerBuilder(e,t){this.block_types.push(e),this.builders.push(t.bind(this))}build(e,t){for(let l=0;l<this.builders.length;l++){const r=this.block_types[l],s=this.builders[l];if(e instanceof r)return s(e,t)}throw new Error("Builder not found for: "+e.constructor.name)}getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}useCollapsed(e){const[t,l]=i(e.collapsed);return{collapsed:t,toggleCollapsed:o((e=>l(!e)),[t])}}buildNamedContent(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(ce,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildListItem(t,l){const{collapsed:r,toggleCollapsed:s}=this.useCollapsed(t),o=a(null);return e.createElement(de,{ref:o,content:t,collapsed:r,onToggle:s,key:t.uuid})}buildContent(t,l){const r=a(null);return e.createElement(P,{ref:r,content:t,key:t.uuid})}buildSection(t,l){const r=a(null);return e.createElement(G,{ref:r,section:t,key:t.uuid})}buildList(t,l){const r=a(null);return e.createElement(z,{ref:r,list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const r=a(null);return e.createElement(U,{ref:r,span:t,key:t.uuid})}buildSelectable(t,l){const r=a(null);return e.createElement(ue,{ref:r,sentinal:t,key:t.uuid})}buildStream(t,l){const r=a(null);return e.createElement(j,{ref:r,stream:t,key:t.uuid})}}export{u as Base,v as BlockFactoryContext,z as BlockList,_ as BlockListComponent,de as BlockListItem,j as BlockStream,L as BlockStreamComponent,g as Code,re as CollapsibleBlock,b as Content,P as ContentBlock,F as ContentBlockComponent,G as ContentSection,U as ContentSpan,pe as DefaultBlockFactory,k as List,f as ListItem,ce as NamedBlock,h as NamedContent,m as Section,p as Selectable,ue as SentinalView,y as Span,x as Stream,N as backgroundColor,$ as borderColor,B as defaultFont,T as fontWeight,C as selectedBackgroundColor,w as selectedBorderColor,A as selectedTextColor,E as selectedVariants,S as textColor};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWpzIiwic291cmNlcyI6WyIuLi9zcmMvZGF0YS9CYXNlLnRzIiwiLi4vc3JjL2RhdGEvU2VsZWN0YWJsZS50cyIsIi4uL3NyYy9kYXRhL1NlY3Rpb24udHMiLCIuLi9zcmMvZGF0YS9Db2RlLnRzIiwiLi4vc3JjL2RhdGEvQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL05hbWVkQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL0xpc3QudHMiLCIuLi9zcmMvZGF0YS9TcGFuLnRzIiwiLi4vc3JjL2RhdGEvU3RyZWFtLnRzIiwiLi4vc3JjL2hvb2tzL0Jsb2NrRmFjdG9yeUNvbnRleHQudHMiLCIuLi9zcmMvY29tcG9uZW50cy90aGVtZS50cyIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrTGlzdC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9CbG9ja1N0cmVhbS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50QmxvY2sudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFNlY3Rpb24udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFNwYW4udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvSWNvbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db2xsYXBzaWJsZUJsb2NrLnRzeCIsIi4uL3NyYy9hc3NldHMvaWNvbnMudHMiLCIuLi9zcmMvY29tcG9uZW50cy9OYW1lZEJsb2NrLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL1NlbnRpbmFsVmlldy50c3giLCIuLi9zcmMvY29tcG9uZW50cy9CbG9ja0ZhY3RvcnkudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sIm5hbWVzIjpbIkJhc2UiLCJ1dWlkIiwiY2xhc3NOYW1lcyIsIlNldCIsIml0ZXJhdGlvbiIsImNvbnN0cnVjdG9yIiwidGhpcyIsImdldENsYXNzTmFtZXMiLCJzZWxlY3RlZF9pbmRleCIsIkFycmF5IiwiZnJvbSIsIlNlbGVjdGFibGUiLCJzZWxlY3RlZCIsInNlbGVjdGlvbl9pbmRleCIsInN1cGVyIiwiYWRkIiwiU2VjdGlvbiIsIm5hbWUiLCJzcGFucyIsIkNvZGUiLCJsYW5ndWFnZSIsIkNvbnRlbnQiLCJjaGlsZHJlbiIsIk5hbWVkQ29udGVudCIsImNvbGxhcHNlZCIsIkxpc3RJdGVtIiwiTGlzdCIsIml0ZW1zIiwiU3BhbiIsImNvbnRlbnQiLCJTdHJlYW0iLCJibG9ja3MiLCJCbG9ja0ZhY3RvcnlDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsImZhY3RvcnkiLCJ1bmRlZmluZWQiLCJzZXRGYWN0b3J5Iiwic2VsZWN0ZWRWYXJpYW50cyIsIm1vZGUiLCJ2YWx1ZXMiLCJwcm9wcyIsInZhcmlhbnQiLCJ0aGVtZSIsImJhY2tncm91bmRDb2xvciIsImxpZ2h0IiwiZGFyayIsInNlbGVjdGVkQmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJzZWxlY3RlZEJvcmRlckNvbG9yIiwidGV4dENvbG9yIiwic2VsZWN0ZWRUZXh0Q29sb3IiLCJkZWZhdWx0Rm9udCIsImZvbnRXZWlnaHQiLCJCbG9ja0xpc3RDb21wb25lbnQiLCJmb3J3YXJkUmVmIiwiY2xhc3NOYW1lIiwibGlzdCIsIm9uU2VsZWN0ZWQiLCJrZXkiLCJyZWYiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NlcyIsInB1c2giLCJpc0FycmF5IiwiY29uY2F0Iiwiam9pbiIsImdldENsYXNzZXMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJidWlsZCIsIkJsb2NrTGlzdCIsInN0eWxlZCIsIkJsb2NrU3RyZWFtQ29tcG9uZW50Iiwic3RyZWFtIiwiYmxvY2siLCJCbG9ja1N0cmVhbSIsIkNvbnRlbnRCbG9ja0NvbXBvbmVudCIsIm9uQ2xpY2siLCJlIiwiY2hpbGQiLCJkZWZhdWx0IiwiQ29udGVudEJsb2NrIiwiQ29udGVudFNlY3Rpb25Db21wb25lbnQiLCJzZWN0aW9uIiwiaGFuZGxlQ2xpY2siLCJ1c2VDYWxsYmFjayIsInNwYW4iLCJzZWxlY3RlZExhYmVsQ29sb3IiLCJDb250ZW50U2VjdGlvbiIsIkNvbnRlbnRTcGFuQ29tcG9uZW50IiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJzcGFuVGV4dENvbG9yIiwic3BhbkJhY2tncm91bmRDb2xvciIsInNlbGVjdGVkQ2hpbGRTcGFuQ29sb3IiLCJDb250ZW50U3BhbiIsIkljb24iLCJzdmciLCJDb2xsYXBzaWJsZUJsb2NrU3R5bGVkIiwiZGl2IiwiQ29sbGFwc2libGVCbG9ja0hlYWRlclN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2tDb250cm9sU3R5bGVkIiwiYnV0dG9uIiwiQ29sbGFwc2libGVCbG9ja1RpdGxlU3R5bGVkIiwiQ29sbGFwc2libGVCbG9ja0NvbnRlbnRTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrSW5uZXJTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrIiwidGl0bGUiLCJvblRvZ2dsZSIsIm9uVHJhbnNpdGlvbkVuZCIsImlubmVyIiwidXNlUmVmIiwidXNlUmVzaXplRGV0ZWN0b3IiLCJ0YXJnZXRSZWYiLCJvblJlc2l6ZSIsInVwZGF0ZUlubmVyIiwiY3VycmVudCIsImgiLCJvZmZzZXRIZWlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJzdG9wUHJvcGFnYXRpb24iLCJOYW1lZEJsb2NrQ29tcG9uZW50IiwiaXRlbUJvcmRlckNvbG9yIiwiTmFtZWRCbG9jayIsIkJsb2NrTGlzdEl0ZW0iLCJTZW50aW5hbFZpZXciLCJzZW50aW5hbCIsIkRlZmF1bHRCbG9ja0ZhY3RvcnkiLCJibG9ja190eXBlcyIsImJ1aWxkZXJzIiwicmVnaXN0ZXJCdWlsZGVyIiwiYnVpbGRMaXN0SXRlbSIsImJ1aWxkTmFtZWRDb250ZW50IiwiYnVpbGRDb250ZW50IiwiYnVpbGRTZWN0aW9uIiwiYnVpbGRMaXN0IiwiYnVpbGRTcGFuIiwiYnVpbGRTZWxlY3RhYmxlIiwiYnVpbGRTdHJlYW0iLCJ0YXJnZXRfY2xhc3MiLCJidWlsZGVyIiwiYmluZCIsInBhcmVudCIsImoiLCJsZW5ndGgiLCJoYW5kbGVyIiwiRXJyb3IiLCJ1c2VDb2xsYXBzZWQiLCJzZXRDb2xsYXBzZWQiLCJ1c2VTdGF0ZSIsInRvZ2dsZUNvbGxhcHNlZCIsImMiXSwibWFwcGluZ3MiOiI0UUFBc0JBLEVBSVFDLEtBSDFCQyxXQUEwQixJQUFJQyxJQUM5QkMsVUFFQSxXQUFBQyxDQUEwQkosR0FBQUssS0FBSUwsS0FBSkEsQ0FBZ0IsQ0FFbkMsYUFBQU0sQ0FBY0MsR0FDakIsT0FBT0MsTUFBTUMsS0FBS0osS0FBS0osV0FDMUIsRUNOQyxNQUFPUyxVQUFtQlgsRUFDckJZLFVBQW9CLEVBQ3BCQyxnQkFBaUMsS0FFeEMsV0FBQVIsQ0FBbUJKLEdBQ2ZhLE1BQU1iLEVBQ1QsQ0FFTSxhQUFBTSxDQUFjQyxHQUNqQixNQUFNTixFQUFhLElBQUlDLElBQUlXLE1BQU1QLGNBQWNDLElBTy9DLE9BTjZCLE9BQXpCRixLQUFLTyxpQkFDTFgsRUFBV2EsSUFBSSxjQUVmUCxJQUFtQkYsS0FBS08saUJBQ3hCWCxFQUFXYSxJQUFJLFlBRVpOLE1BQU1DLEtBQUtSLEVBQ3JCLEVDaEJDLE1BQU9jLFVBQWdCTCxFQUNsQk0sS0FBc0IsS0FDdEJDLE1BQWdCLEdDSHJCLE1BQU9DLFVBQWFILEVBQ2ZJLFNBQTBCLEtDQS9CLE1BQU9DLFVBQWdCVixFQUNwQlcsU0FBbUIsR0NGdEIsTUFBT0MsVUFBcUJGLEVBR0dKLEtBRjFCTyxXQUFxQixFQUU1QixXQUFBbkIsQ0FBWUosRUFBcUJnQixHQUM3QkgsTUFBTWIsR0FEdUJLLEtBQUlXLEtBQUpBLENBRWhDLEVDSkMsTUFBT1EsVUFBaUJGLEdBRXhCLE1BQU9HLFVBQWExQixFQUN0QjJCLE1BQW9CLEdDSmxCLE1BQU9DLFVBQWFqQixFQUNIVixLQUFxQjRCLFFBQXhDLFdBQUF4QixDQUFtQkosRUFBcUI0QixH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
