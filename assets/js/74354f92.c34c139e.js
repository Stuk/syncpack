"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[737],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>y});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)t=p[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)t=p[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=a.createContext({}),c=function(e){var n=a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=c(e.components);return a.createElement(d.Provider,{value:n},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,p=e.originalType,d=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),s=c(t),u=r,y=s["".concat(d,".").concat(u)]||s[u]||m[u]||p;return t?a.createElement(y,o(o({ref:n},l),{},{components:t})):a.createElement(y,o({ref:n},l))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var p=t.length,o=new Array(p);o[0]=u;var i={};for(var d in n)hasOwnProperty.call(n,d)&&(i[d]=n[d]);i.originalType=e,i[s]="string"==typeof e?e:r,o[1]=i;for(var c=2;c<p;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},7309:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>m,frontMatter:()=>p,metadata:()=>i,toc:()=>c});var a=t(7462),r=(t(7294),t(3905));const p={id:"dependency-types",title:"dependencyTypes"},o=void 0,i={unversionedId:"config/dependency-types",id:"config/dependency-types",title:"dependencyTypes",description:"All of the default dependency types are enabled by default,",source:"@site/docs/config/dependency-types.md",sourceDirName:"config",slug:"/config/dependency-types",permalink:"/syncpack/config/dependency-types",draft:!1,editUrl:"https://github.com/JamieMason/syncpack/tree/master/site/docs/config/dependency-types.md",tags:[],version:"current",lastUpdatedBy:"Jamie Mason",lastUpdatedAt:1676635874,formattedLastUpdatedAt:"Feb 17, 2023",frontMatter:{id:"dependency-types",title:"dependencyTypes"},sidebar:"docs",previous:{title:"customTypes",permalink:"/syncpack/config/custom-types"},next:{title:"filter",permalink:"/syncpack/config/filter"}},d={},c=[{value:"Default dependency types",id:"default-dependency-types",level:2},{value:"The <code>workspace</code> type",id:"the-workspace-type",level:2}],l={toc:c},s="wrapper";function m(e){let{components:n,...t}=e;return(0,r.kt)(s,(0,a.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"All of the ",(0,r.kt)("a",{parentName:"p",href:"#dependency-types"},"default dependency types")," are enabled by default,\nbut can be reduced to a smaller list via the ",(0,r.kt)("inlineCode",{parentName:"p"},"dependencyTypes")," property of your\nconfig file."),(0,r.kt)("p",null,"In this example, only dependencies found in the\n",(0,r.kt)("a",{parentName:"p",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#dependencies"},(0,r.kt)("inlineCode",{parentName:"a"},"dependencies")),"\nand\n",(0,r.kt)("a",{parentName:"p",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#devDependencies"},(0,r.kt)("inlineCode",{parentName:"a"},"devDependencies")),"\nproperties of package.json files will be inspected by syncpack:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "dependencyTypes": ["dev", "prod"]\n}\n')),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("a",{parentName:"p",href:"#dependency-types"},"default dependency types")," can be extended with your own\n",(0,r.kt)("a",{parentName:"p",href:"/syncpack/config/custom-types"},(0,r.kt)("inlineCode",{parentName:"a"},"customTypes")),", so you can find and fix versions found in\nother parts of your package.json files.")),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Your ",(0,r.kt)("inlineCode",{parentName:"p"},"dependencyTypes")," configuration in your ",(0,r.kt)("a",{parentName:"p",href:"/syncpack/config-file"},"config file"),"\ncan be overridden on an ad hoc basis using the ",(0,r.kt)("a",{parentName:"p",href:"/syncpack/option/types"},(0,r.kt)("inlineCode",{parentName:"a"},"--types")),"\noption.")),(0,r.kt)("h2",{id:"default-dependency-types"},"Default dependency types"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Property in package.json"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"dev")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#devDependencies"},(0,r.kt)("inlineCode",{parentName:"a"},"devDependencies")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"overrides")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides"},(0,r.kt)("inlineCode",{parentName:"a"},"overrides")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"peer")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#peerDependencies"},(0,r.kt)("inlineCode",{parentName:"a"},"peerDependencies")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"pnpmOverrides")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://pnpm.io/package_json#pnpmoverrides"},(0,r.kt)("inlineCode",{parentName:"a"},"pnpm.overrides")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"prod")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#dependencies"},(0,r.kt)("inlineCode",{parentName:"a"},"dependencies")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"resolutions")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#resolutions"},(0,r.kt)("inlineCode",{parentName:"a"},"resolutions")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"workspace")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#version"},(0,r.kt)("inlineCode",{parentName:"a"},"version")))))),(0,r.kt)("h2",{id:"the-workspace-type"},"The ",(0,r.kt)("inlineCode",{parentName:"h2"},"workspace")," type"),(0,r.kt)("p",null,"This option synchronises the versions of your dependencies with the\n",(0,r.kt)("a",{parentName:"p",href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#version"},(0,r.kt)("inlineCode",{parentName:"a"},"version")),"\nproperties of the package.json files developed in your own local\nworkspace/project, when they relate to eachother."),(0,r.kt)("p",null,"Take this example, ",(0,r.kt)("inlineCode",{parentName:"p"},"@your-repo/fetch")," is developed in your repo:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsonc"},'{\n  "name": "@your-repo/fetch",\n  "version": "1.0.2"\n  // ...rest of the file\n}\n')),(0,r.kt)("p",null,"and another package developed in your repo depends on it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsonc"},'{\n  "name": "@your-repo/ui",\n  // ...other stuff\n  "dependencies": {\n    "@your-repo/fetch": "0.9.4"\n  }\n  // ...rest of the file\n}\n')),(0,r.kt)("p",null,"When ",(0,r.kt)("inlineCode",{parentName:"p"},"workspace")," is enabled, syncpack will fix ",(0,r.kt)("inlineCode",{parentName:"p"},"@your-repo/ui")," so it depends on\nversion ",(0,r.kt)("inlineCode",{parentName:"p"},"1.0.2")," of ",(0,r.kt)("inlineCode",{parentName:"p"},"@your-repo/fetch"),"."))}m.isMDXComponent=!0}}]);