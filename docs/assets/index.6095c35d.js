var Ge=Object.freeze(Object.defineProperty({__proto__:null,get default(){return zt}},Symbol.toStringTag,{value:"Module"}));const it=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}};it();const m={};function lt(e){m.context=e}const ct=(e,t)=>e===t,B=Symbol("solid-proxy"),Ie=Symbol("solid-track"),le={equals:ct};let Ke=He;const G={},M=1,ce=2,Ve={owned:null,cleanups:null,context:null,owner:null};var x=null;let q=null,h=null,X=null,_=null,E=null,we=0;function D(e,t){const n=h,r=x,s=e.length===0?Ve:{owned:null,cleanups:null,context:null,owner:t||r};x=s,h=null;try{return Ae(()=>e(()=>Se(s)),!0)}finally{h=n,x=r}}function $(e,t){t=t?Object.assign({},le,t):le;const n={value:e,observers:null,observerSlots:null,pending:G,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.pending!==G?n.pending:n.value)),xe(n,s));return[Qe.bind(n),r]}function O(e,t,n){const r=_e(e,t,!1,M);ne(r)}function I(e,t,n){Ke=gt;const r=_e(e,t,!1,M);r.user=!0,E?E.push(r):ne(r)}function ee(e,t,n){n=n?Object.assign({},le,n):le;const r=_e(e,t,!0,0);return r.pending=G,r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,ne(r),Qe.bind(r)}function Ye(e){if(X)return e();let t;const n=X=[];try{t=e()}finally{X=null}return Ae(()=>{for(let r=0;r<n.length;r+=1){const s=n[r];if(s.pending!==G){const o=s.pending;s.pending=G,xe(s,o)}}},!1),t}function te(e){let t,n=h;return h=null,t=e(),h=n,t}function ut(e){I(()=>te(e))}function ft(e){return x===null||(x.cleanups===null?x.cleanups=[e]:x.cleanups.push(e)),e}function Je(){return h}function Qe(){const e=q;if(this.sources&&(this.state||e)){const t=_;_=null,this.state===M||e?ne(this):ue(this),_=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function xe(e,t,n){if(X)return e.pending===G&&X.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let r=!1;return e.value=t,e.observers&&e.observers.length&&Ae(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s];r&&q.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?_.push(o):E.push(o),o.observers&&Ue(o)),r||(o.state=M)}if(_.length>1e6)throw _=[],new Error},!1),t}function ne(e){if(!e.fn)return;Se(e);const t=x,n=h,r=we;h=x=e,at(e,e.value,r),h=n,x=t}function at(e,t,n){let r;try{r=e.fn(t)}catch(s){We(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?xe(e,r):e.value=r,e.updatedAt=n)}function _e(e,t,n,r=M,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:x,context:null,pure:n};return x===null||x!==Ve&&(x.owned?x.owned.push(o):x.owned=[o]),o}function z(e){const t=q;if(e.state===0||t)return;if(e.state===ce||t)return ue(e);if(e.suspense&&te(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<we);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===M||t)ne(e);else if(e.state===ce||t){const s=_;_=null,ue(e,n[0]),_=s}}function Ae(e,t){if(_)return e();let n=!1;t||(_=[]),E?n=!0:E=[],we++;try{const r=e();return dt(n),r}catch(r){We(r)}finally{_=null,n||(E=null)}}function dt(e){_&&(He(_),_=null),!e&&(E.length?Ye(()=>{Ke(E),E=null}):E=null)}function He(e){for(let t=0;t<e.length;t++)z(e[t])}function gt(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:z(s)}m.context&&lt();const r=e.length;for(t=0;t<n;t++)z(e[t]);for(t=r;t<e.length;t++)z(e[t])}function ue(e,t){const n=q;e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(s.state===M||n?s!==t&&z(s):(s.state===ce||n)&&ue(s,t))}}function Ue(e){const t=q;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=ce,r.pure?_.push(r):E.push(r),r.observers&&Ue(r))}}function Se(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),i=n.observerSlots.pop();r<s.length&&(o.sourceSlots[i]=r,s[r]=o,n.observerSlots[r]=i)}}if(e.owned){for(t=0;t<e.owned.length;t++)Se(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function We(e){throw e}const ht=Symbol("fallback");function ve(e){for(let t=0;t<e.length;t++)e[t]()}function yt(e,t,n={}){let r=[],s=[],o=[],i=0,l=t.length>1?[]:null;return ft(()=>ve(o)),()=>{let c=e()||[],f,u;return c[Ie],te(()=>{let y=c.length,N,g,k,F,R,S,w,T,C;if(y===0)i!==0&&(ve(o),o=[],r=[],s=[],i=0,l&&(l=[])),n.fallback&&(r=[ht],s[0]=D(de=>(o[0]=de,n.fallback())),i=1);else if(i===0){for(s=new Array(y),u=0;u<y;u++)r[u]=c[u],s[u]=D(b);i=y}else{for(k=new Array(y),F=new Array(y),l&&(R=new Array(y)),S=0,w=Math.min(i,y);S<w&&r[S]===c[S];S++);for(w=i-1,T=y-1;w>=S&&T>=S&&r[w]===c[T];w--,T--)k[T]=s[w],F[T]=o[w],l&&(R[T]=l[w]);for(N=new Map,g=new Array(T+1),u=T;u>=S;u--)C=c[u],f=N.get(C),g[u]=f===void 0?-1:f,N.set(C,u);for(f=S;f<=w;f++)C=r[f],u=N.get(C),u!==void 0&&u!==-1?(k[u]=s[f],F[u]=o[f],l&&(R[u]=l[f]),u=g[u],N.set(C,u)):o[f]();for(u=S;u<y;u++)u in k?(s[u]=k[u],o[u]=F[u],l&&(l[u]=R[u],l[u](u))):s[u]=D(b);s=s.slice(0,i=y),r=c.slice(0)}return s});function b(y){if(o[u]=y,l){const[N,g]=$(u);return l[u]=g,t(c[u],N)}return t(c[u])}}}function P(e,t){return te(()=>e(t||{}))}function re(){return!0}const pt={get(e,t,n){return t===B?n:e.get(t)},has(e,t){return e.has(t)},set:re,deleteProperty:re,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:re,deleteProperty:re}},ownKeys(e){return e.keys()}};function mt(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),s=t.map(o=>{const i={};for(let l=0;l<o.length;l++){const c=o[l];Object.defineProperty(i,c,r[c]?r[c]:{get(){return e[c]},set(){return!0}})}return i});return s.push(new Proxy({get(o){return n.has(o)?void 0:e[o]},has(o){return n.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!n.has(o))}},pt)),s}function Xe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return ee(yt(()=>e.each,e.children,t||void 0))}const bt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],wt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...bt]),xt=new Set(["innerHTML","textContent","innerText","children"]),_t={className:"class",htmlFor:"for"},$e={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},At=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),St=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),Nt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Tt(e,t,n){let r=n.length,s=t.length,o=r,i=0,l=0,c=t[s-1].nextSibling,f=null;for(;i<s||l<o;){if(t[i]===n[l]){i++,l++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===i){const u=o<r?l?n[l-1].nextSibling:n[o-l]:c;for(;l<o;)e.insertBefore(n[l++],u)}else if(o===l)for(;i<s;)(!f||!f.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[o-1]&&n[l]===t[s-1]){const u=t[--s].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--o],u),t[s]=n[o]}else{if(!f){f=new Map;let b=l;for(;b<o;)f.set(n[b],b++)}const u=f.get(t[i]);if(u!=null)if(l<u&&u<o){let b=i,y=1,N;for(;++b<s&&b<o&&!((N=f.get(t[b]))==null||N!==u+y);)y++;if(y>u-l){const g=t[i];for(;l<u;)e.insertBefore(n[l++],g)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}}const Oe="_$DX_DELEGATE";function Et(e,t,n){let r;return D(s=>{r=s,t===document?e():L(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function H(e,t,n){const r=document.createElement("template");r.innerHTML=e;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function ze(e,t=window.document){const n=t[Oe]||(t[Oe]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,Lt))}}function kt(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Pt(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function Ct(e,t){t==null?e.removeAttribute("class"):e.className=t}function vt(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,s=>n[0](n[1],s)):e.addEventListener(t,n)}function $t(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let o,i;for(o=0,i=s.length;o<i;o++){const l=s[o];!l||l==="undefined"||t[l]||(De(e,l,!1),delete n[l])}for(o=0,i=r.length;o<i;o++){const l=r[o],c=!!t[l];!l||l==="undefined"||n[l]===c||!c||(De(e,l,!0),n[l]=c)}return n}function K(e,t,n={}){const r=e.style,s=typeof n=="string";if(t==null&&s||typeof t=="string")return r.cssText=t;s&&(r.cssText=void 0,n={}),t||(t={});let o,i;for(i in n)t[i]==null&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function Ot(e,t,n,r){typeof t=="function"?O(s=>Me(e,t(),s,n,r)):Me(e,t,void 0,n,r)}function L(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return V(e,t,r,n);O(s=>V(e,t(),s,n),r)}function Dt(e,t,n,r,s={},o=!1){t||(t={});for(const i in s)if(!(i in t)){if(i==="children")continue;Be(e,i,null,s[i],n,o)}for(const i in t){if(i==="children"){r||V(e,t.children);continue}const l=t[i];s[i]=Be(e,i,l,s[i],n,o)}}function Bt(e){let t,n;return!m.context||!(t=m.registry.get(n=Ft()))?e.cloneNode(!0):(m.completed&&m.completed.add(t),m.registry.delete(n),t)}function Mt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function De(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,o=r.length;s<o;s++)e.classList.toggle(r[s],n)}function Be(e,t,n,r,s,o){let i,l,c;if(t==="style")return K(e,n,r);if(t==="classList")return $t(e,n,r);if(n===r)return r;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:")e.addEventListener(t.slice(3),n);else if(t.slice(0,10)==="oncapture:")e.addEventListener(t.slice(10),n,!0);else if(t.slice(0,2)==="on"){const f=t.slice(2).toLowerCase(),u=At.has(f);vt(e,f,n,u),u&&ze([f])}else if((c=xt.has(t))||!s&&($e[t]||(l=wt.has(t)))||(i=e.nodeName.includes("-")))t==="class"||t==="className"?Ct(e,n):i&&!l&&!c?e[Mt(t)]=n:e[$e[t]||t]=n;else{const f=s&&t.indexOf(":")>-1&&Nt[t.split(":")[0]];f?Pt(e,f,t,n):kt(e,_t[t]||t,n)}return n}function Lt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),m.registry&&!m.done&&(m.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n!==null;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r(s,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function Me(e,t,n={},r,s){return t||(t={}),!s&&"children"in t&&O(()=>n.children=V(e,t.children,n.children)),t.ref&&t.ref(e),O(()=>Dt(e,t,r,!0,n,!0)),n}function V(e,t,n,r,s){for(m.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,i=r!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(m.context)return n;if(o==="number"&&(t=t.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=j(e,n,r,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(m.context)return n;n=j(e,n,r)}else{if(o==="function")return O(()=>{let l=t();for(;typeof l=="function";)l=l();n=V(e,l,n,r)}),()=>n;if(Array.isArray(t)){const l=[];if(he(l,t,s))return O(()=>n=V(e,l,n,r,!0)),()=>n;if(m.context){for(let c=0;c<l.length;c++)if(l[c].parentNode)return n=l}if(l.length===0){if(n=j(e,n,r),i)return n}else Array.isArray(n)?n.length===0?Le(e,l,r):Tt(e,n,l):(n&&j(e),Le(e,l));n=l}else if(t instanceof Node){if(m.context&&t.parentNode)return n=i?[t]:t;if(Array.isArray(n)){if(i)return n=j(e,n,r,t);j(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function he(e,t,n){let r=!1;for(let s=0,o=t.length;s<o;s++){let i=t[s],l;if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))r=he(e,i)||r;else if((l=typeof i)=="string")e.push(document.createTextNode(i));else if(l==="function")if(n){for(;typeof i=="function";)i=i();r=he(e,Array.isArray(i)?i:[i])||r}else e.push(i),r=!0;else e.push(document.createTextNode(i.toString()))}return r}function Le(e,t,n){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function j(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(s!==l){const c=l.parentNode===e;!o&&!i?c?e.replaceChild(s,l):e.insertBefore(s,n):c&&l.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}function Ft(){const e=m.context;return`${e.id}${e.count++}`}const Rt="http://www.w3.org/2000/svg";function jt(e,t=!1){return t?document.createElementNS(Rt,e):document.createElement(e)}function ae(e){const[t,n]=mt(e,["component"]);return ee(()=>{const r=t.component;switch(typeof r){case"function":return te(()=>r(n));case"string":const s=St.has(r),o=m.context?Bt():jt(r,s);return Ot(o,n,s),o}})}const Gt=H('<span class="inline-sign"></span>'),ge={visible:{color:"grey",display:"inline-block"},invisible:{color:"grey",display:"inline-block",height:"0px",width:"0px",opacity:0,overflow:"hidden"}},It=e=>{const{branch:t}=e,[n,r]=$(ge.visible);return I(()=>{e.visible()?r(ge.visible):r(ge.invisible)}),(()=>{const s=Gt.cloneNode(!0),o=t.ref;return typeof o=="function"?o(s):t.ref=s,L(s,()=>t.content),O(i=>K(s,n(),i)),s})()};var Ne=Object.freeze(Object.defineProperty({__proto__:null,default:It},Symbol.toStringTag,{value:"Module"}));const Kt=H('<span class="text"></span>'),Vt=e=>{const{branch:t}=e;return(()=>{const n=Kt.cloneNode(!0),r=t.ref;return typeof r=="function"?r(n):t.ref=n,n.style.setProperty("outline","none"),L(n,()=>t.content),n})()};var Te=Object.freeze(Object.defineProperty({__proto__:null,default:Vt},Symbol.toStringTag,{value:"Module"}));const Yt=H('<span class="strikethrough"></span>'),Jt={"./emphasis.tsx":Ge,"./sign.tsx":Ne,"./text.tsx":Te},Qt={"text-decoration":"line-through"},Ht=e=>{const[t,n]=$(!1);return I(()=>{e.lengthTree.start<=e.caret()&&e.lengthTree.end>=e.caret()?n(!0):n(!1)}),(()=>{const r=Yt.cloneNode(!0);return K(r,Qt),L(r,()=>e.branch.children.map((s,o)=>P(ae,{get component(){return Jt["./"+s.type+".tsx"].default},branch:s,get caret(){return e.caret},get lengthTree(){return e.lengthTree.children[o]},visible:t}))),r})()};var Ze=Object.freeze(Object.defineProperty({__proto__:null,default:Ht},Symbol.toStringTag,{value:"Module"}));const Ut=H('<span class="emphasis"></span>'),Wt={"./sign.tsx":Ne,"./strikethrough.tsx":Ze,"./text.tsx":Te},Xt={"font-weight":"bolder",outline:"none"},zt=e=>{const[t,n]=$(!1);return I(()=>{e.lengthTree.start<=e.caret()&&e.lengthTree.end>=e.caret()?n(!0):n(!1)}),(()=>{const r=Ut.cloneNode(!0);return K(r,Xt),L(r,()=>e.branch.children.map((s,o)=>P(ae,{get component(){return Wt["./"+s.type+".tsx"].default},branch:s,get caret(){return e.caret},get lengthTree(){return e.lengthTree.children[o]},visible:t}))),r})()};function oe(e){var t=new Error(e);return t.source="ulid",t}var Ee="0123456789ABCDEFGHJKMNPQRSTVWXYZ",Z=Ee.length,Fe=Math.pow(2,48)-1,Zt=10,qt=16;function en(e){var t=Math.floor(e()*Z);return t===Z&&(t=Z-1),Ee.charAt(t)}function tn(e,t){if(isNaN(e))throw new Error(e+" must be a number");if(e>Fe)throw oe("cannot encode time greater than "+Fe);if(e<0)throw oe("time must be positive");if(Number.isInteger(e)===!1)throw oe("time must be an integer");for(var n=void 0,r="";t>0;t--)n=e%Z,r=Ee.charAt(n)+r,e=(e-n)/Z;return r}function nn(e,t){for(var n="";e>0;e--)n=en(t)+n;return n}function rn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=arguments[1];t||(t=typeof window<"u"?window:null);var n=t&&(t.crypto||t.msCrypto);if(n)return function(){var s=new Uint8Array(1);return n.getRandomValues(s),s[0]/255};try{var r=require("crypto");return function(){return r.randomBytes(1).readUInt8()/255}}catch{}if(e){try{console.error("secure crypto unusable, falling back to insecure Math.random()!")}catch{}return function(){return Math.random()}}throw oe("secure crypto unusable, insecure Math.random not allowed")}function sn(e){return e||(e=rn()),function(n){return isNaN(n)&&(n=Date.now()),tn(n,Zt)+nn(qt,e)}}var on=sn();const se={"**":{reg:"\\*{2,2}(.+?)\\*{2,2}",type:"emphasis"},"~~":{reg:"~{2,2}(.+?)~{2,2}",type:"strikethrough"},"[]()":{reg:"\\[(.+?)\\]\\((.+?)\\)",type:"url"},"![]()":{reg:"!\\[(.+?)\\]\\((.+?)\\)",type:"image"}},ye=(e,t)=>{var n=[],r="",s=e.length;if(Object.keys(se).forEach(o=>{const i=new RegExp(se[o].reg),l=e.search(i);l>-1&&l<s&&(s=l,r=o)}),r!==""){const o=new RegExp("(^.*?)"+se[r].reg),i=e.split(o);i.shift(),r!=="url"&&(n.push({type:"text",content:i[0],children:[]}),n.push({type:se[r].type,content:i[1],sign:r,children:[]}),i[2]!==""&&(n=n.concat(ye(i[2]))))}else n.push({type:"text",content:e,children:[]});return t&&(n.splice(0,0,{type:"sign",content:t,children:[]}),n.push({type:"sign",content:t,children:[]})),n},ie=e=>{var t;return e.sign?t=ye(e.content,e.sign):t=ye(e.content),e.children=t,t.forEach(n=>{n.type!=="text"&&n.type!=="sign"&&ie(n)}),e},ke=Symbol("store-raw"),fe=Symbol("store-node"),ln=Symbol("store-name");function qe(e,t){let n=e[B];if(!n){Object.defineProperty(e,B,{value:n=new Proxy(e,fn)});const r=Object.keys(e),s=Object.getOwnPropertyDescriptors(e);for(let o=0,i=r.length;o<i;o++){const l=r[o];if(s[l].get){const c=s[l].get.bind(n);Object.defineProperty(e,l,{get:c})}}}return n}function Y(e){return e!=null&&typeof e=="object"&&(e[B]||!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function J(e,t=new Set){let n,r,s,o;if(n=e!=null&&e[ke])return n;if(!Y(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let i=0,l=e.length;i<l;i++)s=e[i],(r=J(s,t))!==s&&(e[i]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const i=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let c=0,f=i.length;c<f;c++)o=i[c],!l[o].get&&(s=e[o],(r=J(s,t))!==s&&(e[o]=r))}return e}function Pe(e){let t=e[fe];return t||Object.defineProperty(e,fe,{value:t={}}),t}function pe(e,t,n){return e[t]||(e[t]=tt(n,!0))}function cn(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===B||t===fe||t===ln||(delete n.value,delete n.writable,n.get=()=>e[B][t]),n}function et(e){if(Je()){const t=Pe(e);(t._||(t._=tt()))()}}function un(e){return et(e),Reflect.ownKeys(e)}function tt(e,t){const[n,r]=$(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=r,n}const fn={get(e,t,n){if(t===ke)return e;if(t===B)return n;if(t===Ie)return et(e);const r=Pe(e),s=r[t];let o=s?r[t]():e[t];if(t===fe||t==="__proto__")return o;if(!s){const i=Object.getOwnPropertyDescriptor(e,t);Je()&&(typeof o!="function"||e.hasOwnProperty(t))&&!(i&&i.get)&&(o=pe(r,t,o)())}return Y(o)?qe(o):o},set(){return!0},deleteProperty(){return!0},ownKeys:un,getOwnPropertyDescriptor:cn};function Q(e,t,n){if(e[t]===n)return;const r=e[t],s=e.length;n===void 0?delete e[t]:e[t]=n;let o=Pe(e),i;(i=pe(o,t,r))&&i.$(()=>n),Array.isArray(e)&&e.length!==s&&(i=pe(o,"length",s))&&i.$(e.length),(i=o._)&&i.$()}function an(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const s=n[r];Q(e,s,t[s])}}function dn(e,t){if(typeof t=="function"&&(t=t(e)),t=J(t),e===t)return;let n=0,r=t.length;for(;n<r;n++){const s=t[n];e[n]!==s&&Q(e,n,s)}Q(e,"length",r)}function U(e,t,n=[]){let r,s=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)U(e,[r[c]].concat(t),n);return}else if(l&&i==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&U(e,[c].concat(t),n);return}else if(l&&i==="object"){const{from:c=0,to:f=e.length-1,by:u=1}=r;for(let b=c;b<=f;b+=u)U(e,[b].concat(t),n);return}else if(t.length>1){U(e[r],t,[r].concat(n));return}s=e[r],n=[r].concat(n)}let o=t[0];typeof o=="function"&&(o=o(s,n),o===s)||r===void 0&&o==null||(o=J(o),r===void 0||Y(s)&&Y(o)&&!Array.isArray(o)?an(s,o):Q(e,r,o))}function Ce(e,t){const n=J(e||{}),r=Array.isArray(n),s=qe(n);function o(...i){Ye(()=>{r&&i.length===1?dn(n,i[0]):U(n,i)})}return[s,o]}const nt={get(e,t){if(t===ke)return e;const n=e[t];return Y(n)?new Proxy(n,nt):n},set(e,t,n){return Q(e,t,J(n)),!0},deleteProperty(e,t){return Q(e,t,void 0),!0}};function me(e){return t=>(Y(t)&&e(new Proxy(t,nt)),t)}const Re=(e,t,n)=>({id:e,config:{indent:0,type:t},data:{text:n||""}}),gn=[{id:"01G4FQHW27SQ4AYTNTQV1E7PND",config:{indent:0,type:"Text"},data:{text:"Block Style Editor"}},{id:"01G5NWJ7P2EBTWADXT9ABQQTS7",config:{indent:0,type:"Text"},data:{text:"GFM\u3001\u30D6\u30ED\u30C3\u30AF\u5358\u4F4D\u306E\u63CF\u753B\u3001\u5148\u982D\u8981\u7D20\u306F\u5373\u5EA7\u306B\u5909\u63DB\u3002"}},{id:"01G5NWK5FC5A3MBJK2MTYZ92J5",config:{indent:0,type:"Text"},data:{text:"\u3053\u308C\u304C**1\u56DE\u76EE\u306E\u5F37\u8ABF**\u3002\u3053\u308C\u304C**2\u56DE~~\u76EE~~\u306E**\u5F37\u8ABF\u3002\u9589\u3058\u3066\u306A\u3044**\u5F37\u8ABF\u3067\u3059\u3002"}},{id:"01G5JBTCC1JN8S3G4T8AA2FP2J",config:{indent:0,type:"Text"},data:{text:`#include<iostream>
using namespace std;

int main(){
  cout << "Hello Editor !" << endl;
}`,language:"cpp"}},{id:"01G5PB8BXGW8F5A6CGMD147F07",config:{indent:0,type:"Text"},data:{text:"List\u30D6\u30ED\u30C3\u30AF\u306F\u88FD\u4F5C\u4E2D"}},{id:"01G5PB8HYVNE8YQ527PZSXD94A",config:{indent:0,type:"Text"},data:{text:"\u958B\u767A\u4E2D"}},{id:"01G5PB8R161RT048NVJQPKKQVK",config:{indent:0,type:"Text"},data:{text:""}}],hn=(e,t)=>({get:s=>t.find(o=>o.id===s)})[e],yn=(e,t)=>({patch:(i,l)=>{t(c=>c.id===i,l)},patchData:(i,l)=>{t(c=>c.id===i,me(c=>c.data=l))},add:(i,l,c)=>{t(me(f=>{c?f.push(Re(i,l,c)):f.push(Re(i,l))}))}})[e],pn=()=>{const[e,t]=Ce(gn);return{block_getters:s=>hn(s,JSON.parse(JSON.stringify(e))),block_mutations:s=>yn(s,t)}};var rt=D(pn);const mn=[{id:"01G5KAR1FY949SY0R2DV4RGR7M",blocks:["01G5PB8HYVNE8YQ527PZSXD94A","01G5NWK5FC5A3MBJK2MTYZ92J5"]}],bn=(e,t)=>({get:s=>t.find(o=>o.id===s)})[e],wn=(e,t)=>({add:(s,o,i)=>{t(l=>l.id===s,me(l=>{const c=l.blocks.findIndex(f=>f===o);l.blocks.splice(c+1,0,i)}))}})[e],xn=()=>{const[e,t]=Ce(mn);return{paragraph_getters:s=>bn(s,JSON.parse(JSON.stringify(e))),paragraph_mutations:s=>wn(s,t)}};var st=D(xn);const _n=(e,t)=>({focus:()=>t.focus,caretPosition:()=>t.caretPosition})[e],An=(e,t)=>({patchFocus:o=>{t("focus",o)},patchCaretPosition:o=>{t("caretPosition",o)}})[e],Sn=()=>{const[e,t]=Ce({focus:"none",caretPosition:0});return{system_getters:s=>_n(s,e),system_mutations:s=>An(s,t)}};var Nn=D(Sn);const Tn=H('<div class="text-block-base"><div contenteditable class="text-block-textarea"></div></div>'),En={"./Components/textarea/emphasis.tsx":Ge,"./Components/textarea/sign.tsx":Ne,"./Components/textarea/strikethrough.tsx":Ze,"./Components/textarea/text.tsx":Te},je={base:{width:"100%",display:"flex"},textarea:{width:"100%",outline:"none",position:"relative",zIndex:"1"}},W=e=>{var t=[];return(e.type==="text"||e.type==="sign")&&t.push(e.ref),e.children.length>0&&e.children.forEach(n=>{t=t.concat(W(n))}),t},be=(e,t=0)=>{const n=o=>o.sign?2*o.sign.length+o.content.length:o.content.length;var r={start:t,end:t+n(e),children:[]},s=t||0;return r.children=e.children.map((o,i)=>(s+=i>0?n(e.children[i-1]):0,be(o,s))),r},kn=e=>{const{block_getters:t,block_mutations:n}=rt,{paragraph_getters:r,paragraph_mutations:s}=st,{system_getters:o,system_mutations:i}=Nn,l=ee(()=>t("get")(e.id)),[c,f]=$(ie({type:"root",content:l().data.text,children:[]})),[u,b]=$(0),[y,N]=$(be(c()));var g=void 0;I(()=>{o("focus")()===e.id&&g?.focus()}),I(()=>{c(),g.childNodes.forEach(a=>{a.nodeName.includes("BR")&&g?.removeChild(a),a.nodeType===3&&g?.removeChild(a)})}),ut(()=>{N(be(c()))});const k=a=>{const d=a?w()+a:w();b(d),i("patchCaretPosition")(d)},F=()=>{if(g?.childNodes.length===1)return W(c())[0]?.childNodes[0];var a=0,d;const A=W(c());if(u()===g.innerText.length)return A[A.length-1]?.childNodes[0];var p=0;for(const v of A){if(a+=v?.innerText.length||0,a>u()){p!==0?d=A[p]:d=A[0];break}p++}return d?.childNodes.length===0&&d.appendChild(document.createTextNode("")),d?.childNodes[0]},R=()=>{if(g?.childNodes.length===1&&u()===0&&g?.childNodes[0].nodeValue===null)return 1;var a=0,d=0,A=0;const p=W(c());for(const v of p){if(d+=v?.innerText.length||0,d>u()){A=u()-a;break}else u()===g.innerText.length&&(A=u()-a);a+=v?.innerText.length||0}return A},S=()=>{const a=window.getSelection(),d=document.createRange();d.setStart(F(),R()),d.collapse(!0),a.removeAllRanges(),a.addRange(d)},w=()=>{const a=window.getSelection();var d=0,A=0;return W(c()).forEach(p=>{a?.anchorNode?.parentElement===p&&(A=d+(a?.anchorNode?.nodeValue===`
`?0:a?.anchorOffset||0)),d+=p?.innerText.length||0}),A},T=()=>{k(),n("patch")(e.id,{text:g.innerText}),f(ie({type:"root",content:g.innerText,children:[]})),S()},C=a=>{if(a.key==="Enter"){a.preventDefault();const d=on();u()!==g.innerText.length?(n("add")(d,"Text",g.innerText.substring(u())),n("patch")(e.id,{text:g.innerText.substring(0,u())}),f(ie({type:"root",content:g.innerText.substring(0,u()),children:[]})),S()):n("add")(d,"Text"),s("add")("01G5KAR1FY949SY0R2DV4RGR7M",e.id,d)}a.key==="Backspace"&&w()===0&&window.getSelection()?.anchorOffset===window.getSelection()?.focusOffset&&(a.preventDefault(),console.log(r("previous")(e.id))),a.key==="ArrowLeft"&&w()>0&&k(-1),a.key==="ArrowRight"&&w()<g.innerText.length&&k(1),a.key,a.key},de=()=>{k()};return(()=>{const a=Tn.cloneNode(!0),d=a.firstChild;d.$$click=()=>de(),d.$$keydown=p=>C(p),d.$$input=()=>T(),d.addEventListener("focus",()=>i("patchFocus")(e.id));const A=g;return typeof A=="function"?A(d):g=d,L(d,P(Xe,{get each(){return c().children},children:(p,v)=>P(ae,{get component(){return En["./Components/textarea/"+p.type+".tsx"].default},branch:p,caret:u,get lengthTree(){return y().children[v()]}})})),O(p=>{const v=je.base,ot=je.textarea;return p._v$=K(a,v,p._v$),p._v$2=K(d,ot,p._v$2),p},{_v$:void 0,_v$2:void 0}),a})()};ze(["input","keydown","click"]);var Pn=Object.freeze(Object.defineProperty({__proto__:null,default:kn},Symbol.toStringTag,{value:"Module"}));const Cn={"./Text/TextBase.tsx":Pn},vn=e=>{const{block_getters:t}=rt,n=ee(r=>r?r.config.type!==t("get")(e.id).config.type?t("get")(e.id):r:t("get")(e.id));return P(ae,{get component(){return Cn["./"+n().config.type+"/"+n().config.type+"Base.tsx"].default},get id(){return e.id}})},$n=()=>{const{paragraph_getters:e}=st,t=ee(()=>e("get")("01G5KAR1FY949SY0R2DV4RGR7M"));return P(Xe,{get each(){return t().blocks},children:(n,r)=>P(vn,{id:n})})},On=H("<div></div>"),Dn=()=>(()=>{const e=On.cloneNode(!0);return e.style.setProperty("width","80%"),e.style.setProperty("left","10%"),e.style.setProperty("position","relative"),L(e,P($n,{})),e})(),Bn=()=>P(Dn,{});Et(()=>P(Bn,{}),document.getElementById("root"));