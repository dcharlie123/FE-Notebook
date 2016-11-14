
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
