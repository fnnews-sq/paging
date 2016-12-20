define("fw",[],function(){var e=function(){var e=function(t){return new e.fn.init(t)},t={}.hasOwnProperty;return e.prototype=e.fn={constructor:"fw",init:function(e){return this[0]=document.getElementById(e),this.selector=e,this}},e.extend=e.fn.extend=function(){var t=arguments[0]||{},n,r=arguments.length,i=1,s=!1,o,u,a,f,l;typeof t=="boolean"&&(s=t,t=arguments[1]||{},i=2),typeof t!="object"&&!e.isFunction(t)&&(t={}),r===i&&(t=this,--i);for(;i<r;i++)if((n=arguments[i])!=null)for(o in n){u=t[o],a=n[o];if(t===a)continue;s&&a&&(e.isPlainObject(a)||(l=e.isArray(a)))?(l?(l=!1,f=u&&e.isArray(u)?u:[]):f=u&&e.isPlainObject(u)?u:{},t[o]=e.extend(s,f,a)):a!==undefined&&(t[o]=a)}return t},e.extend({isFunction:function(e){return typeof e=="function"},isArray:function(e){return Object.prototype.toString.call(e)==="[object Array]"},isPlainObject:function(n){if(!n||e.type(n)!=="object"||n.nodeType||e.isWindow(n))return!1;if(n.constructor&&!t.call(n,"constructor")&&!t.call(n.constructor.prototype,"isPrototypeOf"))return!1;var r;for(r in n);return r===undefined||t.call(n,r)},type:function(e){return e==null?String(e):[toString.call(e)]||"object"},isWindow:function(e){return e&&typeof e=="object"&&"setInterval"in e}}),e.fn.extend({addClick:function(e,t){if(typeof e.onclick=="function"){var n=e.onclick;e.onclick=function(){n(),t()}}else e.onclick=t}}),e.extend({formatParams:function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.push(("v="+Math.random()).replace(".","")),t.join("&")},ajax:function(e){e=e||{},e.type=(e.type||"GET").toUpperCase(),e.dataType=e.dataType||"json";var t=this.formatParams(e.data);if(window.XMLHttpRequest)var n=new XMLHttpRequest;else var n=new ActiveXObject("Microsoft.XMLHTTP");n.onreadystatechange=function(){if(n.readyState==4){var t=n.status;t>=200&&t<300?e.success&&e.success(n.responseText,n.responseXML):e.fail&&e.fail(t)}},e.type=="GET"?(n.open("GET",e.url+"?"+t,!0),n.send(null)):e.type=="POST"&&(n.open("POST",e.url,!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(t))}}),e.fn.init.prototype=e.fn,e}();return e}),define("paging",["fw"],function(e){var t={options:{pageIndex:1,pageSize:10,total:0,pageBtnCount:7,showFirstLastBtn:!0,firstBtnText:null,lastBtnText:null,prevBtnText:"&laquo;",nextBtnText:"&raquo;",loadFirstPage:!0,remote:{url:null,type:"GET",pageParams:null,success:null,fail:null,totalName:"total"},pageElementSort:["page","size","jump","info"],showInfo:!0,infoFormat:"{start} ~ {end} 共 {pageNumber} 页 {total} 条",noInfoText:"目前没有数据",showJump:!0,jumpBtnText:"跳转",showPageSizes:!0,pageSizeItems:[5,10,15,20]},page:'<ul id="paging-page"></ul>',size:'<div id="paging-size"></div>',jump:'<div id="paging-jump"></div>',info:'<div id="paging-info"></div>'};e.fn.extend({formatParams:function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.push(("v="+Math.random()).replace(".","")),t.join("&")},ajax:function(e,t,n){options=e||{},options.type=(options.type||"GET").toUpperCase(),options.dataType=options.dataType||"json";var r=this.formatParams(options.pageParams(t));if(window.XMLHttpRequest)var i=new XMLHttpRequest;else var i=new ActiveXObject("Microsoft.XMLHTTP");i.onreadystatechange=function(){if(i.readyState==4){var e=i.status;e>=200&&e<300?(options.success&&options.success(i.responseText,t),n?n({total:JSON.parse(i.responseText)[options.totalName]}):""):options.fail&&options.fail(e)}},options.type=="GET"?(i.open("GET",options.url+"?"+r,!0),i.send(null)):options.type=="POST"&&(i.open("POST",options.url,!0),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(r))},paging:function(n){var r=this;r.options=n,this.ajax(n.remote,n,function(n){var i=e.extend(!0,t.options,r.options,n),s=0,o="",u,a,f,l;for(;s<4;s++)o+=t[i.pageElementSort[s]];i.total?(r[0].innerHTML=o,u=document.getElementById("paging-page"),a=document.getElementById("paging-size"),f=document.getElementById("paging-jump"),l=document.getElementById("paging-info"),r.initPage(i),i.showPageSizes?r.renderPageSizes(i.pageSizeItems,i.pageSize):a.className="none",i.showInfo?r.renderInfo(i,0):l.className="none",i.showJump?r.renderJump(i.jumpBtnText):f.className="none",r.addClick(f.getElementsByTagName("button")[0],function(){r.jumpClick(i)}),a.getElementsByTagName("select")[0].onchange=function(){var e=this.value;r.changeSize(i,e)}):r[0].innerHTML=i.noInfoText})},initPage:function(e){var t="",n=document.getElementById("paging-page"),r=Math.ceil(e.total/e.pageSize),i=e.pageBtnCount,s=e.showFirstLastBtn,o=e.firstBtnText,u=e.lastBtnText,a=e.prevBtnText,f=e.nextBtnText,l=this;if(r>i)t='<li><span class="paging-prev">'+a+'</span></li><li><span class="paging-next">'+f+"</span></li>",s&&(t='<li><span class="paging-first">'+(o?o:1)+"</span></li>"+t+'<li><span class="paging-last">'+(u?u:r)+"</span></li>"),n.innerHTML=t,this.renderPage(e,1,3),this.addClick(document.getElementsByClassName("paging-prev")[0],function(){l.prvebtnClick(e,n.getElementsByClassName("active")[0].getAttribute("data-index"))}),this.addClick(document.getElementsByClassName("paging-next")[0],function(){l.nextbtnClick(e,n.getElementsByClassName("active")[0].getAttribute("data-index"))}),e.showFirstLastBtn?this.addClick(document.getElementsByClassName("paging-first")[0],function(){l.renderPage(e,1,3),l.renderInfo(e,0),l.changeIndex(e,1)}):"",e.showFirstLastBtn?this.addClick(document.getElementsByClassName("paging-last")[0],function(){l.renderPage(e,r,1),l.renderInfo(e,Math.ceil(e.total/e.pageSize)),l.changeIndex(e,Math.ceil(e.total/e.pageSize))}):"";else if(r<=i){for(var c=0;c<r;c++)t+="<li><a data-index="+(c+1)+">"+(c+1)+"</a></li>";n.innerHTML=t,n.getElementsByTagName("li")[0].getElementsByTagName("a")[0].className="active";for(var c=0;c<n.getElementsByTagName("a").length;c++)this.addClick(n.getElementsByTagName("a")[c],function(){n.getElementsByClassName("active")[0].className="",l.defaultClick(this.getAttribute("data-index"))})}},renderPage:function(e,t,n,r){var i=document.getElementById("paging-page"),s=document.getElementsByClassName("paging-prev")[0].className,o=document.getElementsByClassName("paging-next")[0].className,u=Math.ceil(e.total/e.pageSize),a=e.pageBtnCount,f=e.showFirstLastBtn,l,c,h,p=this,d,v;if(i.getElementsByClassName("number").length){d=i.getElementsByClassName("number").length;for(var m=0;m<d;m++)i.removeChild(i.getElementsByClassName("number")[0])}if(f){l=document.getElementsByClassName("paging-first")[0].className,c=document.getElementsByClassName("paging-last")[0].className;if(n==1){for(var m=0;m<a-2;m++)i.insertBefore(document.createElement("li"),i.childNodes[2]);for(var m=0;m<a-2;m++)i.getElementsByTagName("li")[2+m].className="number",i.getElementsByTagName("li")[2+m].innerHTML="<a data-index="+(u-a+m+3)+">"+(u-a+m+3)+"</a>",u-a+m+3==t&&(v=m);document.getElementsByClassName("paging-prev")[0].className=s.replace("none",""),document.getElementsByClassName("paging-next")[0].className="paging-next none",document.getElementsByClassName("paging-first")[0].className=l.replace("none",""),document.getElementsByClassName("paging-last")[0].className="paging-last none",i.getElementsByTagName("a")[v].className="active"}else if(n==2){r=="fsecond"?(h=t-1,v=1):(h=t-a+6,v=a-6);for(var m=0;m<a-4;m++)i.insertBefore(document.createElement("li"),i.childNodes[2]);for(var m=0;m<a-4;m++)i.getElementsByTagName("li")[2+m].className="number",i.getElementsByTagName("li")[2+m].innerHTML="<a data-index="+(h+m)+">"+(h+m)+"</a>";document.getElementsByClassName("paging-prev")[0].className=s.replace("none",""),document.getElementsByClassName("paging-next")[0].className=o.replace("none",""),document.getElementsByClassName("paging-first")[0].className=l.replace("none",""),document.getElementsByClassName("paging-last")[0].className=c.replace("none",""),i.getElementsByTagName("a")[v].className="active"}else if(n==3){for(var m=0;m<a-2;m++)i.insertBefore(document.createElement("li"),i.childNodes[2]);for(var m=0;m<a-2;m++)i.getElementsByTagName("li")[2+m].className="number",i.getElementsByTagName("li")[2+m].innerHTML="<a data-index="+(m+1)+">"+(m+1)+"</a>";document.getElementsByClassName("paging-prev")[0].className="paging-prev none",document.getElementsByClassName("paging-next")[0].className=o.replace("none",""),document.getElementsByClassName("paging-first")[0].className="paging-first none",document.getElementsByClassName("paging-last")[0].className=c.replace("none",""),i.getElementsByTagName("a")[t-1].className="active"}}else if(n==1){for(var m=0;m<a-1;m++)i.insertBefore(document.createElement("li"),i.childNodes[1]);for(var m=0;m<a-1;m++)i.getElementsByTagName("li")[1+m].className="number",i.getElementsByTagName("li")[1+m].innerHTML="<a data-index="+(u-a+m+2)+">"+(u-a+m+2)+"</a>",u-a+m+2==t&&(v=m);document.getElementsByClassName("paging-prev")[0].className=s.replace("none",""),document.getElementsByClassName("paging-next")[0].className="paging-next none",i.getElementsByTagName("a")[v].className="active"}else if(n==2){r=="fsecond"?(h=t-1,v=1):(h=t-a+4,v=a-4);for(var m=0;m<a-2;m++)i.insertBefore(document.createElement("li"),i.childNodes[1]);for(var m=0;m<a-2;m++)i.getElementsByTagName("li")[1+m].className="number",i.getElementsByTagName("li")[1+m].innerHTML="<a data-index="+(h+m)+">"+(h+m)+"</a>";document.getElementsByClassName("paging-prev")[0].className=s.replace("none",""),document.getElementsByClassName("paging-next")[0].className=o.replace("none",""),i.getElementsByTagName("a")[v].className="active"}else if(n==3){for(var m=0;m<a-1;m++)i.insertBefore(document.createElement("li"),i.childNodes[1]);for(var m=0;m<a-1;m++)i.getElementsByTagName("li")[1+m].className="number",i.getElementsByTagName("li")[1+m].innerHTML="<a data-index="+(m+1)+">"+(m+1)+"</a>";document.getElementsByClassName("paging-prev")[0].className="paging-prev none",document.getElementsByClassName("paging-next")[0].className=o.replace("none",""),i.getElementsByTagName("a")[t-1].className="active"}for(var m=0;m<i.getElementsByTagName("a").length;m++)this.addClick(i.getElementsByTagName("a")[m],function(){p.btnClick(e,this.getAttribute("data-index"))})},renderPageSizes:function(e,t){var n="<select>",r=document.getElementById("paging-size"),i;for(var s=0;s<e.length;s++)n+="<option value="+e[s]+">"+e[s]+"</option>";n+="</select>",r.innerHTML=n,i=r.getElementsByTagName("select")[0].getElementsByTagName("option");for(var s=0;s<i.length;s++)if(i[s].value==t){i[s].setAttribute("selected","selected");return}},renderJump:function(e){var t='<div class="paging-group"><input type="text" class="jump"><button type="button">'+e+"</button>",n=document.getElementById("paging-jump");n.innerHTML=t},renderInfo:function(e,t){var n=t*e.pageSize+1,r=t==Math.ceil(e.total/e.pageSize)?e.total:(parseInt(t)+1)*e.pageSize,i=Math.ceil(e.total/e.pageSize),s=document.getElementById("paging-info"),o=e.infoFormat;o.indexOf("{start}")>=0?o=o.replace(/\{start\}/g,n):"",o.indexOf("{end}")>=0?o=o.replace(/\{end\}/g,r):"",o.indexOf("{pageNumber}")>=0?o=o.replace(/\{pageNumber\}/g,i):"",o.indexOf("{total}")>=0?o=o.replace(/\{total\}/g,e.total):"",s.innerHTML=o},btnClick:function(e,t){var n=Math.ceil(e.total/e.pageSize),r=document.getElementById("paging-page"),i=r.getElementsByTagName("a").length,s=r.getElementsByTagName("a")[0].getAttribute("data-index"),o=r.getElementsByTagName("a")[i-1].getAttribute("data-index"),u;this.changeIndex(e,t),document.getElementById("paging-page").getElementsByClassName("active")[0].className="";if(s==t)if(e.showFirstLastBtn&&t<=e.pageBtnCount-3||!e.showFirstLastBtn&&t<=e.pageBtnCount-2)this.renderPage(e,t,3);else if(e.showFirstLastBtn&&t==n-e.pageBtnCount+3||!e.showFirstLastBtn&&t>=n-e.pageBtnCount+2)this.renderPage(e,t,2,"lsecond");else{e.showFirstLastBtn?u=parseInt(t)-e.pageBtnCount+6:u=parseInt(t)-e.pageBtnCount+4;for(var a=0;a<i;a++)r.getElementsByTagName("a")[a].innerHTML=u+a,r.getElementsByTagName("a")[a].setAttribute("data-index",u+a);r.getElementsByTagName("a")[i-2].className="active"}else if(o==t)if(e.showFirstLastBtn&&t==e.pageBtnCount-2||!e.showFirstLastBtn&&t==e.pageBtnCount-1)this.renderPage(e,t,2,"fsecond");else if(e.showFirstLastBtn&&t>=n-e.pageBtnCount+2||!e.showFirstLastBtn&&t>=n-e.pageBtnCount+1)this.renderPage(e,t,1);else{for(var a=0;a<i;a++)r.getElementsByTagName("a")[a].innerHTML=parseInt(t)+a-1,r.getElementsByTagName("a")[a].setAttribute("data-index",parseInt(t)+a-1);r.getElementsByTagName("a")[1].className="active"}else this.defaultClick(t);this.renderInfo(e,t-1)},defaultClick:function(e){var t=document.getElementById("paging-page"),n=t.getElementsByTagName("a").length;for(var r=0;r<n;r++)t.getElementsByTagName("a")[r].getAttribute("data-index")==e&&(t.getElementsByTagName("a")[r].className="active")},jumpClick:function(e){var t=Math.ceil(e.total/e.pageSize),n=document.getElementById("paging-jump").getElementsByTagName("input")[0].value,r,i;n<=t&&n&&(e.showFirstLastBtn?(r=e.pageBtnCount-2,i=t-e.pageBtnCount+3):(r=e.pageBtnCount-1,i=t-e.pageBtnCount+2),this.changeIndex(e,n),this.jumpIndex(r,i,n,e),document.getElementById("paging-jump").getElementsByTagName("input")[0].value="")},jumpIndex:function(e,t,n,r){0<n&&n<e?this.renderPage(r,n,3):n>=e&&n<=t?this.renderPage(r,n,2,"fsecond"):this.renderPage(r,n,1),this.renderInfo(r,n-1)},prvebtnClick:function(e,t){var n=Math.ceil(e.total/e.pageSize),r=document.getElementById("paging-page"),i=r.getElementsByTagName("a").length,s=r.getElementsByTagName("a")[1].getAttribute("data-index"),o,u,a;this.changeIndex(e,t-1),e.showFirstLastBtn?(o=e.pageBtnCount-2,u=n-e.pageBtnCount+4):(o=e.pageBtnCount-1,u=n-e.pageBtnCount+3);if(t==u)this.renderPage(e,t-1,2,"lsecond");else if(t==o)this.renderPage(e,t-1,3,"lsecond");else if(s==t){a=r.getElementsByClassName("active")[0].innerHTML;for(var f=0;f<r.getElementsByTagName("a").length;f++)e.showFirstLastBtn?r.getElementsByTagName("a")[f].innerHTML=a-e.pageBtnCount+5+f:r.getElementsByTagName("a")[f].innerHTML=a-e.pageBtnCount+3+f,r.getElementsByTagName("a")[f].setAttribute("data-index",r.getElementsByTagName("a")[f].innerHTML);r.getElementsByClassName("active")[0].className="",r.getElementsByTagName("a")[i-2].className="active"}else for(var f=0;f<r.getElementsByTagName("a").length;f++)r.getElementsByTagName("a")[f].getAttribute("data-index")==t&&(r.getElementsByTagName("a")[f-1].className="active",r.getElementsByTagName("a")[f].className="");this.renderInfo(e,t-1)},nextbtnClick:function(e,t){var n=Math.ceil(e.total/e.pageSize),r=document.getElementById("paging-page"),i=r.getElementsByTagName("a").length,s=r.getElementsByTagName("a")[i-2].getAttribute("data-index"),o,u,a;this.changeIndex(e,parseInt(t)+1),e.showFirstLastBtn?(o=e.pageBtnCount-3,u=n-e.pageBtnCount+3):(o=e.pageBtnCount-2,u=n-e.pageBtnCount+2);if(t==u)this.renderPage(e,parseInt(t)+1,1);else if(t==o)this.renderPage(e,parseInt(t)+1,2,"fsecond");else if(s==t){a=r.getElementsByClassName("active")[0].innerHTML;for(var f=0;f<r.getElementsByTagName("a").length;f++)r.getElementsByTagName("a")[f].innerHTML=parseInt(a)+f,r.getElementsByTagName("a")[f].setAttribute("data-index",r.getElementsByTagName("a")[f].innerHTML);r.getElementsByClassName("active")[0].className="",r.getElementsByTagName("a")[1].className="active"}else for(var f=0;f<r.getElementsByTagName("a").length;f++)r.getElementsByTagName("a")[f].getAttribute("data-index")==t&&(r.getElementsByTagName("a")[f+1].className="active",r.getElementsByTagName("a")[f].className="");this.renderInfo(e,t)},changeIndex:function(e,t){e.pageIndex=t,this.ajax(e.remote,e)},changeSize:function(t,n){t.pageSize=n,t.pageIndex=1,this.ajax(t.remote,t),e.extend(t,{pageSize:n}),document.getElementById("paging-page").innerHTML="",this.initPage(t),this.renderInfo(t,0)}})}),require.config({baseUrl:"fw-module/js/",paths:{fw:"fw",paging:"paging"}}),require(["fw","paging"],function(e,t){e("paging").paging({pageSize:10,pageIndex:1,pageElementSort:["page","jump","info","size"],remote:{url:"/pagesize-plug/fw-module/json/wechat.js",type:"GET",pageParams:function(e){return{index:e.pageIndex,size:e.pageSize}},success:function(e,t){var e=JSON.parse(e),n=document.getElementsByTagName("ul")[0],r=t.pageSize,i="";for(var s=0;s<r;s++)i+='<li style="list-style-type:none;">'+e.dt[s].title+"</li>";n.innerHTML=i},fail:null,totalName:"aID"},pageSizeItems:[5,10,15,100],nextBtnText:"下一页",showJump:!0,prevBtnText:"上一页",firstBtnText:"首页",lastBtnText:"末页",pageBtnCount:11,showFirstLastBtn:!0})}),define("main",function(){});