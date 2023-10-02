import e,{createContext as t,forwardRef as r,useContext as l,useEffect as s,useCallback as o,useRef as n,useState as i}from"react";import{styled as a}from"styled-components";import c from"styled-theming";import{useResizeDetector as d}from"react-resize-detector";class u{uuid;classNames=new Set;iteration;constructor(e){this.uuid=e}getClassNames(e){return Array.from(this.classNames)}}class m extends u{selected=!1;selectionIndex=null;constructor(e){super(e)}getClassNames(e){const t=new Set(super.getClassNames(e));return null!==this.selectionIndex&&t.add("selectable"),e===this.selectionIndex&&t.add("selected"),Array.from(t)}}class p extends m{name=null;spans=[]}class b extends p{language=null}class g extends m{children=[]}class h extends g{name;collapsed=!0;constructor(e,t){super(e),this.name=t}}class f extends h{}class k extends u{items=[]}class y extends m{uuid;content;constructor(e,t){super(e),this.uuid=e,this.content=t}}class x extends u{name;parent;blocks=[]}const v=t({factory:void 0,setFactory:e=>{}}),E=(e,t)=>r=>{const l=!0===r.selected?"selected":"default";return c(e,t[l])(r)},N=c("mode",{light:"#fff",dark:"#000"}),S=c("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),A=c("mode",{light:"#fff",dark:"#000"}),C=c("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),$=c("mode",{light:"#fff",dark:"#eee"}),w=c("mode",{light:"#222",dark:"#ffde98"}),B=c("mode",{light:"Arial",dark:"Arial"}),T=c("mode",{light:500,dark:400}),z=r((function({className:t,list:r,selected:o,onSelected:n,key:i},a){const{factory:c}=l(v);s((()=>{void 0!==n&&n(o)}),[o,n]);return e.createElement("div",{ref:a,className:(()=>{let e=["aics-block-list"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===o&&e.push("selected"),e.join(" ")})()},r.items.map(((e,t)=>c?.build(e,r))))})),j=a(z)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${A};
`,I=r((function({className:t,stream:r,key:s},o){const{factory:n}=l(v);return e.createElement("div",{ref:o,className:(()=>{let e=["aics-block-stream"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),e.join(" ")})()},r.blocks.map((e=>n?.build(e))))})),L=a(I)`
`,_=r((function({className:t,content:r,selected:o,onSelected:n,onClick:i,key:a},c){const{factory:d}=l(v);s((()=>{void 0!==n&&n(o)}),[o,n]);return e.createElement("div",{ref:c,className:(()=>{let e=["aics-content-block"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===o&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==i&&i(e)}},r.children.map((e=>d?.build(e,r))))})),H=E("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),M=E("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),P=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),R=a(_)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${H};
  background-color: ${M};
  border-color: ${P};
`,F=r((function({className:t,section:r,selected:n,onSelected:i,onClick:a,key:c},d){const{factory:u}=l(v);s((()=>{void 0!==i&&i(n)}),[n,i]);const m=o((e=>{void 0!==a&&a(e)}),[a]);return e.createElement("div",{ref:d,className:(()=>{let e=["aics-content-section"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===n&&e.push("selected"),e.join(" ")})(),onClick:m},e.createElement("span",null,e.createElement("label",null,null!==r.name?r.name+": ":""),r.spans.map((e=>u?.build(e,r)))))})),Z=E("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),q=E("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),D=c("mode",{light:"#222",dark:"#ffde98"}),G=a(F)`
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
`,J=r((function({className:t,span:r,selected:l,onSelected:o,onClick:n,key:i},a){s((()=>{void 0!==o&&o(l)}),[l,o]);return e.createElement("span",{ref:a,className:(()=>{let e=["aics-content-span"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===l&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==n&&n(e)},dangerouslySetInnerHTML:{__html:r.content}})})),K=E("mode",{default:{light:"#222",dark:"#eee"},selected:{light:"#222",dark:"#ffde98"}}),O=E("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),Q=c("mode",{light:"#222",dark:"#ffde98"}),U=a(J)`
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
`,re=a.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`,le=function({className:t,children:r,title:l,collapsed:i,onToggle:a,onTransitionEnd:c}){const u=n(null),m=o((()=>{if(null!=u.current)if(!0===i){const e=-(u.current.offsetHeight+40);u.current.setAttribute("style","margin-top: "+e+"px")}else u.current.setAttribute("style","margin-top: 0px")}),[u,i]);d({targetRef:u,onResize:()=>{m()}}),s((()=>{m()}),[]),s((()=>{m()}),[i,m]);return e.createElement(W,{className:(()=>{const e=["collapsible-block"];return void 0!==t&&e.push(t),!0===i&&e.push("collapsed"),e.join(" ")})()},e.createElement(X,{className:"aics-collapsible-block-header"},e.createElement(Y,{className:"aics-collapsible-block-control",onClick:e=>{a?.(i),e.stopPropagation()}},e.createElement(V,{svg:'<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'})),e.createElement(ee,{className:"aics-collapsible-block-title",onClick:e=>{a?.(i),e.stopPropagation()}},l)),e.createElement(te,{className:"aics-collapsible-block-content"},e.createElement(re,{className:"aics-collapsible-block-inner",ref:u,onTransitionEnd:c},r)))},se=r((function({className:t,content:r,collapsed:o,selected:n,onToggle:i,onSelected:a,onTransitionEnd:c,key:d},u){const{factory:m}=l(v);s((()=>{void 0!==a&&a(n)}),[n,a]);return e.createElement("div",{ref:u,className:(()=>{let e=["aics-named-block"];return void 0!==t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),!0===n&&e.push("selected"),!0===o&&e.push("collapsed"),e.join(" ")})(),onClick:()=>{void 0!==i&&void 0!==o&&i(!o)}},e.createElement(le,{title:r.name,collapsed:o,onToggle:i,onTransitionEnd:c},r.children.map(((e,t)=>m?.build(e,r)))))})),oe=E("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),ne=E("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),ie=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),ae=E("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"#ccc",dark:"#595b60"}}),ce=a(se)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${oe};
    background-color: ${ne};
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
`,ue=r((function({sentinal:t,selected:r,onSelected:l,key:o},n){return s((()=>{void 0!==l&&l(r)}),[r,l]),e.createElement("div",{ref:n,className:"aics-sentinal"})})),me=(t,r)=>function(l){const[s,n]=i(r.collapsed),a=o((e=>{n(!e)}),[n]);return e.createElement(t,{collapsed:s,onToggle:a,...l})},pe=t=>function(r){const l=n(null);return s((()=>{void 0!==r.onSelected&&r.onSelected(r.selected)}),[r,r.selected,r.onSelected]),e.createElement(t,{ref:l,...r})};class be{block_types=[];builders=[];constructor(){this.registerBuilder(f,this.buildListItem),this.registerBuilder(h,this.buildNamedContent),this.registerBuilder(g,this.buildContent),this.registerBuilder(p,this.buildSection),this.registerBuilder(k,this.buildList),this.registerBuilder(y,this.buildSpan),this.registerBuilder(m,this.buildSelectable),this.registerBuilder(x,this.buildStream)}registerBuilder(e,t){this.block_types.push(e),this.builders.push(t.bind(this))}build(e,t){for(let r=0;r<this.builders.length;r++){const l=this.block_types[r],s=this.builders[r];if(e.constructor.name===l.name)return s(e,t)}throw new Error("Builder not found for: "+e.constructor.name)}getClassNames(e,t){const r=new Set(Array.from(e.classNames));return Array.from(r)}buildNamedContent(t,r){const l=me(ce,{collapsed:t.collapsed}),s=pe(l);return e.createElement(s,{content:t,key:t.uuid})}buildListItem(t,r){const l=me(de,{collapsed:t.collapsed}),s=pe(l);return e.createElement(s,{content:t,key:t.uuid})}buildContent(t,r){const l=pe(R);return e.createElement(l,{content:t,key:t.uuid})}buildSection(t,r){const l=pe(G);return e.createElement(l,{section:t,key:t.uuid})}buildList(t,r){const l=pe(j);return e.createElement(l,{list:t,selected:!1,key:t.uuid})}buildSpan(t,r){const l=pe(U);return e.createElement(l,{span:t,key:t.uuid})}buildSelectable(t,r){const l=pe(ue);return e.createElement(l,{sentinal:t,key:t.uuid})}buildStream(t,r){const l=pe(L);return e.createElement(l,{stream:t,key:t.uuid})}}export{u as Base,v as BlockFactoryContext,j as BlockList,z as BlockListComponent,de as BlockListItem,L as BlockStream,I as BlockStreamComponent,b as Code,le as CollapsibleBlock,g as Content,R as ContentBlock,_ as ContentBlockComponent,G as ContentSection,U as ContentSpan,be as DefaultBlockFactory,k as List,f as ListItem,ce as NamedBlock,h as NamedContent,p as Section,m as Selectable,ue as SentinalView,y as Span,x as Stream,N as backgroundColor,A as borderColor,B as defaultFont,T as fontWeight,S as selectedBackgroundColor,C as selectedBorderColor,w as selectedTextColor,E as selectedVariants,$ as textColor,me as withCollapsible,pe as withRef};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWpzIiwic291cmNlcyI6WyIuLi9zcmMvZGF0YS9CYXNlLnRzIiwiLi4vc3JjL2RhdGEvU2VsZWN0YWJsZS50cyIsIi4uL3NyYy9kYXRhL1NlY3Rpb24udHMiLCIuLi9zcmMvZGF0YS9Db2RlLnRzIiwiLi4vc3JjL2RhdGEvQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL05hbWVkQ29udGVudC50cyIsIi4uL3NyYy9kYXRhL0xpc3QudHMiLCIuLi9zcmMvZGF0YS9TcGFuLnRzIiwiLi4vc3JjL2RhdGEvU3RyZWFtLnRzIiwiLi4vc3JjL2hvb2tzL0Jsb2NrRmFjdG9yeUNvbnRleHQudHMiLCIuLi9zcmMvY29tcG9uZW50cy90aGVtZS50cyIsIi4uL3NyYy9jb21wb25lbnRzL0Jsb2NrTGlzdC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9CbG9ja1N0cmVhbS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db250ZW50QmxvY2sudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFNlY3Rpb24udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFNwYW4udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvSWNvbi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Db2xsYXBzaWJsZUJsb2NrLnRzeCIsIi4uL3NyYy9hc3NldHMvaWNvbnMudHMiLCIuLi9zcmMvY29tcG9uZW50cy9OYW1lZEJsb2NrLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL1NlbnRpbmFsVmlldy50c3giLCIuLi9zcmMvY29tcG9uZW50cy93aXRoQ29sbGFwc2libGUudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvd2l0aFJlZi50c3giLCIuLi9zcmMvY29tcG9uZW50cy9CbG9ja0ZhY3RvcnkudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJCYXNlIiwidXVpZCIsImNsYXNzTmFtZXMiLCJTZXQiLCJpdGVyYXRpb24iLCJjb25zdHJ1Y3RvciIsInRoaXMiLCJnZXRDbGFzc05hbWVzIiwic2VsZWN0ZWRfaW5kZXgiLCJBcnJheSIsImZyb20iLCJTZWxlY3RhYmxlIiwic2VsZWN0ZWQiLCJzZWxlY3Rpb25JbmRleCIsInN1cGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZCIsIlNlY3Rpb24iLCJuYW1lIiwic3BhbnMiLCJDb2RlIiwibGFuZ3VhZ2UiLCJDb250ZW50IiwiY2hpbGRyZW4iLCJOYW1lZENvbnRlbnQiLCJjb2xsYXBzZWQiLCJMaXN0SXRlbSIsIkxpc3QiLCJpdGVtcyIsIlNwYW4iLCJjb250ZW50IiwiU3RyZWFtIiwicGFyZW50IiwiYmxvY2tzIiwiQmxvY2tGYWN0b3J5Q29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJmYWN0b3J5IiwidW5kZWZpbmVkIiwic2V0RmFjdG9yeSIsInNlbGVjdGVkVmFyaWFudHMiLCJtb2RlIiwidmFsdWVzIiwicHJvcHMiLCJ2YXJpYW50IiwidGhlbWUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaWdodCIsImRhcmsiLCJzZWxlY3RlZEJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwic2VsZWN0ZWRCb3JkZXJDb2xvciIsInRleHRDb2xvciIsInNlbGVjdGVkVGV4dENvbG9yIiwiZGVmYXVsdEZvbnQiLCJmb250V2VpZ2h0IiwiQmxvY2tMaXN0Q29tcG9uZW50IiwiZm9yd2FyZFJlZiIsImNsYXNzTmFtZSIsImxpc3QiLCJvblNlbGVjdGVkIiwia2V5IiwicmVmIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzZXMiLCJwdXNoIiwiaXNBcnJheSIsImNvbmNhdCIsImpvaW4iLCJnZXRDbGFzc2VzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiYnVpbGQiLCJCbG9ja0xpc3QiLCJzdHlsZWQiLCJCbG9ja1N0cmVhbUNvbXBvbmVudCIsInN0cmVhbSIsImJsb2NrIiwiQmxvY2tTdHJlYW0iLCJDb250ZW50QmxvY2tDb21wb25lbnQiLCJvbkNsaWNrIiwiZSIsImNoaWxkIiwiZGVmYXVsdCIsIkNvbnRlbnRCbG9jayIsIkNvbnRlbnRTZWN0aW9uQ29tcG9uZW50Iiwic2VjdGlvbiIsImhhbmRsZUNsaWNrIiwidXNlQ2FsbGJhY2siLCJzcGFuIiwic2VsZWN0ZWRMYWJlbENvbG9yIiwiQ29udGVudFNlY3Rpb24iLCJDb250ZW50U3BhbkNvbXBvbmVudCIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwic3BhblRleHRDb2xvciIsInNwYW5CYWNrZ3JvdW5kQ29sb3IiLCJzZWxlY3RlZENoaWxkU3BhbkNvbG9yIiwiQ29udGVudFNwYW4iLCJJY29uIiwic3ZnIiwiQ29sbGFwc2libGVCbG9ja1N0eWxlZCIsImRpdiIsIkNvbGxhcHNpYmxlQmxvY2tIZWFkZXJTdHlsZWQiLCJDb2xsYXBzaWJsZUJsb2NrQ29udHJvbFN0eWxlZCIsImJ1dHRvbiIsIkNvbGxhcHNpYmxlQmxvY2tUaXRsZVN0eWxlZCIsIkNvbGxhcHNpYmxlQmxvY2tDb250ZW50U3R5bGVkIiwiQ29sbGFwc2libGVCbG9ja0lubmVyU3R5bGVkIiwiQ29sbGFwc2libGVCbG9jayIsInRpdGxlIiwib25Ub2dnbGUiLCJvblRyYW5zaXRpb25FbmQiLCJpbm5lciIsInVzZVJlZiIsInVwZGF0ZUlubmVyIiwiY3VycmVudCIsImgiLCJvZmZzZXRIZWlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJ1c2VSZXNpemVEZXRlY3RvciIsInRhcmdldFJlZiIsIm9uUmVzaXplIiwic3RvcFByb3BhZ2F0aW9uIiwiTmFtZWRCbG9ja0NvbXBvbmVudCIsIml0ZW1Cb3JkZXJDb2xvciIsIk5hbWVkQmxvY2siLCJCbG9ja0xpc3RJdGVtIiwiU2VudGluYWxWaWV3Iiwic2VudGluYWwiLCJ3aXRoQ29sbGFwc2libGUiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJzZXRDb2xsYXBzZWQiLCJ1c2VTdGF0ZSIsInRvZ2dsZUNvbGxhcHNlZCIsImMiLCJ3aXRoUmVmIiwiRGVmYXVsdEJsb2NrRmFjdG9yeSIsImJsb2NrX3R5cGVzIiwiYnVpbGRlcnMiLCJyZWdpc3RlckJ1aWxkZXIiLCJidWlsZExpc3RJdGVtIiwiYnVpbGROYW1lZENvbnRlbnQiLCJidWlsZENvbnRlbnQiLCJidWlsZFNlY3Rpb24iLCJidWlsZExpc3QiLCJidWlsZFNwYW4iLCJidWlsZFNlbGVjdGFibGUiLCJidWlsZFN0cmVhbSIsInRhcmdldENsYXNzIiwiYnVpbGRlciIsImJpbmQiLCJqIiwibGVuZ3RoIiwiaGFuZGxlciIsIkVycm9yIiwiTmFtZWRCbG9ja1dpdGhDb2xsYXBzaWJsZSIsIk5hbWVkQmxvY2tXaXRoUmVmIiwiTGlzdEl0ZW1XaXRoQ29sbGFwc2libGUiLCJCbG9ja0xpc3RJdGVtV2l0aFJlZiIsIkNvbnRlbnRCbG9ja1dpdGhSZWYiLCJDb250ZW50U2VjdGlvbldpdGhSZWYiLCJCbG9ja0xpc3RXaXRoUmVmIiwiQ29udGVudFNwYW5XaXRoUmVmIiwiU2VudGluYWxXaXRoUmVmIiwiQmxvY2tTdHJlYW1XaXRoUmVmIl0sIm1hcHBpbmdzIjoiNFFBQXNCQSxFQUlPQyxLQUgzQkMsV0FBYSxJQUFJQyxJQUNqQkMsVUFFQSxXQUFBQyxDQUEyQkosR0FBQUssS0FBSUwsS0FBSkEsQ0FBZ0IsQ0FFcEMsYUFBQU0sQ0FBZUMsR0FDcEIsT0FBT0MsTUFBTUMsS0FBS0osS0FBS0osV0FDeEIsRUNORyxNQUFPUyxVQUFtQlgsRUFDdkJZLFVBQW9CLEVBQ3BCQyxlQUFnQyxLQUV2QyxXQUFBUixDQUFvQkosR0FDbEJhLE1BQU1iLEVBQ1AsQ0FFTSxhQUFBTSxDQUFlUSxHQUNwQixNQUFNYixFQUFhLElBQUlDLElBQUlXLE1BQU1QLGNBQWNRLElBTy9DLE9BTjRCLE9BQXhCVCxLQUFLTyxnQkFDUFgsRUFBV2MsSUFBSSxjQUViRCxJQUFrQlQsS0FBS08sZ0JBQ3pCWCxFQUFXYyxJ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
