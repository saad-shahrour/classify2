(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const he="modulepreload",_e=function(e,t){return new URL(e,t).href},te={},se=function(t,s,a){if(!s||s.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(s.map(n=>{if(n=_e(n,a),n in te)return;te[n]=!0;const o=n.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!a)for(let c=r.length-1;c>=0;c--){const p=r[c];if(p.href===n&&(!o||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${l}`))return;const i=document.createElement("link");if(i.rel=o?"stylesheet":he,o||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),o)return new Promise((c,p)=>{i.addEventListener("load",c),i.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t()).catch(n=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n})};var K=new Intl.Collator(0,{numeric:1}).compare;function ne(e,t,s){return e=e.split("."),t=t.split("."),K(e[0],t[0])||K(e[1],t[1])||(t[2]=t.slice(2).join("."),s=/[.-]/.test(e[2]=e.slice(2).join(".")),s==/[.-]/.test(t[2])?K(e[2],t[2]):s?-1:1)}function H(e){if(e.startsWith("http")){const{protocol:t,host:s}=new URL(e);return s.endsWith("hf.space")?{ws_protocol:"wss",host:s,http_protocol:t}:{ws_protocol:t==="https:"?"wss":"ws",http_protocol:t,host:s}}return{ws_protocol:"wss",http_protocol:"https:",host:e}}const le=/^[^\/]*\/[^\/]*$/,me=/.*hf\.space\/{0,1}$/;async function we(e,t){const s={};t&&(s.Authorization=`Bearer ${t}`);const a=e.trim();if(le.test(a))try{const r=await fetch(`https://huggingface.co/api/spaces/${a}/host`,{headers:s});if(r.status!==200)throw new Error("Space metadata could not be loaded.");const n=(await r.json()).host;return{space_id:e,...H(n)}}catch(r){throw new Error("Space metadata could not be loaded."+r.message)}if(me.test(a)){const{ws_protocol:r,http_protocol:n,host:o}=H(a);return{space_id:o.replace(".hf.space",""),ws_protocol:r,http_protocol:n,host:o}}return{space_id:!1,...H(a)}}function ye(e){let t={};return e.forEach(({api_name:s},a)=>{s&&(t[s]=a)}),t}const be=/^(?=[^]*\b[dD]iscussions{0,1}\b)(?=[^]*\b[dD]isabled\b)[^]*$/;async function re(e){try{const s=(await fetch(`https://huggingface.co/api/spaces/${e}/discussions`,{method:"HEAD"})).headers.get("x-error-message");return!(s&&be.test(s))}catch{return!1}}const ve="This application is too busy. Keep trying!",F="Connection errored out.";let de;function Se(e){return{post_data:t,upload_files:s,client:a,handle_blob:r};async function t(n,o,l){const f={"Content-Type":"application/json"};l&&(f.Authorization=`Bearer ${l}`);try{var i=await e(n,{method:"POST",body:JSON.stringify(o),headers:f})}catch{return[{error:F},500]}return[await i.json(),i.status]}async function s(n,o,l){const f={};l&&(f.Authorization=`Bearer ${l}`);const i=new FormData;o.forEach(h=>{i.append("files",h)});try{var c=await e(`${n}/upload`,{method:"POST",body:i,headers:f})}catch{return{error:F}}return{files:await c.json()}}async function a(n,o={normalise_files:!0}){return new Promise(async l=>{const{status_callback:f,hf_token:i,normalise_files:c}=o,p={predict:ge,submit:Z,view_api:ee},h=c??!0;if(typeof window>"u"||!("WebSocket"in window)){const d=await se(()=>import("./wrapper-6f348d45-38be7a64.js"),["./wrapper-6f348d45-38be7a64.js","./__vite-browser-external-b25bb000.js"],import.meta.url);de=(await se(()=>import("./__vite-browser-external-b25bb000.js"),[],import.meta.url)).Blob,global.WebSocket=d.WebSocket}const{ws_protocol:L,http_protocol:N,host:D,space_id:I}=await we(n,i),T=Math.random().toString(36).substring(2),fe={};let _,k={},G=!1;i&&I&&(G=await Ne(I,i));async function Y(d){_=d,k=ye((d==null?void 0:d.dependencies)||[]);try{j=await ee(_)}catch(S){console.error(`Could not get api details: ${S.message}`)}return{config:_,...p}}let j;async function pe(d){if(f&&f(d),d.status==="running")try{_=await ue(e,`${N}//${D}`,i);const S=await Y(_);l(S)}catch(S){console.error(S),f&&f({status:"error",message:"Could not load this space.",load_status:"error",detail:"NOT_FOUND"})}}try{_=await ue(e,`${N}//${D}`,i);const d=await Y(_);l(d)}catch(d){console.error(d),I?X(I,le.test(I)?"space_name":"subdomain",pe):f&&f({status:"error",message:"Could not load this space.",load_status:"error",detail:"NOT_FOUND"})}function ge(d,S,q){let u=!1,O=!1;return new Promise((y,m)=>{const P=Z(d,S,q);P.on("data",E=>{u=!0,O&&P.destroy(),y(E)}).on("status",E=>{E.stage==="error"&&m(E),E.stage==="complete"&&u&&P.destroy(),E.stage==="complete"&&(O=!0)})})}function Z(d,S,q){let u,O;if(typeof d=="number")u=d,O=j.unnamed_endpoints[u];else{const g=d.replace(/^\//,"");u=k[g],O=j.named_endpoints[d.trim()]}if(typeof u!="number")throw new Error("There is no endpoint matching that name of fn_index matching that number.");let y;const m=typeof d=="number"?"/predict":d;let P,E=!1;const R={};r(`${N}//${D+_.path}`,S,O,i).then(g=>{if(P={data:g||[],event_data:q,fn_index:u},Be(u,_))$({type:"status",endpoint:m,stage:"pending",queue:!1,fn_index:u,time:new Date}),t(`${N}//${D+_.path}/run${m.startsWith("/")?m:`/${m}`}`,{...P,session_hash:T},i).then(([w,b])=>{const v=h?oe(w.data,O,_.root,_.root_url):w.data;b==200?($({type:"data",endpoint:m,fn_index:u,data:v,time:new Date}),$({type:"status",endpoint:m,fn_index:u,stage:"complete",eta:w.average_duration,queue:!1,time:new Date})):$({type:"status",stage:"error",endpoint:m,fn_index:u,message:w.error,queue:!1,time:new Date})}).catch(w=>{$({type:"status",stage:"error",message:w.message,endpoint:m,fn_index:u,queue:!1,time:new Date})});else{$({type:"status",stage:"pending",queue:!0,endpoint:m,fn_index:u,time:new Date});let w=new URL(`${L}://${D}${_.path}
							/queue/join`);G&&w.searchParams.set("__sign",G),y=new WebSocket(w),y.onclose=b=>{b.wasClean||$({type:"status",stage:"error",message:F,queue:!0,endpoint:m,fn_index:u,time:new Date})},y.onmessage=function(b){const v=JSON.parse(b.data),{type:A,status:B,data:M}=De(v,fe[u]);if(A==="update"&&B&&!E)$({type:"status",endpoint:m,fn_index:u,time:new Date,...B}),B.stage==="error"&&y.close();else if(A==="hash"){y.send(JSON.stringify({fn_index:u,session_hash:T}));return}else A==="data"?y.send(JSON.stringify({...P,session_hash:T})):A==="complete"?E=B:A==="generating"&&$({type:"status",time:new Date,...B,stage:B==null?void 0:B.stage,queue:!0,endpoint:m,fn_index:u});M&&($({type:"data",time:new Date,data:h?oe(M.data,O,_.root,_.root_url):M.data,endpoint:m,fn_index:u}),E&&($({type:"status",time:new Date,...E,stage:B==null?void 0:B.stage,queue:!0,endpoint:m,fn_index:u}),y.close()))},ne(_.version||"2.0.0","3.6")<0&&addEventListener("open",()=>y.send(JSON.stringify({hash:T})))}});function $(g){const b=R[g.type]||[];b==null||b.forEach(v=>v(g))}function x(g,w){const b=R,v=b[g]||[];return b[g]=v,v==null||v.push(w),{on:x,off:U,cancel:J,destroy:W}}function U(g,w){const b=R;let v=b[g]||[];return v=v==null?void 0:v.filter(A=>A!==w),b[g]=v,{on:x,off:U,cancel:J,destroy:W}}async function J(){const g={stage:"complete",queue:!1,time:new Date};E=g,$({...g,type:"status",endpoint:m,fn_index:u}),y&&y.readyState===0?y.addEventListener("open",()=>{y.close()}):y.close();try{await e(`${N}//${D+_.path}/reset`,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({fn_index:u,session_hash:T})})}catch{console.warn("The `/reset` endpoint could not be called. Subsequent endpoint results may be unreliable.")}}function W(){for(const g in R)R[g].forEach(w=>{U(g,w)})}return{on:x,off:U,cancel:J,destroy:W}}async function ee(d){if(j)return j;const S={"Content-Type":"application/json"};i&&(S.Authorization=`Bearer ${i}`);let q;if(ne(d.version||"2.0.0","3.30")<0?q=await e("https://gradio-space-api-fetcher-v2.hf.space/api",{method:"POST",body:JSON.stringify({serialize:!1,config:JSON.stringify(d)}),headers:S}):q=await e(`${d.root}/info`,{headers:S}),!q.ok)throw new Error(F);let u=await q.json();return"api"in u&&(u=u.api),u.named_endpoints["/predict"]&&!u.unnamed_endpoints[0]&&(u.unnamed_endpoints[0]=u.named_endpoints["/predict"]),$e(u,d,k)}})}async function r(n,o,l,f){const i=await Q(o,void 0,[],!0,l);return Promise.all(i.map(async({path:c,blob:p,data:h,type:L})=>{if(p){const N=(await s(n,[p],f)).files[0];return{path:c,file_url:N,type:L}}else return{path:c,base64:h,type:L}})).then(c=>(c.forEach(({path:p,file_url:h,base64:L,type:N})=>{if(L)V(o,L,p);else if(N==="Gallery")V(o,h,p);else if(h){const D={is_file:!0,name:`${h}`,data:null};V(o,D,p)}}),o))}}const{post_data:Le,upload_files:Pe,client:Ee,handle_blob:Ae}=Se(fetch);function oe(e,t,s,a){return e.map((r,n)=>{var o,l,f,i;return((l=(o=t.returns)==null?void 0:o[n])==null?void 0:l.component)==="File"?C(r,s,a):((i=(f=t.returns)==null?void 0:f[n])==null?void 0:i.component)==="Gallery"?r.map(c=>Array.isArray(c)?[C(c[0],s,a),c[1]]:[C(c,s,a),null]):typeof r=="object"&&r.is_file?C(r,s,a):r})}function C(e,t,s){if(e==null)return null;if(typeof e=="string")return{name:"file_data",data:e};if(Array.isArray(e)){const a=[];for(const r of e)r===null?a.push(null):a.push(C(r,t,s));return a}else e.is_file&&(s?e.data="/proxy="+s+"file="+e.name:e.data=t+"/file="+e.name);return e}function ae(e,t,s,a){switch(e.type){case"string":return"string";case"boolean":return"boolean";case"number":return"number"}if(s==="JSONSerializable"||s==="StringSerializable")return"any";if(s==="ListStringSerializable")return"string[]";if(t==="Image")return a==="parameter"?"Blob | File | Buffer":"string";if(s==="FileSerializable")return(e==null?void 0:e.type)==="array"?a==="parameter"?"(Blob | File | Buffer)[]":"{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}[]":a==="parameter"?"Blob | File | Buffer":"{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}";if(s==="GallerySerializable")return a==="parameter"?"[(Blob | File | Buffer), (string | null)][]":"[{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}, (string | null))][]"}function ie(e,t){return t==="GallerySerializable"?"array of [file, label] tuples":t==="ListStringSerializable"?"array of strings":t==="FileSerializable"?"array of files or single file":e.description}function $e(e,t,s){const a={named_endpoints:{},unnamed_endpoints:{}};for(const r in e){const n=e[r];for(const o in n){const l=t.dependencies[o]?o:s[o.replace("/","")],f=n[o];a[r][o]={},a[r][o].parameters={},a[r][o].returns={},a[r][o].type=t.dependencies[l].types,a[r][o].parameters=f.parameters.map(({label:i,component:c,type:p,serializer:h})=>({label:i,component:c,type:ae(p,c,h,"parameter"),description:ie(p,h)})),a[r][o].returns=f.returns.map(({label:i,component:c,type:p,serializer:h})=>({label:i,component:c,type:ae(p,c,h,"return"),description:ie(p,h)}))}}return a}async function Ne(e,t){try{return(await(await fetch(`https://huggingface.co/api/spaces/${e}/jwt`,{headers:{Authorization:`Bearer ${t}`}})).json()).token||!1}catch(s){return console.error(s),!1}}function V(e,t,s){for(;s.length>1;)e=e[s.shift()];e[s.shift()]=t}async function Q(e,t=void 0,s=[],a=!1,r=void 0){if(Array.isArray(e)){let n=[];return await Promise.all(e.map(async(o,l)=>{var f;let i=s.slice();i.push(l);const c=await Q(e[l],a?((f=r==null?void 0:r.parameters[l])==null?void 0:f.component)||void 0:t,i,!1,r);n=n.concat(c)})),n}else if(globalThis.Buffer&&e instanceof globalThis.Buffer){const n=t==="Image";return[{path:s,blob:n?!1:new de([e]),data:n?`${e.toString("base64")}`:!1,type:t}]}else if(e instanceof Blob||typeof window<"u"&&e instanceof File)if(t==="Image"){let n;if(typeof window<"u")n=await Oe(e);else{const o=await e.arrayBuffer();n=Buffer.from(o).toString("base64")}return[{path:s,data:n,type:t}]}else return[{path:s,blob:e,type:t}];else if(typeof e=="object"){let n=[];for(let o in e)if(e.hasOwnProperty(o)){let l=s.slice();l.push(o),n=n.concat(await Q(e[o],void 0,l,!1,r))}return n}else return[]}function Oe(e){return new Promise((t,s)=>{const a=new FileReader;a.onloadend=()=>t(a.result),a.readAsDataURL(e)})}function Be(e,t){var s,a,r,n;return!(((a=(s=t==null?void 0:t.dependencies)==null?void 0:s[e])==null?void 0:a.queue)===null?t.enable_queue:(n=(r=t==null?void 0:t.dependencies)==null?void 0:r[e])!=null&&n.queue)||!1}async function ue(e,t,s){const a={};if(s&&(a.Authorization=`Bearer ${s}`),typeof window<"u"&&window.gradio_config&&location.origin!=="http://localhost:9876"){const r=window.gradio_config.root,n=window.gradio_config;return n.root=t+n.root,{...n,path:r}}else if(t){let r=await e(`${t}/config`,{headers:a});if(r.status===200){const n=await r.json();return n.path=n.path??"",n.root=t,n}else throw new Error("Could not get config.")}throw new Error("No config or app endpoint found")}async function X(e,t,s){let a=t==="subdomain"?`https://huggingface.co/api/spaces/by-subdomain/${e}`:`https://huggingface.co/api/spaces/${e}`,r,n;try{if(r=await fetch(a),n=r.status,n!==200)throw new Error;r=await r.json()}catch{s({status:"error",load_status:"error",message:"Could not get space status",detail:"NOT_FOUND"});return}if(!r||n!==200)return;const{runtime:{stage:o},id:l}=r;switch(o){case"STOPPED":case"SLEEPING":s({status:"sleeping",load_status:"pending",message:"Space is asleep. Waking it up...",detail:o}),setTimeout(()=>{X(e,t,s)},1e3);break;case"PAUSED":s({status:"paused",load_status:"error",message:"This space has been paused by the author. If you would like to try this demo, consider duplicating the space.",detail:o,discussions_enabled:await re(l)});break;case"RUNNING":case"RUNNING_BUILDING":s({status:"running",load_status:"complete",message:"",detail:o});break;case"BUILDING":s({status:"building",load_status:"pending",message:"Space is building...",detail:o}),setTimeout(()=>{X(e,t,s)},1e3);break;default:s({status:"space_error",load_status:"error",message:"This space is experiencing an issue.",detail:o,discussions_enabled:await re(l)});break}}function De(e,t){switch(e.msg){case"send_data":return{type:"data"};case"send_hash":return{type:"hash"};case"queue_full":return{type:"update",status:{queue:!0,message:ve,stage:"error",code:e.code,success:e.success}};case"estimation":return{type:"update",status:{queue:!0,stage:t||"pending",code:e.code,size:e.queue_size,position:e.rank,eta:e.rank_eta,success:e.success}};case"progress":return{type:"update",status:{queue:!0,stage:"pending",code:e.code,progress_data:e.progress_data,success:e.success}};case"process_generating":return{type:"generating",status:{queue:!0,message:e.success?null:e.output.error,stage:e.success?"generating":"error",code:e.code,progress_data:e.progress_data,eta:e.average_duration},data:e.success?e.output:null};case"process_completed":return"error"in e.output?{type:"update",status:{queue:!0,message:e.output.error,stage:"error",code:e.code,success:e.success}}:{type:"complete",status:{queue:!0,message:e.success?void 0:e.output.error,stage:e.success?"complete":"error",code:e.code,progress_data:e.progress_data,eta:e.output.average_duration},data:e.success?e.output:null};case"process_starts":return{type:"update",status:{queue:!0,stage:"pending",code:e.code,size:e.rank,position:0,success:e.success}}}return{type:"none",status:{stage:"error",queue:!0}}}const qe=document.getElementById("input");let z,ce=document.getElementById("img");qe.addEventListener("change",async e=>{const t=e.target.files[0],s=new Blob([t],{type:t==null?void 0:t.type});z=await(await Ee("https://saadshahrour-classification2.hf.space/")).predict("/predict",[s]);let r=new FileReader;r.onloadend=n=>{ce.src=r.result},r.readAsDataURL(t),console.log(ce),document.getElementById("app").innerHTML+=`
  <h2> the image is for a ${z==null?void 0:z.data[0].label} </h2>
  `,document.getElementById("img").style.display="block"});
