var Oe=Object.freeze(Object.defineProperty({__proto__:null,get default(){return Yt}},Symbol.toStringTag,{value:"Module"}));const et=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}};et();const m={};function tt(e){m.context=e}const nt=(e,t)=>e===t,P=Symbol("solid-proxy"),ve=Symbol("solid-track"),te={equals:nt};let De=je;const F={},O=1,ne=2,Be={owned:null,cleanups:null,context:null,owner:null};var w=null;let W=null,p=null,Y=null,x=null,S=null,ae=0;function T(e,t){const n=p,s=w,o=e.length===0?Be:{owned:null,cleanups:null,context:null,owner:t||s};w=o,p=null;try{return he(()=>e(()=>ye(o)),!0)}finally{p=n,w=s}}function se(e,t){t=t?Object.assign({},te,t):te;const n={value:e,observers:null,observerSlots:null,pending:F,comparator:t.equals||void 0},s=o=>(typeof o=="function"&&(o=o(n.pending!==F?n.pending:n.value)),de(n,o));return[Re.bind(n),s]}function $(e,t,n){const s=ge(e,t,!1,O);z(s)}function Me(e,t,n){De=lt;const s=ge(e,t,!1,O);s.user=!0,S?S.push(s):z(s)}function L(e,t,n){n=n?Object.assign({},te,n):te;const s=ge(e,t,!0,0);return s.pending=F,s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,z(s),Re.bind(s)}function Fe(e){if(Y)return e();let t;const n=Y=[];try{t=e()}finally{Y=null}return he(()=>{for(let s=0;s<n.length;s+=1){const o=n[s];if(o.pending!==F){const r=o.pending;o.pending=F,de(o,r)}}},!1),t}function X(e){let t,n=p;return p=null,t=e(),p=n,t}function st(e){Me(()=>X(e))}function ot(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}function Le(){return p}function Re(){const e=W;if(this.sources&&(this.state||e)){const t=x;x=null,this.state===O||e?z(this):oe(this),x=t}if(p){const t=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(t)):(p.sources=[this],p.sourceSlots=[t]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function de(e,t,n){if(Y)return e.pending===F&&Y.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let s=!1;return e.value=t,e.observers&&e.observers.length&&he(()=>{for(let o=0;o<e.observers.length;o+=1){const r=e.observers[o];s&&W.disposed.has(r),(s&&!r.tState||!s&&!r.state)&&(r.pure?x.push(r):S.push(r),r.observers&&Ge(r)),s||(r.state=O)}if(x.length>1e6)throw x=[],new Error},!1),t}function z(e){if(!e.fn)return;ye(e);const t=w,n=p,s=ae;p=w=e,rt(e,e.value,s),p=n,w=t}function rt(e,t,n){let s;try{s=e.fn(t)}catch(o){Ie(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?de(e,s):e.value=s,e.updatedAt=n)}function ge(e,t,n,s=O,o){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:null,pure:n};return w===null||w!==Be&&(w.owned?w.owned.push(r):w.owned=[r]),r}function H(e){const t=W;if(e.state===0||t)return;if(e.state===ne||t)return oe(e);if(e.suspense&&X(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ae);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===O||t)z(e);else if(e.state===ne||t){const o=x;x=null,oe(e,n[0]),x=o}}function he(e,t){if(x)return e();let n=!1;t||(x=[]),S?n=!0:S=[],ae++;try{const s=e();return it(n),s}catch(s){Ie(s)}finally{x=null,n||(S=null)}}function it(e){x&&(je(x),x=null),!e&&(S.length?Fe(()=>{De(S),S=null}):S=null)}function je(e){for(let t=0;t<e.length;t++)H(e[t])}function lt(e){let t,n=0;for(t=0;t<e.length;t++){const o=e[t];o.user?e[n++]=o:H(o)}m.context&&tt();const s=e.length;for(t=0;t<n;t++)H(e[t]);for(t=s;t<e.length;t++)H(e[t])}function oe(e,t){const n=W;e.state=0;for(let s=0;s<e.sources.length;s+=1){const o=e.sources[s];o.sources&&(o.state===O||n?o!==t&&H(o):(o.state===ne||n)&&oe(o,t))}}function Ge(e){const t=W;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=ne,s.pure?x.push(s):S.push(s),s.observers&&Ge(s))}}function ye(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const r=o.pop(),i=n.observerSlots.pop();s<o.length&&(r.sourceSlots[i]=s,o[s]=r,n.observerSlots[s]=i)}}if(e.owned){for(t=0;t<e.owned.length;t++)ye(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Ie(e){throw e}const ct=Symbol("fallback");function Ae(e){for(let t=0;t<e.length;t++)e[t]()}function ut(e,t,n={}){let s=[],o=[],r=[],i=0,l=t.length>1?[]:null;return ot(()=>Ae(r)),()=>{let u=e()||[],a,c;return u[ve],X(()=>{let g=u.length,_,E,k,C,D,A,f,d,h;if(g===0)i!==0&&(Ae(r),r=[],s=[],o=[],i=0,l&&(l=[])),n.fallback&&(s=[ct],o[0]=T(y=>(r[0]=y,n.fallback())),i=1);else if(i===0){for(o=new Array(g),c=0;c<g;c++)s[c]=u[c],o[c]=T(b);i=g}else{for(k=new Array(g),C=new Array(g),l&&(D=new Array(g)),A=0,f=Math.min(i,g);A<f&&s[A]===u[A];A++);for(f=i-1,d=g-1;f>=A&&d>=A&&s[f]===u[d];f--,d--)k[d]=o[f],C[d]=r[f],l&&(D[d]=l[f]);for(_=new Map,E=new Array(d+1),c=d;c>=A;c--)h=u[c],a=_.get(h),E[c]=a===void 0?-1:a,_.set(h,c);for(a=A;a<=f;a++)h=s[a],c=_.get(h),c!==void 0&&c!==-1?(k[c]=o[a],C[c]=r[a],l&&(D[c]=l[a]),c=E[c],_.set(h,c)):r[a]();for(c=A;c<g;c++)c in k?(o[c]=k[c],r[c]=C[c],l&&(l[c]=D[c],l[c](c))):o[c]=T(b);o=o.slice(0,i=g),s=u.slice(0)}return o});function b(g){if(r[c]=g,l){const[_,E]=se(c);return l[c]=E,t(u[c],_)}return t(u[c])}}}function N(e,t){return X(()=>e(t||{}))}function q(){return!0}const ft={get(e,t,n){return t===P?n:e.get(t)},has(e,t){return e.has(t)},set:q,deleteProperty:q,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:q,deleteProperty:q}},ownKeys(e){return e.keys()}};function at(e,...t){const n=new Set(t.flat()),s=Object.getOwnPropertyDescriptors(e),o=t.map(r=>{const i={};for(let l=0;l<r.length;l++){const u=r[l];Object.defineProperty(i,u,s[u]?s[u]:{get(){return e[u]},set(){return!0}})}return i});return o.push(new Proxy({get(r){return n.has(r)?void 0:e[r]},has(r){return n.has(r)?!1:r in e},keys(){return Object.keys(e).filter(r=>!n.has(r))}},ft)),o}function Ke(e){const t="fallback"in e&&{fallback:()=>e.fallback};return L(ut(()=>e.each,e.children,t||void 0))}const dt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],gt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...dt]),ht=new Set(["innerHTML","textContent","innerText","children"]),yt={className:"class",htmlFor:"for"},Se={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},pt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),mt=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),bt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function wt(e,t,n){let s=n.length,o=t.length,r=s,i=0,l=0,u=t[o-1].nextSibling,a=null;for(;i<o||l<r;){if(t[i]===n[l]){i++,l++;continue}for(;t[o-1]===n[r-1];)o--,r--;if(o===i){const c=r<s?l?n[l-1].nextSibling:n[r-l]:u;for(;l<r;)e.insertBefore(n[l++],c)}else if(r===l)for(;i<o;)(!a||!a.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[r-1]&&n[l]===t[o-1]){const c=t[--o].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--r],c),t[o]=n[r]}else{if(!a){a=new Map;let b=l;for(;b<r;)a.set(n[b],b++)}const c=a.get(t[i]);if(c!=null)if(l<c&&c<r){let b=i,g=1,_;for(;++b<o&&b<r&&!((_=a.get(t[b]))==null||_!==c+g);)g++;if(g>c-l){const E=t[i];for(;l<c;)e.insertBefore(n[l++],E)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}}const Ne="_$DX_DELEGATE";function xt(e,t,n){let s;return T(o=>{s=o,t===document?e():v(t,e(),t.firstChild?null:void 0,n)}),()=>{s(),t.textContent=""}}function K(e,t,n){const s=document.createElement("template");s.innerHTML=e;let o=s.content.firstChild;return n&&(o=o.firstChild),o}function Ve(e,t=window.document){const n=t[Ne]||(t[Ne]=new Set);for(let s=0,o=e.length;s<o;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,$t))}}function _t(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function At(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function St(e,t){t==null?e.removeAttribute("class"):e.className=t}function Nt(e,t,n,s){s?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,o=>n[0](n[1],o)):e.addEventListener(t,n)}function Et(e,t,n={}){const s=Object.keys(t||{}),o=Object.keys(n);let r,i;for(r=0,i=o.length;r<i;r++){const l=o[r];!l||l==="undefined"||t[l]||(Ee(e,l,!1),delete n[l])}for(r=0,i=s.length;r<i;r++){const l=s[r],u=!!t[l];!l||l==="undefined"||n[l]===u||!u||(Ee(e,l,!0),n[l]=u)}return n}function U(e,t,n={}){const s=e.style,o=typeof n=="string";if(t==null&&o||typeof t=="string")return s.cssText=t;o&&(s.cssText=void 0,n={}),t||(t={});let r,i;for(i in n)t[i]==null&&s.removeProperty(i),delete n[i];for(i in t)r=t[i],r!==n[i]&&(s.setProperty(i,r),n[i]=r);return n}function kt(e,t,n,s){typeof t=="function"?$(o=>Ce(e,t(),o,n,s)):Ce(e,t,void 0,n,s)}function v(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return R(e,t,s,n);$(o=>R(e,t(),o,n),s)}function Ct(e,t,n,s,o={},r=!1){t||(t={});for(const i in o)if(!(i in t)){if(i==="children")continue;ke(e,i,null,o[i],n,r)}for(const i in t){if(i==="children"){s||R(e,t.children);continue}const l=t[i];o[i]=ke(e,i,l,o[i],n,r)}}function Tt(e){let t,n;return!m.context||!(t=m.registry.get(n=Ot()))?e.cloneNode(!0):(m.completed&&m.completed.add(t),m.registry.delete(n),t)}function Pt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Ee(e,t,n){const s=t.trim().split(/\s+/);for(let o=0,r=s.length;o<r;o++)e.classList.toggle(s[o],n)}function ke(e,t,n,s,o,r){let i,l,u;if(t==="style")return U(e,n,s);if(t==="classList")return Et(e,n,s);if(n===s)return s;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:")e.addEventListener(t.slice(3),n);else if(t.slice(0,10)==="oncapture:")e.addEventListener(t.slice(10),n,!0);else if(t.slice(0,2)==="on"){const a=t.slice(2).toLowerCase(),c=pt.has(a);Nt(e,a,n,c),c&&Ve([a])}else if((u=ht.has(t))||!o&&(Se[t]||(l=gt.has(t)))||(i=e.nodeName.includes("-")))t==="class"||t==="className"?St(e,n):i&&!l&&!u?e[Pt(t)]=n:e[Se[t]||t]=n;else{const a=o&&t.indexOf(":")>-1&&bt[t.split(":")[0]];a?At(e,a,t,n):_t(e,yt[t]||t,n)}return n}function $t(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),m.registry&&!m.done&&(m.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n!==null;){const s=n[t];if(s&&!n.disabled){const o=n[`${t}Data`];if(o!==void 0?s(o,e):s(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function Ce(e,t,n={},s,o){return t||(t={}),!o&&"children"in t&&$(()=>n.children=R(e,t.children,n.children)),t.ref&&t.ref(e),$(()=>Ct(e,t,s,!0,n,!0)),n}function R(e,t,n,s,o){for(m.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,i=s!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(m.context)return n;if(r==="number"&&(t=t.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=M(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(m.context)return n;n=M(e,n,s)}else{if(r==="function")return $(()=>{let l=t();for(;typeof l=="function";)l=l();n=R(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[];if(le(l,t,o))return $(()=>n=R(e,l,n,s,!0)),()=>n;if(m.context){for(let u=0;u<l.length;u++)if(l[u].parentNode)return n=l}if(l.length===0){if(n=M(e,n,s),i)return n}else Array.isArray(n)?n.length===0?Te(e,l,s):wt(e,n,l):(n&&M(e),Te(e,l));n=l}else if(t instanceof Node){if(m.context&&t.parentNode)return n=i?[t]:t;if(Array.isArray(n)){if(i)return n=M(e,n,s,t);M(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function le(e,t,n){let s=!1;for(let o=0,r=t.length;o<r;o++){let i=t[o],l;if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))s=le(e,i)||s;else if((l=typeof i)=="string")e.push(document.createTextNode(i));else if(l==="function")if(n){for(;typeof i=="function";)i=i();s=le(e,Array.isArray(i)?i:[i])||s}else e.push(i),s=!0;else e.push(document.createTextNode(i.toString()))}return s}function Te(e,t,n){for(let s=0,o=t.length;s<o;s++)e.insertBefore(t[s],n)}function M(e,t,n,s){if(n===void 0)return e.textContent="";const o=s||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const u=l.parentNode===e;!r&&!i?u?e.replaceChild(o,l):e.insertBefore(o,n):u&&l.remove()}else r=!0}}else e.insertBefore(o,n);return[o]}function Ot(){const e=m.context;return`${e.id}${e.count++}`}const vt="http://www.w3.org/2000/svg";function Dt(e,t=!1){return t?document.createElementNS(vt,e):document.createElement(e)}function ie(e){const[t,n]=at(e,["component"]);return L(()=>{const s=t.component;switch(typeof s){case"function":return X(()=>s(n));case"string":const o=mt.has(s),r=m.context?Tt():Dt(s,o);return kt(r,n,o),r}})}const Bt=K('<span class="inline-sign"></span>'),Mt=e=>{const{branch:t}=e;return(()=>{const n=Bt.cloneNode(!0),s=t.ref;return typeof s=="function"?s(n):t.ref=n,n.style.setProperty("color","grey"),n.style.setProperty("display","inline-block"),v(n,()=>t.content),n})()};var pe=Object.freeze(Object.defineProperty({__proto__:null,default:Mt},Symbol.toStringTag,{value:"Module"}));const Ft=K('<span class="text"></span>'),Lt=e=>{const{branch:t}=e;return(()=>{const n=Ft.cloneNode(!0),s=t.ref;return typeof s=="function"?s(n):t.ref=n,n.style.setProperty("outline","none"),v(n,()=>t.content),n})()};var me=Object.freeze(Object.defineProperty({__proto__:null,default:Lt},Symbol.toStringTag,{value:"Module"}));const Rt=K('<span class="strikethrough"></span>'),jt={"./emphasis.tsx":Oe,"./sign.tsx":pe,"./text.tsx":me},Gt={"text-decoration":"line-through"},It=e=>{const{branch:t}=e;return(()=>{const n=Rt.cloneNode(!0);return U(n,Gt),v(n,()=>t.children.map((s,o)=>N(ie,{get component(){return jt["./"+s.type+".tsx"].default},branch:s}))),n})()};var Je=Object.freeze(Object.defineProperty({__proto__:null,default:It},Symbol.toStringTag,{value:"Module"}));const Kt=K('<span class="emphasis"></span>'),Vt={"./sign.tsx":pe,"./strikethrough.tsx":Je,"./text.tsx":me},Jt={"font-weight":"bolder",outline:"none"},Yt=e=>{const{branch:t}=e;return(()=>{const n=Kt.cloneNode(!0);return U(n,Jt),v(n,()=>t.children.map((s,o)=>N(ie,{get component(){return Vt["./"+s.type+".tsx"].default},branch:s}))),n})()};function ee(e){var t=new Error(e);return t.source="ulid",t}var be="0123456789ABCDEFGHJKMNPQRSTVWXYZ",Q=be.length,Pe=Math.pow(2,48)-1,Ht=10,Qt=16;function Ut(e){var t=Math.floor(e()*Q);return t===Q&&(t=Q-1),be.charAt(t)}function Wt(e,t){if(isNaN(e))throw new Error(e+" must be a number");if(e>Pe)throw ee("cannot encode time greater than "+Pe);if(e<0)throw ee("time must be positive");if(Number.isInteger(e)===!1)throw ee("time must be an integer");for(var n=void 0,s="";t>0;t--)n=e%Q,s=be.charAt(n)+s,e=(e-n)/Q;return s}function Xt(e,t){for(var n="";e>0;e--)n=Ut(t)+n;return n}function zt(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=arguments[1];t||(t=typeof window<"u"?window:null);var n=t&&(t.crypto||t.msCrypto);if(n)return function(){var o=new Uint8Array(1);return n.getRandomValues(o),o[0]/255};try{var s=require("crypto");return function(){return s.randomBytes(1).readUInt8()/255}}catch{}if(e){try{console.error("secure crypto unusable, falling back to insecure Math.random()!")}catch{}return function(){return Math.random()}}throw ee("secure crypto unusable, insecure Math.random not allowed")}function qt(e){return e||(e=zt()),function(n){return isNaN(n)&&(n=Date.now()),Wt(n,Ht)+Xt(Qt,e)}}var Ye=qt();const Z={"**":{reg:"\\*{2,2}(.+?)\\*{2,2}",type:"emphasis"},"~~":{reg:"~{2,2}(.+?)~{2,2}",type:"strikethrough"},"[]()":{reg:"\\[(.+?)\\]\\((.+?)\\)",type:"url"},"![]()":{reg:"!\\[(.+?)\\]\\((.+?)\\)",type:"image"}},ce=(e,t)=>{var n=[],s="",o=e.length;if(Object.keys(Z).forEach(r=>{const i=new RegExp(Z[r].reg),l=e.search(i);l>-1&&l<o&&(o=l,s=r)}),s!==""){const r=new RegExp("(^.*?)"+Z[s].reg),i=e.split(r);i.shift(),s!=="url"&&(n.push({type:"text",content:i[0],children:[]}),n.push({type:Z[s].type,content:i[1],sign:s,children:[]}),i[2]!==""&&(n=n.concat(ce(i[2]))))}else n.push({type:"text",content:e,children:[]});return t&&(n.splice(0,0,{type:"sign",content:t,children:[]}),n.push({type:"sign",content:t,children:[]})),n},He=e=>{var t;return e.sign?t=ce(e.content,e.sign):t=ce(e.content),e.children=t,t.forEach(n=>{n.type!=="text"&&n.type!=="sign"&&He(n)}),e},we=Symbol("store-raw"),re=Symbol("store-node"),Zt=Symbol("store-name");function Qe(e,t){let n=e[P];if(!n){Object.defineProperty(e,P,{value:n=new Proxy(e,nn)});const s=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let r=0,i=s.length;r<i;r++){const l=s[r];if(o[l].get){const u=o[l].get.bind(n);Object.defineProperty(e,l,{get:u})}}}return n}function j(e){return e!=null&&typeof e=="object"&&(e[P]||!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function G(e,t=new Set){let n,s,o,r;if(n=e!=null&&e[we])return n;if(!j(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let i=0,l=e.length;i<l;i++)o=e[i],(s=G(o,t))!==o&&(e[i]=s)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const i=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let u=0,a=i.length;u<a;u++)r=i[u],!l[r].get&&(o=e[r],(s=G(o,t))!==o&&(e[r]=s))}return e}function xe(e){let t=e[re];return t||Object.defineProperty(e,re,{value:t={}}),t}function ue(e,t,n){return e[t]||(e[t]=We(n,!0))}function en(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===P||t===re||t===Zt||(delete n.value,delete n.writable,n.get=()=>e[P][t]),n}function Ue(e){if(Le()){const t=xe(e);(t._||(t._=We()))()}}function tn(e){return Ue(e),Reflect.ownKeys(e)}function We(e,t){const[n,s]=se(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=s,n}const nn={get(e,t,n){if(t===we)return e;if(t===P)return n;if(t===ve)return Ue(e);const s=xe(e),o=s[t];let r=o?s[t]():e[t];if(t===re||t==="__proto__")return r;if(!o){const i=Object.getOwnPropertyDescriptor(e,t);Le()&&(typeof r!="function"||e.hasOwnProperty(t))&&!(i&&i.get)&&(r=ue(s,t,r)())}return j(r)?Qe(r):r},set(){return!0},deleteProperty(){return!0},ownKeys:tn,getOwnPropertyDescriptor:en};function I(e,t,n){if(e[t]===n)return;const s=e[t],o=e.length;n===void 0?delete e[t]:e[t]=n;let r=xe(e),i;(i=ue(r,t,s))&&i.$(()=>n),Array.isArray(e)&&e.length!==o&&(i=ue(r,"length",o))&&i.$(e.length),(i=r._)&&i.$()}function sn(e,t){const n=Object.keys(t);for(let s=0;s<n.length;s+=1){const o=n[s];I(e,o,t[o])}}function on(e,t){if(typeof t=="function"&&(t=t(e)),t=G(t),e===t)return;let n=0,s=t.length;for(;n<s;n++){const o=t[n];e[n]!==o&&I(e,n,o)}I(e,"length",s)}function V(e,t,n=[]){let s,o=e;if(t.length>1){s=t.shift();const i=typeof s,l=Array.isArray(e);if(Array.isArray(s)){for(let u=0;u<s.length;u++)V(e,[s[u]].concat(t),n);return}else if(l&&i==="function"){for(let u=0;u<e.length;u++)s(e[u],u)&&V(e,[u].concat(t),n);return}else if(l&&i==="object"){const{from:u=0,to:a=e.length-1,by:c=1}=s;for(let b=u;b<=a;b+=c)V(e,[b].concat(t),n);return}else if(t.length>1){V(e[s],t,[s].concat(n));return}o=e[s],n=[s].concat(n)}let r=t[0];typeof r=="function"&&(r=r(o,n),r===o)||s===void 0&&r==null||(r=G(r),s===void 0||j(o)&&j(r)&&!Array.isArray(r)?sn(o,r):I(e,s,r))}function _e(e,t){const n=G(e||{}),s=Array.isArray(n),o=Qe(n);function r(...i){Fe(()=>{s&&i.length===1?on(n,i[0]):V(n,i)})}return[o,r]}const Xe={get(e,t){if(t===we)return e;const n=e[t];return j(n)?new Proxy(n,Xe):n},set(e,t,n){return I(e,t,G(n)),!0},deleteProperty(e,t){return I(e,t,void 0),!0}};function fe(e){return t=>(j(t)&&e(new Proxy(t,Xe)),t)}const rn=(e,t)=>({id:e,config:{indent:0,type:t},data:{text:""}});console.log(Ye());const ln=[{id:"01G4FQHW27SQ4AYTNTQV1E7PND",config:{indent:0,type:"H1"},data:{text:"Block Style Editor"}},{id:"01G5NWJ7P2EBTWADXT9ABQQTS7",config:{indent:0,type:"Text"},data:{text:"GFM\u3001\u30D6\u30ED\u30C3\u30AF\u5358\u4F4D\u306E\u63CF\u753B\u3001\u5148\u982D\u8981\u7D20\u306F\u5373\u5EA7\u306B\u5909\u63DB\u3002"}},{id:"01G5NWK5FC5A3MBJK2MTYZ92J5",config:{indent:0,type:"Text"},data:{text:"\u3053\u308C\u304C**1\u56DE\u76EE\u306E\u5F37\u8ABF**\u3002\u3053\u308C\u304C**2\u56DE~~\u76EE~~\u306E**\u5F37\u8ABF\u3002\u9589\u3058\u3066\u306A\u3044**\u5F37\u8ABF\u3067\u3059\u3002"}},{id:"01G5JBTCC1JN8S3G4T8AA2FP2J",config:{indent:0,type:"Code"},data:{text:`#include<iostream>
using namespace std;

int main(){
  cout << "Hello Editor !" << endl;
}`,language:"cpp"}},{id:"01G5PB8BXGW8F5A6CGMD147F07",config:{indent:0,type:"List"},data:{text:"List\u30D6\u30ED\u30C3\u30AF\u306F\u88FD\u4F5C\u4E2D"}},{id:"01G5PB8HYVNE8YQ527PZSXD94A",config:{indent:0,type:"Text"},data:{text:"\u4F8B\u3048\u3070\u30D6\u30ED\u30C3\u30AF\u306E\u5148\u982D\u3067\u300C### \u300D\u3068\u5165\u529B\u3059\u308C\u3070h3\u30D6\u30ED\u30C3\u30AF\u306B\u5909\u63DB\u3055\u308C\u308B"}},{id:"01G5PB8R161RT048NVJQPKKQVK",config:{indent:0,type:"Text"},data:{text:""}}],cn=(e,t)=>({get:o=>t.find(r=>r.id===o)})[e],un=(e,t)=>({patch:(i,l)=>{t(u=>u.id===i,l)},patchData:(i,l)=>{t(u=>u.id===i,fe(u=>u.data=l))},add:(i,l)=>{t(fe(u=>{u.push(rn(i,l))}))}})[e],fn=()=>{const[e,t]=_e(ln);return{block_getters:o=>cn(o,JSON.parse(JSON.stringify(e))),block_mutations:o=>un(o,t)}};var ze=T(fn);const an=[{id:"01G5KAR1FY949SY0R2DV4RGR7M",blocks:["01G5NWK5FC5A3MBJK2MTYZ92J5"]}],dn=(e,t)=>({get:o=>t.find(r=>r.id===o)})[e],gn=(e,t)=>({add:(o,r,i)=>{t(l=>l.id===o,fe(l=>{const u=l.blocks.findIndex(a=>a===r);l.blocks.splice(u+1,0,i)}))}})[e],hn=()=>{const[e,t]=_e(an);return{paragraph_getters:o=>dn(o,JSON.parse(JSON.stringify(e))),paragraph_mutations:o=>gn(o,t)}};var qe=T(hn);const yn=(e,t)=>({focus:()=>t.focus})[e],pn=(e,t)=>({patchFocus:o=>{t("focus",o)}})[e],mn=()=>{const[e,t]=_e({focus:"none"});return{system_getters:o=>yn(o,e),system_mutations:o=>pn(o,t)}};var bn=T(mn);const wn=K('<div class="text-block-base"><div contenteditable class="text-block-textarea"></div></div>'),xn={"./Components/textarea/emphasis.tsx":Oe,"./Components/textarea/sign.tsx":pe,"./Components/textarea/strikethrough.tsx":Je,"./Components/textarea/text.tsx":me},$e={base:{width:"100%",display:"flex"},textarea:{width:"100%",outline:"none",position:"relative",zIndex:"1"}},J=e=>{var t=[];return(e.type==="text"||e.type==="sign")&&t.push(e.ref),e.children.length>0&&e.children.forEach(n=>{t=t.concat(J(n))}),t},_n=e=>{const{block_getters:t,block_mutations:n}=ze,{paragraph_mutations:s}=qe,{system_getters:o,system_mutations:r}=bn,i=L(()=>t("get")(e.id)),[l,u]=se(i().data.text),a=L(()=>He({type:"root",content:l(),children:[]})),[c,b]=se(0);var g=void 0;st(()=>{g?.focus()}),Me(()=>{a(),g.childNodes.forEach(f=>{f.nodeName.includes("BR")&&g?.removeChild(f),f.nodeType===3&&g?.removeChild(f)})});const _=()=>{if(g?.childNodes.length===1)return J(a())[0];var f=0,d;const h=J(a());var y=0;if(c()===g.innerText.length)return h[h.length-1];for(const B of h){if(f+=B?.innerText.length||0,f>c()){y!==0?d=h[y]:d=h[0];break}y++}return d?.childNodes.length===0&&d.appendChild(document.createTextNode("")),d?.childNodes[0]},E=()=>{if(g?.childNodes.length===1&&c()===0&&g?.childNodes[0].nodeValue===null)return 1;var f=0,d=0,h=0;const y=J(a());for(const B of y){if(d+=B?.innerText.length||0,d>c()){h=c()-f;break}else c()===g.innerText.length&&(h=c()-f);f+=B?.innerText.length||0}return h},k=()=>{const f=window.getSelection(),d=document.createRange();d.setStart(_(),E()),d.collapse(!0),f.removeAllRanges(),f.addRange(d)},C=()=>{const f=window.getSelection();var d=0,h=0;return J(a()).forEach(y=>{f?.anchorNode?.parentElement===y&&(h=d+(f?.anchorNode?.nodeValue===`
`?0:f?.anchorOffset||0)),d+=y?.innerText.length||0}),h},D=()=>{b(C()),n("patch")(e.id,{text:g.innerText}),u(g.innerText),k()},A=f=>{if(f.key==="Enter"){f.preventDefault();const d=Ye();n("add")(d,"Text"),s("add")("01G5KAR1FY949SY0R2DV4RGR7M",e.id,d)}f.key==="Backspace"&&C()===0&&window.getSelection()?.anchorOffset===window.getSelection()?.focusOffset&&f.preventDefault(),f.key,f.key};return(()=>{const f=wn.cloneNode(!0),d=f.firstChild;d.$$keydown=y=>A(y),d.$$input=()=>D(),d.$$mouseover=()=>r("patchFocus")(e.id);const h=g;return typeof h=="function"?h(d):g=d,v(d,N(Ke,{get each(){return a().children},children:y=>N(ie,{get component(){return xn["./Components/textarea/"+y.type+".tsx"].default},branch:y})})),$(y=>{const B=$e.base,Ze=$e.textarea;return y._v$=U(f,B,y._v$),y._v$2=U(d,Ze,y._v$2),y},{_v$:void 0,_v$2:void 0}),f})()};Ve(["mouseover","input","keydown"]);var An=Object.freeze(Object.defineProperty({__proto__:null,default:_n},Symbol.toStringTag,{value:"Module"}));const Sn={"./Text/TextBase.tsx":An},Nn=e=>{const{block_getters:t}=ze,n=L(s=>s?s.config.type!==t("get")(e.id).config.type?t("get")(e.id):s:t("get")(e.id));return N(ie,{get component(){return Sn["./"+n().config.type+"/"+n().config.type+"Base.tsx"].default},get id(){return e.id}})},En=()=>{const{paragraph_getters:e}=qe,t=L(()=>e("get")("01G5KAR1FY949SY0R2DV4RGR7M"));return N(Ke,{get each(){return t().blocks},children:n=>N(Nn,{id:n})})},kn=K("<div></div>"),Cn=()=>(()=>{const e=kn.cloneNode(!0);return e.style.setProperty("width","80%"),e.style.setProperty("left","10%"),e.style.setProperty("position","relative"),v(e,N(En,{})),e})(),Tn=()=>N(Cn,{});xt(()=>N(Tn,{}),document.getElementById("root"));
