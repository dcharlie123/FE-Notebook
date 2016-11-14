
#JavaScript中get和set
```javascript
var foo={
 get age(){
  return new Date().getFullYear()
 },
 set age(a){
  console.log("age的值是"+a)
 }
}
console.log(foo.age)//2016
foo.age=2017//age的值是2017
console.log(foo.age)//2016   还是2016！！！
```
```javascript
function foo(){}
Object.defineProperty(foo.prototype,'z',{get:function(){return 1}})
var obj=new foo();

console.log(obj.z)//1
obj.z=100;
console.log(obj.z)//1
```
如果要修改，需要用
```javascript
Object.defineProperty(obj,'z',{value:100,configerable:true})
obj.z//100
delete obj.z
obj.z//1
```

```javascript
var o={};
Object.defineProperty(o,'x',{value:1});//默认writable:false,configurable:false
var obj=Object.create(o);
obj.x//1
obj.x=100
obj.x//1
```
```javascript
var o={};
Object.defineProperty(o,'x',{writable:true,configurable:true,value:1});//默认writable:false,configurable:false
var obj=Object.create(o);
obj.x//1
obj.x=100
obj.x//100
```
