var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query)
{
var  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in window){
alert("Browser is not supported");
}
var open=idb.open("StoreData",1);
console.log("indexedDB is created");
 open.onupgradeneeded=function(event){
var request=event.target.result;
 var store=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
console.log("Object store is not created",error);
}
open.onsuccess=function(event){
request=event.target.result;
var transaction=request.transaction("Formdata","readwrite");
transaction.objectStore("Formdata");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data){
  console.log(data.target.result);
  display(data.target.result)
  education(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{

  var img=document.createElement("img");
  img.src="image/boy.svg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  //right div
  var head=document.createElement("h2");
  head.textContent="career objective";
  right.append(head);
var pc=document.createElement("p");
pc.textContent="education details";
right.append(pc);
}
function education(data){

var table=document.createElement("table");
table.border='1';
let row='';
row +="<tr>"+"<td>"+"college"+"<th>"+
"<th>"+"degree" +"</th>"+
"<th>"+"branch"+"/th>"+
"<th>"+ "marks"+"</th>"+
"</tr>";
for( var i  in data.education)
{
row +="<tr>"+"<td>"+ data.education[i].college+"<td>"+
"<td>"+ data.education[i].degree + "</td>"+
"<td>"+ data.education[i].branch +"/td>"+
"<td>"+ data.education[i].marks + "</td>"+
"</tr>";
}
table.innerHTML=row;
right.append(table);
}
