// Converts the eight supplied Figma contexts into scoped, plain CSS React views.
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const source='docs/figma-auth', target='src/pages/auth';
fs.mkdirSync(target,{recursive:true});fs.mkdirSync('public/assets/auth',{recursive:true});
const rules=new Map(), assets=new Map();
const fixed={absolute:'position:absolute',relative:'position:relative',block:'display:block',flex:'display:flex',contents:'display:contents','flex-col':'flex-direction:column','flex-none':'flex:none','shrink-0':'flex-shrink:0','content-stretch':'align-content:stretch','items-center':'align-items:center','items-end':'align-items:flex-end','items-start':'align-items:flex-start','justify-center':'justify-content:center','h-full':'height:100%','size-full':'width:100%;height:100%','max-w-none':'max-width:none','min-w-px':'min-width:1px','inset-0':'inset:0','left-0':'left:0','right-0':'right:0','top-0':'top:0','top-px':'top:1px','left-1/2':'left:50%','top-1/2':'top:50%','-translate-x-1/2':'--auth-tx:-50%;translate:var(--auth-tx,0) var(--auth-ty,0)','-translate-y-1/2':'--auth-ty:-50%;translate:var(--auth-tx,0) var(--auth-ty,0)','overflow-clip':'overflow:clip','text-center':'text-align:center','whitespace-nowrap':'white-space:nowrap','not-italic':'font-style:normal','font-normal':'font-weight:400','font-semibold':'font-weight:600','font-black':'font-weight:900','text-white':'color:white','text-black':'color:black','bg-white':'background:white','bg-black':'background:black','border':'border-width:1px','border-2':'border-width:2px','border-solid':'border-style:solid','mb-0':'margin-bottom:0','cursor-pointer':'cursor:pointer','object-cover':'object-fit:cover','pointer-events-none':'pointer-events:none','underline':'text-decoration-line:underline','decoration-solid':'text-decoration-style:solid','decoration-from-font':'text-decoration-thickness:from-font','mask-intersect':'mask-composite:intersect','mask-luminance':'mask-mode:luminance','mask-no-clip':'mask-clip:no-clip','mask-no-repeat':'mask-repeat:no-repeat'};
function decl(c){
 if(fixed[c])return fixed[c];
 if(c.startsWith("font-['")){const [family,weight]=c.slice(7,-2).split(':');return `font-family:${family==='Arial'&&weight==='Black'?'"Arial Black"':family==='SF_Pro_Text'?'"SF Pro Text",Arial':`"${family}"`},sans-serif;font-weight:${{Black:900,Bold:700,Semi_Bold:600,Semibold:600,Regular:400}[weight]}`;}
 if(c.startsWith('['))return c.slice(1,-1);
 if(/^rotate-\d+$/.test(c))return `rotate:${c.slice(7)}deg`;
 const m=c.match(/^(.*?)\-\[(.*)\]$/);if(!m)throw Error(c);
 let [,k,v]=m;v=v.replaceAll('_',' ').replace(/calc\((.*?)\)/g,(_,s)=>`calc(${s.replace(/([+\-])/g,' $1 ')})`);
 if(k==='text')return /^(\d|hypot)/.test(v)?`font-size:${v}`:`color:${v.replace(/^color:/,'')}`;
 if(k==='size')return `width:${v};height:${v}`;
 if(k==='py')return `padding-top:${v};padding-bottom:${v}`;
 const props={h:'height',w:'width',bg:'background',border:'border-color',rounded:'border-radius',leading:'line-height',tracking:'letter-spacing',pl:'padding-left',pr:'padding-right',pt:'padding-top',gap:'gap',flex:'flex',rotate:'rotate',inset:'inset',top:'top',left:'left',bottom:'bottom','mask-position':'mask-position','mask-size':'mask-size'};
 if(!props[k])throw Error(c);return `${props[k]}:${v}`;
}
for(const file of fs.readdirSync(source).filter(f=>f.endsWith('.jsx'))){
 let code=fs.readFileSync(`${source}/${file}`,'utf8');
 const prefix=code.match(/const assetPathPrefix = "([^"]+)"/)[1];
 for(const m of code.matchAll(/\$\{assetPathPrefix\}\/([^`]+)`/g))assets.set(m[1],`${prefix}/${m[1]}`);
 code=code.replace(/const assetPathPrefix = "[^"]+"/,'const assetPathPrefix = "/assets/auth"');
 code=code.replace(/className="([^"]*)"/g,(_,s)=>{if(!rules.has(s))rules.set(s,{name:`auth-design-${rules.size}`,css:s.split(' ').map(decl).join(';')});return `className="${rules.get(s).name}"`;});
 code=code.replace(/export default function (\w+)\(\)/,'export default function $1({ui})').replace('return (','return enhance((').replace(/\);\s*}\s*$/,'), ui);\n}\n');
 fs.writeFileSync(`${target}/${file}`,`import React from 'react';\nimport {enhance} from './controls.jsx';\n${code}`);
}
fs.writeFileSync('src/styles/auth-design.css',[...rules.values()].map(r=>`.auth-page .${r.name}{${r.css}}`).join('\n')+'\n');
let downloaded=0;
for(const [name,url] of assets){const out=`public/assets/auth/${name}`;if(fs.existsSync(out)&&fs.statSync(out).size)continue;execFileSync('curl.exe',['-f','-sS','-L',url,'-o',out]);downloaded++;}
fs.writeFileSync(`${source}/assets.json`,JSON.stringify([...assets.keys()],null,2));
console.log({screens:8,cssRules:rules.size,assets:assets.size,downloaded});
