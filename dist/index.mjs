import e,{createContext as t,forwardRef as l,useContext as r,useEffect as s,useCallback as o,useRef as i,useState as n}from"react";import{styled as a}from"styled-components";import c from"styled-theming";import{useResizeDetector as d}from"react-resize-detector";class u{uuid;classNames=new Set;iteration;constructor(e){this.uuid=e}getClassNames(e){return Array.from(this.classNames)}}class m extends u{selected=!1;selectionIndex=null;constructor(e){super(e)}getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selectionIndex&&t.add("selectable"),e===this.selectionIndex&&t.add("selected"),Array.from(t)}}class p extends m{name=null;spans=[]}class b extends p{language=null}class g extends m{children=[]}class h extends g{name;collapsed=!0;constructor(e,t){super(e),this.name=t}}class f extends h{}class k extends u{items=[]}class y extends m{uuid;content;constructor(e,t){super(e),this.uuid=e,this.content=t}}class x extends u{name;parent;blocks=[]}const v=t({factory:void 0,setFactory:e=>{}}),E=(e,t)=>l=>{const r=!0===l.selected?"selected":"default";return c(e,t[r])(l)},N=c("mode",{light:"#fff",dark:"#000"}),A=c("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),C=c("mode",{light:"#fff",dark:"#000"}),S=c("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),$=c("mode",{light:"#fff",dark:"#eee"}),w=c("mode",{light:"#222",dark:"#ffde98"}),B=c("mode",{light:"Arial",dark:"Arial"}),T=c("mode",{light:500,dark:400}),z=l((function({className:t,list:l,selected:o,onSelected:i,key:n},a){const{factory:c}=r(v);s((()=>{void 0!==i&&i(o)}),[o,i]);return e.createElement("div",{ref:a,className:(()=>{let e=["aics-block-list"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===o&&e.push("selected"),e.join(" ")})()},l.items.map(((e,t)=>c?.build(e,l))))})),j=a(z)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${C};
`,I=l((function({className:t,stream:l,key:s},o){const{factory:i}=r(v);return e.createElement("div",{ref:o,className:(()=>{let e=["aics-block-stream"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),e.join(" ")})()},l.blocks.map((e=>i?.build(e))))})),L=a(I)`
`,_=l((function({className:t,content:l,selected:o,onSelected:i,onClick:n,key:a},c){const{factory:d}=r(v);s((()=>{void 0!==i&&i(o)}),[o,i]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-content-block"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==n&&n(e)}},l.children.map((e=>d?.build(e,l))))})),H=E("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),M=E("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),P=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),R=a(_)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${H};
  background-color: ${M};
  border-color: ${P};
`,F=l((function({className:t,section:l,selected:i,onSelected:n,onClick:a,key:c},d){const{factory:u}=r(v);s((()=>{void 0!==n&&n(i)}),[i,n]);const m=o((e=>{void 0!==a&&a(e)}),[a]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===i&&e.push("selected"),e.join(" ")})(),onClick:m},e.createElement("span",null,e.createElement("label",null,null!==l.name?l.name+": ":""),l.spans.map((e=>u?.build(e,l)))))})),Z=E("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),q=E("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),D=c("mode",{light:"#222",dark:"#ffde98"}),G=a(F)`
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
`,J=l((function({className:t,span:l,selected:r,onSelected:o,onClick:i,key:n},a){s((()=>{void 0!==o&&o(r)}),[r,o]);return e.createElement("span",{ref:a,className:(()=>{let e=["aics-content-span"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===r&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==i&&i(e)},dangerouslySetInnerHTML:{__html:l.content}})})),K=E("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),O=E("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),Q=c("mode",{light:"#222",dark:"#ffde98"}),U=a(J)`
  color: ${K};
  background-color: ${O};

  .selected & {
    color: ${Q} !important;
  }

  a {
    color: ${K};
  }
`,V=function({svg:t}){return e.createElement("span",{dangerouslySetInnerHTML:{__html:t}})},W=a.div`
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
`,X=a.div`
  position: relative;
  font-size: 11pt;
`,Y=a.button`
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
`,ee=a.div`
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
`,te=a.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`,le=a.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`,re=function({className:t,children:l,title:r,collapsed:n,onToggle:a,onTransitionEnd:c}){const u=i(null),m=o((()=>{if(null!=u.current)if(!0===n){const e=-(u.current.offsetHeight+40);u.current.setAttribute("style","margin-top: "+e+"px")}else u.current.setAttribute("style","margin-top: 0px")}),[u,n]);d({targetRef:u,onResize:()=>{m()}}),s((()=>{m()}),[]),s((()=>{m()}),[n,m]);return e.createElement(W,{className:(()=>{const e=["collapsible-block"];return void 0!==t&&e.push(t),!0===n&&e.push("collapsed"),e.join(" ")})()},e.createElement(X,{className:"aics-collapsible-block-header"},e.createElement(Y,{className:"aics-collapsible-block-control",onClick:e=>{a?.(n),e.stopPropagation()}},e.createElement(V,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(ee,{className:"aics-collapsible-block-title",onClick:e=>{a?.(n),e.stopPropagation()}},r)),e.createElement(te,{className:"aics-collapsible-block-content"},e.createElement(le,{className:"aics-collapsible-block-inner",ref:u,onTransitionEnd:c},l)))},se=l((function({className:t,content:l,collapsed:o,selected:i,onToggle:n,onSelected:a,onTransitionEnd:c,key:d},u){const{factory:m}=r(v);s((()=>{void 0!==a&&a(i)}),[i,a]);return e.createElement("div",{ref:u,className:(()=>{let e=["aics-named-block"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===i&&e.push("selected"),!0===o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{void 0!==n&&void 0!==o&&n(!o)}},e.createElement(re,{title:l.name,collapsed:o,onToggle:n,onTransitionEnd:c},l.children.map(((e,t)=>m?.build(e,l)))))})),oe=E("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),ie=E("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),ne=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),ae=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),ce=a(se)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${oe};
    background-color: ${ie};
    border-color: ${ne};

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
`,de=a(ce)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${ae};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`,ue=l((function({sentinal:t,selected:l,onSelected:r,key:o},i){return s((()=>{void 0!==r&&r(l)}),[l,r]),e.createElement("div",{ref:i,className:"aics-sentinal"})})),me=(t,l)=>function(r){const[s,o]=n(l.collapsed);return e.createElement(t,{collapsed:s,onToggle:e=>{o(!e)},...r})},pe=(t,l)=>function(r){const s=i(null),[o,a]=n(l.selected);return e.createElement(t,{ref:s,selected:o,onSelected:e=>{a(e)},...r})};class be{block_types=[];builders=[];constructor(){this.registerBuilder(f,this.buildListItem),this.registerBuilder(h,this.buildNamedContent),this.registerBuilder(g,this.buildContent),this.registerBuilder(p,this.buildSection),this.registerBuilder(k,this.buildList),this.registerBuilder(y,this.buildSpan),this.registerBuilder(m,this.buildSelectable),this.registerBuilder(x,this.buildStream)}registerBuilder(e,t){this.block_types.push(e),this.builders.push(t.bind(this))}build(e,t){for(let l=0;l<this.builders.length;l++){const r=this.block_types[l],s=this.builders[l];if(e.constructor.name===r.name)return s(e,t)}throw new Error("Builder not found for: "+e.constructor.name)}getClassNames(e,t){const l=new Set(Array.from(e.classNames));return Array.from(l)}buildNamedContent(t,l){const r=me(ce,{collapsed:t.collapsed}),s=pe(r,{selected:t.selected});return e.createElement(s,{content:t,key:t.uuid})}buildListItem(t,l){const r=me(de,{collapsed:t.collapsed}),s=pe(r,{selected:t.selected});return e.createElement(s,{content:t,key:t.uuid})}buildContent(t,l){const r=pe(R,{selected:t.selected});return e.createElement(r,{content:t,key:t.uuid})}buildSection(t,l){const r=pe(G,{selected:t.selected});return e.createElement(r,{section:t,key:t.uuid})}buildList(t,l){const r=pe(j,{selected:!1});return e.createElement(r,{list:t,selected:!1,key:t.uuid})}buildSpan(t,l){const r=pe(U,{selected:t.selected});return e.createElement(r,{span:t,key:t.uuid})}buildSelectable(t,l){const r=pe(ue,{selected:t.selected});return e.createElement(r,{sentinal:t,key:t.uuid})}buildStream(t,l){const r=pe(L,{selected:!1});return e.createElement(r,{stream:t,key:t.uuid})}}export{u as Base,v as BlockFactoryContext,j as BlockList,z as BlockListComponent,de as BlockListItem,L as BlockStream,I as BlockStreamComponent,b as Code,re as CollapsibleBlock,g as Content,R as ContentBlock,_ as ContentBlockComponent,G as ContentSection,U as ContentSpan,be as DefaultBlockFactory,V as Icon,k as List,f as ListItem,ce as NamedBlock,h as NamedContent,p as Section,m as Selectable,ue as SentinalView,y as Span,x as Stream,N as backgroundColor,C as borderColor,B as defaultFont,T as fontWeight,A as selectedBackgroundColor,S as selectedBorderColor,w as selectedTextColor,E as selectedVariants,$ as textColor,me as withCollapsible,pe as withSelectable};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWpzIiwic291cmNlcyI6WyIuLi9zcmMvZGF0YS9CYXNlLnRzIiwiLi4vc3JjL2RhdGEvU2VsZWN0YWJsZS50cyIsIi4uL3NyYy9kYXRhL1NlY3Rpb24udHMiLCIuLi9zcmMvZGF0YS9Db2RlLnRzIiwiLi4vc3JjL2RhdGEvQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL05hbWVkQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL0xpc3QudHMiLCIuLi9zcmMvZGF0YS9TcGFuLnRzIiwiLi4vc3JjL2RhdGEvU3RyZWFtLnRzIiwiLi4vc3JjL2hvb2tzL0Jsb2NrRmFjdG9yeUNvbnRleHQudHMiLCIuLi9zcmMvY29tcG9uZW50cy90aGVtZS50cyIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrTGlzdC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9CbG9ja1N0cmVhbS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50QmxvY2sudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFNlY3Rpb24udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFNwYW4udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvSWNvbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db2xsYXBzaWJsZUJsb2NrLnRzeCIsIi4uL3NyYy9hc3NldHMvaWNvbnMudHMiLCIuLi9zcmMvY29tcG9uZW50cy9OYW1lZEJsb2NrLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL1NlbnRpbmFsVmlldy50c3giLCIuLi9zcmMvY29tcG9uZW50cy93aXRoQ29sbGFwc2libGUudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvd2l0aFNlbGVjdGFibGUudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQmxvY2tGYWN0b3J5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiQmFzZSIsInV1aWQiLCJjbGFzc05hbWVzIiwiU2V0IiwiaXRlcmF0aW9uIiwiY29uc3RydWN0b3IiLCJ0aGlzIiwiZ2V0Q2xhc3NOYW1lcyIsInNlbGVjdGVkSW5kZXgiLCJBcnJheSIsImZyb20iLCJTZWxlY3RhYmxlIiwic2VsZWN0ZWQiLCJzZWxlY3Rpb25JbmRleCIsInN1cGVyIiwiYWRkIiwiU2VjdGlvbiIsIm5hbWUiLCJzcGFucyIsIkNvZGUiLCJsYW5ndWFnZSIsIkNvbnRlbnQiLCJjaGlsZHJlbiIsIk5hbWVkQ29udGVudCIsImNvbGxhcHNlZCIsIkxpc3RJdGVtIiwiTGlzdCIsIml0ZW1zIiwiU3BhbiIsImNvbnRlbnQiLCJTdHJlYW0iLCJwYXJlbnQiLCJibG9ja3MiLCJCbG9ja0ZhY3RvcnlDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsImZhY3RvcnkiLCJ1bmRlZmluZWQiLCJzZXRGYWN0b3J5Iiwic2VsZWN0ZWRWYXJpYW50cyIsIm1vZGUiLCJ2YWx1ZXMiLCJwcm9wcyIsInZhcmlhbnQiLCJ0aGVtZSIsImJhY2tncm91bmRDb2xvciIsImxpZ2h0IiwiZGFyayIsInNlbGVjdGVkQmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJzZWxlY3RlZEJvcmRlckNvbG9yIiwidGV4dENvbG9yIiwic2VsZWN0ZWRUZXh0Q29sb3IiLCJkZWZhdWx0Rm9udCIsImZvbnRXZWlnaHQiLCJCbG9ja0xpc3RDb21wb25lbnQiLCJmb3J3YXJkUmVmIiwiY2xhc3NOYW1lIiwibGlzdCIsIm9uU2VsZWN0ZWQiLCJrZXkiLCJyZWYiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NlcyIsInB1c2giLCJpc0FycmF5IiwiY29uY2F0Iiwiam9pbiIsImdldENsYXNzZXMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJidWlsZCIsIkJsb2NrTGlzdCIsInN0eWxlZCIsIkJsb2NrU3RyZWFtQ29tcG9uZW50Iiwic3RyZWFtIiwiYmxvY2siLCJCbG9ja1N0cmVhbSIsIkNvbnRlbnRCbG9ja0NvbXBvbmVudCIsIm9uQ2xpY2siLCJlIiwiY2hpbGQiLCJkZWZhdWx0IiwiQ29udGVudEJsb2NrIiwiQ29udGVudFNlY3Rpb25Db21wb25lbnQiLCJzZWN0aW9uIiwiaGFuZGxlQ2xpY2siLCJ1c2VDYWxsYmFjayIsInNwYW4iLCJzZWxlY3RlZExhYmVsQ29sb3IiLCJDb250ZW50U2VjdGlvbiIsIkNvbnRlbnRTcGFuQ29tcG9uZW50IiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJzcGFuVGV4dENvbG9yIiwic3BhbkJhY2tncm91bmRDb2xvciIsInNlbGVjdGVkQ2hpbGRTcGFuQ29sb3IiLCJDb250ZW50U3BhbiIsIkljb24iLCJzdmciLCJDb2xsYXBzaWJsZUJsb2NrU3R5bGVkIiwiZGl2IiwiQ29sbGFwc2libGVCbG9ja0hlYWRlclN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2tDb250cm9sU3R5bGVkIiwiYnV0dG9uIiwiQ29sbGFwc2libGVCbG9ja1RpdGxlU3R5bGVkIiwiQ29sbGFwc2libGVCbG9ja0NvbnRlbnRTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrSW5uZXJTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrIiwidGl0bGUiLCJvblRvZ2dsZSIsIm9uVHJhbnNpdGlvbkVuZCIsImlubmVyIiwidXNlUmVmIiwidXBkYXRlSW5uZXIiLCJjdXJyZW50IiwiaCIsIm9mZnNldEhlaWdodCIsInNldEF0dHJpYnV0ZSIsInVzZVJlc2l6ZURldGVjdG9yIiwidGFyZ2V0UmVmIiwib25SZXNpemUiLCJzdG9wUHJvcGFnYXRpb24iLCJOYW1lZEJsb2NrQ29tcG9uZW50IiwiaXRlbUJvcmRlckNvbG9yIiwiTmFtZWRCbG9jayIsIkJsb2NrTGlzdEl0ZW0iLCJTZW50aW5hbFZpZXciLCJzZW50aW5hbCIsIndpdGhDb2xsYXBzaWJsZSIsIkNvbXBvbmVudCIsInBhcmFtcyIsInNldENvbGxhcHNlZCIsInVzZVN0YXRlIiwiYyIsIndpdGhTZWxlY3RhYmxlIiwic2V0U2VsZWN0ZWQiLCJzIiwiRGVmYXVsdEJsb2NrRmFjdG9yeSIsImJsb2NrX3R5cGVzIiwiYnVpbGRlcnMiLCJyZWdpc3RlckJ1aWxkZXIiLCJidWlsZExpc3RJdGVtIiwiYnVpbGROYW1lZENvbnRlbnQiLCJidWlsZENvbnRlbnQiLCJidWlsZFNlY3Rpb24iLCJidWlsZExpc3QiLCJidWlsZFNwYW4iLCJidWlsZFNlbGVjdGFibGUiLCJidWlsZFN0cmVhbSIsInRhcmdldENsYXNzIiwiYnVpbGRlciIsImJpbmQiLCJqIiwibGVuZ3RoIiwiaGFuZGxlciIsIkVycm9yIiwiTmFtZWRCbG9ja1dpdGhDb2xsYXBzaWJsZSIsIk5hbWVkQmxvY2tXaXRoUmVmIiwiTGlzdEl0ZW1XaXRoQ29sbGFwc2libGUiLCJCbG9ja0xpc3RJdGVtV2l0aFJlZiIsIkNvbnRlbnRCbG9ja1dpdGhSZWYiLCJDb250ZW50U2VjdGlvbldpdGhSZWYiLCJCbG9ja0xpc3RXaXRoUmVmIiwiQ29udGVudFNwYW5XaXRoUmVmIiwiU2VudGluYWxXaXRoUmVmIiwiQmxvY2tTdHJlYW1XaXRoUmVmIl0sIm1hcHBpbmdzIjoiNFFBQXNCQSxFQUlPQyxLQUgzQkMsV0FBYSxJQUFJQyxJQUNqQkMsVUFFQSxXQUFBQyxDQUEyQkosR0FBQUssS0FBSUwsS0FBSkEsQ0FBZ0IsQ0FFcEMsYUFBQU0sQ0FBZUMsR0FDcEIsT0FBT0MsTUFBTUMsS0FBS0osS0FBS0osV0FDeEIsRUNORyxNQUFPUyxVQUFtQlgsRUFDdkJZLFVBQW9CLEVBQ3BCQyxlQUFnQyxLQUV2QyxXQUFBUixDQUFvQkosR0FDbEJhLE1BQU1iLEVBQ1AsQ0FFTSxhQUFBTSxDQUFlQyxHQUNwQixNQUFNTixFQUFhLElBQUlDLElBQUlXLE1BQU1QLGNBQWNDLElBTy9DLE9BTjRCLE9BQXhCRixLQUFLTyxnQkFDUFgsRUFBV2EsSUFBSSxjQUViUCxJQUFrQkYsS0FBS08sZ0JBQ3pCWCxFQUFXYSxJQUFJLFlBRVZOLE1BQU1DLEtBQUtSLEVBQ25CLEVDaEJHLE1BQU9jLFVBQWdCTCxFQUNwQk0sS0FBc0IsS0FDdEJDLE1BQWdCLEdDSG5CLE1BQU9DLFVBQWFILEVBQ2pCSSxTQUEwQixLQ0E3QixNQUFPQyxVQUFnQlYsRUFDcEJXLFNBQW1CLEdDRnRCLE1BQU9DLFVBQXFCRixFQUdFSixLQUYzQk8sV0FBcUIsRUFFNUIsV0FBQW5CLENBQWFKLEVBQXFCZ0IsR0FDaENILE1BQU1iLEdBRDBCSyxLQUFJVyxLQUFKQSxDQUVqQyxFQ0pHLE1BQU9RLFVBQWlCRixHQUV4QixNQUFPRyxVQUFhMUIsRUFDeEIyQixNQUFvQixHQ0poQixNQUFPQyxVQUFhakIsRUFDSlYsS0FBcUI0QixRQUF6QyxXQUFBeEIsQ0FBb0JKLEVBQXFCNEIsR0FDdkNmLE1BQU1iLEdBRFlLLEtBQUlMLEtBQUpBLEVBQXFCSyxLQUFPdUIsUUFBUEEsQ0FFeEMsRUNIRyxNQUFPQyxVQUFlOUIsRUFDbkJpQixLQUNBYyxPQUNBQyxPQUFpQixHQ0duQixNQUFNQyxFQUFzQkMsRUFBaUMsQ0FDbEVDLGFBQVNDLEVBQ1RDLFdBQWFGLElBQUQsSUNOREcsRUFBbUIsQ0FBQ0MsRUFBY0MsSUFDckNDLElBQ04sTUFBTUMsR0FBNkIsSUFBbkJELEVBQU03QixTQUFvQixXQUFhLFVBQ3ZELE9BQU8rQixFQUFNSixFQUFNQyxFQUFPRSxHQUFuQkMsQ0FBNkJGLEVBQU0sRUFJakNHLEVBQWtCRCxFQUFNLE9BQVEsQ0FDM0NFLE1BQU8sT0FDUEMsS0FBTSxTQUdLQyxFQUEwQkosRUFBTSxPQUFRLENBQ25ERSxNQUFPLG1CQUNQQyxLQUFNLGtCQUdLRSxFQUFjTCxFQUFNLE9BQVEsQ0FDdkNFLE1BQU8sT0FDUEMsS0FBTSxTQUdLRyxFQUFzQk4sRUFBTSxPQUFRLENBQy9DRSxNQUFPLHFCQUNQQyxLQUFNLG9CQUdLSSxFQUFZUCxFQUFNLE9BQVEsQ0FDckNFLE1BQU8sT0FDUEMsS0FBTSxTQUdLSyxFQUFvQlIsRUFBTSxPQUFRLENBQzdDRSxNQUFPLE9BQ1BDLEtBQU0sWUFHS00sRUFBY1QsRUFBTSxPQUFRLENBQ3ZDRSxNQUFPLFFBQ1BDLEtBQU0sVUFHS08sRUFBYVYsRUFBTSxPQUFRLENBQ3RDRSxNQUFPLElBQ1BDLEtBQU0sTUNsQ0tRLEVBQXFCQyxHQUFXLFVBQW9CQyxVQUFFQSxFQUFTQyxLQUFFQSxFQUFJN0MsU0FBRUEsRUFBUThDLFdBQUVBLEVBQVVDLElBQUVBLEdBQXVCQyxHQUMvSCxNQUFNekIsUUFBRUEsR0FBWTBCLEVBQVc1QixHQUUvQjZCLEdBQVUsVUFDVzFCLElBQWZzQixHQUNGQSxFQUFXOUMsRUFDWixHQUNBLENBQUNBLEVBQVU4QyxJQWlCZCxPQUFPSyxFQUFBQyxjQUFBLE1BQUEsQ0FBS0osSUFBS0EsRUFBS0osVUFmSCxNQUNqQixJQUFJUyxFQUFVLENBQUMsbUJBV2YsWUFWa0I3QixJQUFkb0IsSUFDdUIsaUJBQWRBLEVBQ1RTLEVBQVFDLEtBQUtWLEdBQ0ovQyxNQUFNMEQsUUFBUVgsS0FDdkJTLEVBQVVBLEVBQVFHLE9BQU9aLE1BR1osSUFBYjVDLEdBQ0ZxRCxFQUFRQyxLQUFLLFlBRVJELEVBQVFJLEtBQUssSUFBSSxFQUdPQyxJQUN6QmIsRUFBSzlCLE1BQU00QyxLQUFJLENBQUNDLEVBQU1DLElBQ2Z0QyxHQUFTdUMsTUFBTUYsRUFBTWYsS0FHdEMsSUFFYWtCLEVBQVlDLEVBQU90QixFQUFtQjs7Ozs7b0JBSy9CTjtFQ3JDUDZCLEVBQXVCdEIsR0FBVyxVQUFzQkMsVUFBRUEsRUFBU3NCLE9BQUVBLEVBQU1uQixJQUFFQSxHQUF5QkMsR0FDakgsTUFBTXpCLFFBQUVBLEdBQVkwQixFQUFXNUIsR0FjL0IsT0FBTzhCLHVCQUFLSCxJQUFLQSxFQUFLSixVQVpILE1BQ2pCLElBQUlTLEVBQVUsQ0FBQyxxQkFRZixZQVBrQjdCLElBQWRvQixJQUN1QixpQkFBZEEsRUFDVFMsRUFBUUMsS0FBS1YsR0FDSi9DLE1BQU0wRCxRQUFRWCxLQUN2QlMsRUFBVUEsRUFBUUcsT0FBT1osS0FHdEJTLEVBQVFJLEtBQUssSUFBSSxFQUdPQyxJQUN6QlEsRUFBTzlDLE9BQU91QyxLQUFLUSxHQUNaNUMsR0FBU3VDLE1BQU1LLEtBR2hDLElBRWFDLEVBQWNKLEVBQU9DLEVBQXFCO0VDcEIxQ0ksRUFBd0IxQixHQUFXLFVBQXVCQyxVQUFFQSxFQUFTM0IsUUFBRUEsRUFBT2pCLFNBQUVBLEVBQVE4QyxXQUFFQSxFQUFVd0IsUUFBRUEsRUFBT3ZCLElBQUVBLEdBQTBCQyxHQUNwSixNQUFNekIsUUFBRUEsR0FBWTBCLEVBQVc1QixHQUUvQjZCLEdBQVUsVUFDVzFCLElBQWZzQixHQUNGQSxFQUFXOUMsRUFDWixHQUNBLENBQUNBLEVBQVU4QyxJQXVCZCxPQUFPSyxFQUFBQyxjQUFBLE1BQUEsQ0FBS0osSUFBS0EsRUFBS0osVUFyQkgsTUFDakIsSUFBSVMsRUFBVSxDQUFDLHNCQVdmLFlBVmtCN0IsSUFBZG9CLElBQ3VCLGlCQUFkQSxFQUNUUyxFQUFRQyxLQUFLVixHQUNKL0MsTUFBTTBELFFBQVFYLEtBQ3ZCUyxFQUFVQSxFQUFRRyxPQUFPWixNQUdaLElBQWI1QyxHQUNGcUQsRUFBUUMsS0FBSyxZQUVSRCxFQUFRSSxLQUFLLElBQUksRUFTT0MsR0FBY1ksUUFOMUJDLFNBQ0gvQyxJQUFaOEMsR0FDRkEsRUFBUUMsRUFDVCxHQUlNdEQsRUFBUVAsU0FBU2lELEtBQUthLEdBQ2ZqRCxHQUFTdUMsTUFBTVUsRUFBT3ZELEtBR3hDLElBRU1xQixFQUFZWixFQUFpQixPQUFRLENBQ3pDK0MsUUFBUyxDQUFFeEMsTUFBTyxPQUFRQyxLQUFNLFdBQ2hDbEMsU0FBVSxDQUFFaUMsTUFBTyxPQUFRQyxLQUFNLGFBRzdCRixFQUFrQk4sRUFBaUIsT0FBUSxDQUMvQytDLFFBQVMsQ0FBRXhDLE1BQU8sUUFBU0MsS0FBTSxXQUNqQ2xDLFNBQVUsQ0FBRWlDLE1BQU8sbUJBQW9CQyxLQUFNLG1CQUd6Q0UsRUFBY1YsRUFBaUIsT0FBUSxDQUMzQytDLFFBQVMsQ0FBRXhDLE1BQU8sT0FBUUMsS0FBTSxXQUNoQ2xDLFNBQVUsQ0FBRWlDLE1BQU8scUJBQXNCQyxLQUFNLHFCQUdwQ3dDLEVBQWVWLEVBQU9LLEVBQXNCOzs7OztXQUs5Qy9CO3NCQUNXTjtrQkFDSkk7RUMxRFp1QyxFQUEwQmhDLEdBQVcsVUFBeUJDLFVBQUVBLEVBQVNnQyxRQUFFQSxFQUFPNUUsU0FBRUEsRUFBUThDLFdBQUVBLEVBQVV3QixRQUFFQSxFQUFPdkIsSUFBRUEsR0FBNEJDLEdBQ25KLE1BQU16QixRQUFFQSxHQUFZMEIsRUFBVzVCLEdBRS9CNkIsR0FBVSxVQUNXMUIsSUFBZnNCLEdBQ0ZBLEVBQVc5QyxFQUNaLEdBQ0EsQ0FBQ0EsRUFBVThDLElBRWQsTUFlTStCLEVBQWNDLEdBQWFQLFNBQ2YvQyxJQUFaOEMsR0FDRkEsRUFBUUMsRUFDVCxHQUNBLENBQUNELElBRUosT0FBT25CLEVBQUtDLGNBQUEsTUFBQSxDQUFBSixJQUFLQSxFQUFLSixVQXJCSCxNQUNqQixJQUFJUyxFQUFVLENBQUMsd0JBV2YsWUFWa0I3QixJQUFkb0IsSUFDdUIsaUJBQWRBLEVBQ1RTLEVBQVFDLEtBQUtWLEdBQ0ovQyxNQUFNMEQsUUFBUVgsS0FDdkJTLEVBQVVBLEVBQVFHLE9BQU9aLE1BR1osSUFBYjVDLEdBQ0ZxRCxFQUFRQyxLQUFLLFlBRVJELEVBQVFJLEtBQUssSUFBSSxFQVNRQyxHQUFlWSxRQUFTTyxHQUN4RDFCLEVBQUFDLGNBQUEsT0FBQSxLQUNFRCxFQUFBQyxjQUFBLFFBQUEsS0FBMEIsT0FBakJ3QixFQUFRdkUsS0FBZ0J1RSxFQUFRdkUsS0FBTyxLQUFPLElBQ3JEdUUsRUFBUXRFLE1BQU1xRCxLQUFLb0IsR0FDWnhELEdBQVN1QyxNQUFNaUIsRUFBTUgsTUFJcEMsSUFFTXRDLEVBQVlaLEVBQWlCLE9BQVEsQ0FDekMrQyxRQUFTLENBQUV4QyxNQUFPLE9BQVFDLEtBQU0sUUFDaENsQyxTQUFVLENBQUVpQyxNQUFPLE9BQVFDLEtBQU0sYUFHN0JGLEVBQWtCTixFQUFpQixPQUFRLENBQy9DK0MsUUFBUyxDQUFFeEMsTUFBTyxjQUFlQyxLQUFNLGVBQ3ZDbEMsU0FBVSxDQUFFaUMsTUFBTyxtQkFBb0JDLEtBQU0sbUJBR3pDOEMsRUFBcUJqRCxFQUFNLE9BQVEsQ0FDdkNFLE1BQU8sT0FDUEMsS0FBTSxZQUdLK0MsRUFBaUJqQixFQUFPVyxFQUF3Qjs7Ozs7d0JBS3JDbEM7Ozs7YUFJWEg7d0JBQ1dOOzs7O2FBSVhNOzs7O2FBSUEwQzs7RUMxRVBFLEVBQXVCdkMsR0FBVyxVQUFzQkMsVUFBRUEsRUFBU21DLEtBQUVBLEVBQUkvRSxTQUFFQSxFQUFROEMsV0FBRUEsRUFBVXdCLFFBQUVBLEVBQU92QixJQUFFQSxHQUF5QkMsR0FDdklFLEdBQVUsVUFDVzFCLElBQWZzQixHQUNGQSxFQUFXOUMsRUFDWixHQUNBLENBQUNBLEVBQVU4QyxJQXVCZCxPQUFPSyxFQUFBQyxjQUFBLE9BQUEsQ0FBTUosSUFBS0EsRUFBS0osVUFyQkosTUFDakIsSUFBSVMsRUFBVSxDQUFDLHFCQVdmLFlBVmtCN0IsSUFBZG9CLElBQ3VCLGlCQUFkQSxFQUNUUyxFQUFRQyxLQUFLVixHQUNKL0MsTUFBTTBELFFBQVFYLEtBQ3ZCUyxFQUFVQSxFQUFRRyxPQUFPWixNQUdaLElBQWI1QyxHQUNGcUQsRUFBUUMsS0FBSyxZQUVSRCxFQUFRSSxLQUFLLElBQUksRUFTUUMsR0FBY1ksUUFOTkMsU0FDeEIvQyxJQUFaOEMsR0FDRkEsRUFBUUMsRUFDVCxFQUd5RVksd0JBQXlCLENBQUVDLE9BQVFMLEVBQUs5RCxVQUN0SCxJQUVNb0UsRUFBZ0IzRCxFQUFpQixPQUFRLENBQzdDK0MsUUFBUyxDQUFFeEMsTUFBTyxPQUFRQyxLQUFNLFFBQ2hDbEMsU0FBVSxDQUFFaUMsTUFBTyxPQUFRQyxLQUFNLGFBRzdCb0QsRUFBc0I1RCxFQUFpQixPQUFRLENBQ25EK0MsUUFBUyxDQUFFeEMsTUFBTyxjQUFlQyxLQUFNLGVBQ3ZDbEMsU0FBVSxDQUFFaUMsTUFBTyxtQkFBb0JDLEtBQU0sbUJBR3pDcUQsRUFBeUJ4RCxFQUFNLE9BQVEsQ0FDM0NFLE1BQU8sT0FDUEMsS0FBTSxZQUdLc0QsRUFBY3hCLEVBQU9rQixFQUFxQjtXQUM1Q0c7c0JBQ1dDOzs7YUFHVEM7Ozs7YUFJQUY7O0VDaEVBSSxFQUFPLFVBQWVDLElBQUVBLElBQ25DLE9BQU92QyxFQUFBQyxjQUFBLE9BQUEsQ0FBTStCLHdCQUF5QixDQUFFQyxPQUFRTSxJQUNsRCxFQ1FNQyxFQUF5QjNCLEVBQU80QixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF1Qm5DQyxFQUErQjdCLEVBQU80QixHQUFHOzs7RUFLekNFLEVBQWdDOUIsRUFBTytCLE1BQU07Ozs7OztXQU14Q3pEOzs7Ozs7Ozs7Ozs7OztZQWNDQTs7RUFJTjBELEdBQThCaEMsRUFBTzRCLEdBQUc7Ozs7aUJBSTdCcEQ7Ozs7Ozs7Ozs7OztFQWNYeUQsR0FBZ0NqQyxFQUFPNEIsR0FBRzs7Ozs7Ozs7OztFQVkxQ00sR0FBOEJsQyxFQUFPNEIsR0FBRzs7Ozs7OztFQVNqQ08sR0FBbUIsVUFBMkJ2RCxVQUFFQSxFQUFTbEMsU0FBRUEsRUFBUTBGLE1BQUVBLEVBQUt4RixVQUFFQSxFQUFTeUYsU0FBRUEsRUFBUUMsZ0JBQUVBLElBQzVHLE1BQU1DLEVBQVFDLEVBQXVCLE1BRS9CQyxFQUFjM0IsR0FBWSxLQUM5QixHQUFxQixNQUFqQnlCLEVBQU1HLFFBQ1IsSUFBa0IsSUFBZDlGLEVBQW9CLENBQ3RCLE1BQU0rRixJQUFNSixFQUFNRyxRQUFRRSxhQUFlLElBQ3pDTCxFQUFNRyxRQUFRRyxhQUFhLFFBQVMsZUFBaUJGLEVBQUksS0FDMUQsTUFDQ0osRUFBTUcsUUFBUUcsYUFBYSxRQUFTLGtCQUV2QyxHQUNBLENBQUNOLEVBQU8zRixJQUVYa0csRUFBa0IsQ0FDaEJDLFVBQVdSLEVBQ1hTLFNBQVUsS0FDUlAsR0FBYSxJQUlqQnZELEdBQVUsS0FDUnVELEdBQWEsR0FDWixJQUVIdkQsR0FBVSxLQUNSdUQsR0FBYSxHQUNaLENBQUM3RixFQUFXNkYsSUFhZixPQUFRdEQsRUFBQ0MsY0FBQXVDLEdBQXVCL0MsVUFYYixNQUNqQixNQUFNUyxFQUFVLENBQUMscUJBT2pCLFlBTmtCN0IsSUFBZG9CLEdBQ0ZTLEVBQVFDLEtBQUtWLElBRUcsSUFBZGhDLEdBQ0Z5QyxFQUFRQyxLQUFLLGFBRVJELEVBQVFJLEtBQUssSUFBSSxFQUdpQkMsSUFDdkNQLEVBQUFDLGNBQUN5QyxFQUE0QixDQUFDakQsVUFBVSxpQ0FDdENPLEVBQUNDLGNBQUEwQyxFQUE4QixDQUFBbEQsVUFBVSxpQ0FBaUMwQixRQUFVQyxJQUNsRjhCLElBQVd6RixHQUNYMkQsRUFBRTBDLGlCQUFpQixHQUNsQjlELEVBQUFDLGNBQUNxQyxFQUFLLENBQUFDLElDeEpXLDZMRHlKcEJ2QyxFQUFDQyxjQUFBNEMsR0FBNEIsQ0FBQXBELFVBQVUsK0JBQStCMEIsUUFBVUMsSUFDOUU4QixJQUFXekYsR0FDWDJELEVBQUUwQyxpQkFBaUIsR0FDakJiLElBRU5qRCxFQUFBQyxjQUFDNkMsR0FBNkIsQ0FBQ3JELFVBQVUsa0NBQ3ZDTyxFQUFBQyxjQUFDOEMsR0FBNEIsQ0FBQXRELFVBQVUsK0JBQStCSSxJQUFLdUQsRUFBT0QsZ0JBQWlCQSxHQUNqRzVGLElBS1YsRUVuSk13RyxHQUFzQnZFLEdBQVcsVUFBcUJDLFVBQUVBLEVBQVMzQixRQUFFQSxFQUFPTCxVQUFFQSxFQUFTWixTQUFFQSxFQUFRcUcsU0FBRUEsRUFBUXZELFdBQUVBLEVBQVV3RCxnQkFBRUEsRUFBZXZELElBQUVBLEdBQXdCQyxHQUNwSyxNQUFNekIsUUFBRUEsR0FBWTBCLEVBQVc1QixHQUUvQjZCLEdBQVUsVUFDVzFCLElBQWZzQixHQUNGQSxFQUFXOUMsRUFDWixHQUNBLENBQUNBLEVBQVU4QyxJQTBCZCxPQUFPSyxFQUFLQyxjQUFBLE1BQUEsQ0FBQUosSUFBS0EsRUFBS0osVUF4QkgsTUFDakIsSUFBSVMsRUFBVSxDQUFDLG9CQWNmLFlBYmtCN0IsSUFBZG9CLElBQ3VCLGlCQUFkQSxFQUNUUyxFQUFRQyxLQUFLVixHQUNKL0MsTUFBTTBELFFBQVFYLEtBQ3ZCUyxFQUFVQSxFQUFRRyxPQUFPWixNQUdaLElBQWI1QyxHQUNGcUQsRUFBUUMsS0FBSyxhQUVHLElBQWQxQyxHQUNGeUMsRUFBUUMsS0FBSyxhQUVSRCxFQUFRSSxLQUFLLElBQUksRUFTT0MsR0FBY1ksUUFOM0IsVUFDRDlDLElBQWI2RSxRQUF3QzdFLElBQWRaLEdBQzVCeUYsR0FBV3pGLEVBQ1osR0FJR3VDLEVBQUFDLGNBQUMrQyxHQUFnQixDQUFDQyxNQUFPbkYsRUFBUVosS0FBTU8sVUFBV0EsRUFBV3lGLFNBQVVBLEVBQVVDLGdCQUFpQkEsR0FDaEdyRixFQUFRUCxTQUFTaUQsS0FBSSxDQUFDYSxFQUFPWCxJQUN0QnRDLEdBQVN1QyxNQUFNVSxFQUFPdkQsTUFJdkMsSUFFTXFCLEdBQVlaLEVBQWlCLE9BQVEsQ0FDekMrQyxRQUFTLENBQUV4QyxNQUFPLE9BQVFDLEtBQU0sV0FDaENsQyxTQUFVLENBQUVpQyxNQUFPLE9BQVFDLEtBQU0sYUFHN0JGLEdBQWtCTixFQUFpQixPQUFRLENBQy9DK0MsUUFBUyxDQUFFeEMsTUFBTyxRQUFTQyxLQUFNLFdBQ2pDbEMsU0FBVSxDQUFFaUMsTUFBTyxtQkFBb0JDLEtBQU0sbUJBR3pDRSxHQUFjVixFQUFpQixPQUFRLENBQzNDK0MsUUFBUyxDQUFFeEMsTUFBTyxPQUFRQyxLQUFNLFdBQ2hDbEMsU0FBVSxDQUFFaUMsTUFBTyxxQkFBc0JDLEtBQU0scUJBSTNDaUYsR0FBa0J6RixFQUFpQixPQUFRLENBQy9DK0MsUUFBUyxDQUFFeEMsTUFBTyxPQUFRQyxLQUFNLFdBQ2hDbEMsU0FBVSxDQUFFaUMsTUFBTyxPQUFRQyxLQUFNLGFBR3RCa0YsR0FBYXBELEVBQU9rRCxHQUFvQjs7Ozs7YUFLeEM1RTt3QkFDV047b0JBQ0pJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcUJQaUYsR0FBZ0JyRCxFQUFPb0QsR0FBVzs7OytCQUdoQkQ7Ozs7Ozs7Ozs7O0VDdEdsQkcsR0FBZTNFLEdBQVcsVUFBdUI0RSxTQUFFQSxFQUFRdkgsU0FBRUEsRUFBUThDLFdBQUVBLEVBQVVDLElBQUVBLEdBQTBCQyxHQU94SCxPQU5BRSxHQUFVLFVBQ1cxQixJQUFmc0IsR0FDRkEsRUFBVzlDLEVBQ1osR0FDQSxDQUFDQSxFQUFVOEMsSUFFUEssRUFBQUMsY0FBQSxNQUFBLENBQUtKLElBQUtBLEVBQUtKLFVBQVUsaUJBQ2xDLElDWGE0RSxHQUFrQixDQUM3QkMsRUFDQUMsSUFFTyxTQUEwQjdGLEdBQy9CLE1BQU9qQixFQUFXK0csR0FBZ0JDLEVBQWtCRixFQUFPOUcsV0FJM0QsT0FBT3VDLEVBQUNDLGNBQUFxRSxFQUFVLENBQUE3RyxVQUFXQSxFQUFXeUYsU0FIZndCLElBQ3ZCRixHQUFjRSxFQUFFLEtBRXFEaEcsR0FDekUsRUNWV2lHLEdBQWlCLENBQzVCTCxFQUNBQyxJQUVPLFNBQXlCN0YsR0FDOUIsTUFBTW1CLEVBQU13RCxFQUF1QixPQUM1QnhHLEVBQVUrSCxHQUFlSCxFQUFrQkYsRUFBTzFILFVBSXpELE9BQU9tRCxnQkFBQ3NFLEVBQVMsQ0FBQ3pFLElBQUtBLEVBQUtoRCxTQUFVQSxFQUFVOEMsV0FIeEJrRixJQUN0QkQsRUFBWUMsRUFBRSxLQUVnRW5HLEdBQ2xGLFFDRFdvRyxHQUNYQyxZQUFxQixHQUNyQkMsU0FBNkQsR0FFN0QsV0FBQTFJLEdBQ0VDLEtBQUswSSxnQkFBZ0J2SCxFQUFVbkIsS0FBSzJJLGVBQ3BDM0ksS0FBSzBJLGdCQUFnQnpILEVBQWNqQixLQUFLNEksbUJBQ3hDNUksS0FBSzBJLGdCQUFnQjNILEVBQVNmLEtBQUs2SSxjQUNuQzdJLEtBQUswSSxnQkFBZ0JoSSxFQUFTVixLQUFLOEksY0FDbkM5SSxLQUFLMEksZ0JBQWdCdEgsRUFBTXBCLEtBQUsrSSxXQUNoQy9JLEtBQUswSSxnQkFBZ0JwSCxFQUFNdEIsS0FBS2dKLFdBQ2hDaEosS0FBSzBJLGdCQUFnQnJJLEVBQVlMLEtBQUtpSixpQkFDdENqSixLQUFLMEksZ0JBQWdCbEgsRUFBUXhCLEtBQUtrSixZQUNuQyxDQUVELGVBQUFSLENBQWlCUyxFQUFrQkMsR0FDakNwSixLQUFLd0ksWUFBWTVFLEtBQUt1RixHQUN0Qm5KLEtBQUt5SSxTQUFTN0UsS0FBS3dGLEVBQVFDLEtBQUtySixNQUNqQyxDQUVELEtBQUFvRSxDQUFPSyxFQUFhaEQsR0FDbEIsSUFBSyxJQUFJNkgsRUFBSSxFQUFHQSxFQUFJdEosS0FBS3lJLFNBQVNjLE9BQVFELElBQUssQ0FDN0MsTUFBTUgsRUFBY25KLEtBQUt3SSxZQUFZYyxHQUMvQkUsRUFBVXhKLEtBQUt5SSxTQUFTYSxHQUM5QixHQUFJN0UsRUFBTTFFLFlBQVlZLE9BQVN3SSxFQUFZeEksS0FDekMsT0FBTzZJLEVBQVEvRSxFQUFPaEQsRUFFekIsQ0FDRCxNQUFNLElBQUlnSSxNQUFNLDBCQUE0QmhGLEVBQU0xRSxZQUFZWSxLQUMvRCxDQUVELGFBQUFWLENBQWV3RSxFQUFhdkUsR0FDMUIsTUFBTU4sRUFBYSxJQUFJQyxJQUFJTSxNQUFNQyxLQUFLcUUsRUFBTTdFLGFBQzVDLE9BQU9PLE1BQU1DLEtBQUtSLEVBQ25CLENBRUQsaUJBQUFnSixDQUFtQm5FLEVBQXFCaEQsR0FDdEMsTUFBTWlJLEVBQTRCNUIsR0FBZ0JKLEdBQVksQ0FBRXhHLFVBQVd1RCxFQUFNdkQsWUFDM0V5SSxFQUFvQnZCLEdBQWVzQixFQUEyQixDQUFFcEosU0FBVW1FLEVBQU1uRSxXQUN0RixPQUFPbUQsRUFBQ0MsY0FBQWlHLEVBQ0EsQ0FBQXBJLFFBQVNrRCxFQUNUcEIsSUFBS29CLEVBQU05RSxNQUNwQixDQUVELGFBQUFnSixDQUFlbEUsRUFBaUJoRCxHQUM5QixNQUFNbUksRUFBMEI5QixHQUFnQkgsR0FBZSxDQUFFekcsVUFBV3VELEVBQU12RCxZQUM1RTJJLEVBQXVCekIsR0FBZXdCLEVBQXlCLENBQUV0SixTQUFVbUUsRUFBTW5FLFdBQ3ZGLE9BQU9tRCxFQUFDQyxjQUFBbUcsRUFDQSxDQUFBdEksUUFBU2tELEVBQ1RwQixJQUFLb0IsRUFBTTlFLE1BQ3BCLENBRUQsWUFBQWtKLENBQWNwRSxFQUFnQmhELEdBQzVCLE1BQU1xSSxFQUFzQjFCLEdBQWVwRCxFQUFjLENBQUUxRSxTQUFVbUUsRUFBTW5FLFdBQzNFLE9BQU9tRCxFQUFDQyxjQUFBb0csRUFDQSxDQUFBdkksUUFBU2tELEVBQ1RwQixJQUFLb0IsRUFBTTlFLE1BQ3BCLENBRUQsWUFBQW1KLENBQWNyRSxFQUFnQmhELEdBQzVCLE1BQU1zSSxFQUF3QjNCLEdBQWU3QyxFQUFnQixDQUFFakYsU0FBVW1FLEVBQU1uRSxXQUMvRSxPQUFPbUQsRUFBQ0MsY0FBQXFHLEVBQ0EsQ0FBQTdFLFFBQVNULEVBQ1RwQixJQUFLb0IsRUFBTTlFLE1BQ3BCLENBRUQsU0FBQW9KLENBQVd0RSxFQUFhaEQsR0FDdEIsTUFBTXVJLEVBQW1CNUIsR0FBZS9ELEVBQVcsQ0FBRS9ELFVBQVUsSUFDL0QsT0FBT21ELGdCQUFDdUcsRUFBZ0IsQ0FDaEI3RyxLQUFNc0IsRUFDTm5FLFVBQVUsRUFDVitDLElBQUtvQixFQUFNOUUsTUFDcEIsQ0FFRCxTQUFBcUosQ0FBV3ZFLEVBQWFoRCxHQUN0QixNQUFNd0ksRUFBcUI3QixHQUFldEMsRUFBYSxDQUFFeEYsU0FBVW1FLEVBQU1uRSxXQUN6RSxPQUFPbUQsRUFBQ0MsY0FBQXVHLEVBQ0EsQ0FBQTVFLEtBQU1aLEVBQ05wQixJQUFLb0IsRUFBTTlFLE1BQ3BCLENBRUQsZUFBQXNKLENBQWlCeEUsRUFBbUJoRCxHQUNsQyxNQUFNeUksRUFBa0I5QixHQUFlUixHQUFjLENBQUV0SCxTQUFVbUUsRUFBTW5FLFdBQ3ZFLE9BQU9tRCxFQUFDQyxjQUFBd0csRUFDQSxDQUFBckMsU0FBVXBELEVBQ1ZwQixJQUFLb0IsRUFBTTlFLE1BQ3BCLENBRUQsV0FBQXVKLENBQWExRSxFQUFnQi9DLEdBQzNCLE1BQU0wSSxFQUFxQi9CLEdBQWUxRCxFQUFhLENBQUVwRSxVQUFVLElBQ25FLE9BQU9tRCxFQUFDQyxjQUFBeUcsRUFDQSxDQUFBM0YsT0FBUUEsRUFDUm5CLElBQUttQixFQUFPN0UsTUFDckIifQ==
