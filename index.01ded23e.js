const e=document.querySelector(".breed-select"),o=document.querySelector(".loader");window.onload=function(){o.style.display="none"},o.style.display="block",fetch("https://api.thecatapi.com/v1/breeds?api_key=live_sGqxpzYLvFus7p2nXND3T4qIBX7yjf1C275c2408M4sTblpioeOksmdnAZteZmPh").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((n=>{e.innerHTML=n.map((e=>`<option value="${e.id}">${e.name}</option>`)).join(""),o.style.display="none"})).catch((e=>{console.log(e),o.style.display="none"}));
//# sourceMappingURL=index.01ded23e.js.map
