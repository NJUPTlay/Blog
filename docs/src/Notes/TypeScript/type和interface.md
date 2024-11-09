---
outline: deep
---


# ts中type和interface的区别
type vs interface 大家使用 `typescript` 总会使用到 `interface` 和 `type` , 这两个关键字经常一起使用, 那么他们之间有什么区别呢?

## 类型别名type 
`type` 通常来说是申明字面类型、联合类型、交叉类型等
### 字面类型、联合类型
```md
//字面量与联合类型
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | StatusCode | (() => unknown);
const status: PossibleDataTypes = 502;
```
### 交叉类型
```md
//交叉类型
type Struct1={
    name:string;
    object:{
        age:number
    }
}

type Struct2 = {
    name:'lay';
    object:{
        job:string
    }
}

type Struct3 = Struct1 & Struct2
```

```md
//联合类型与交叉类型
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string

const obj:Struct3 = {
    name:'lay',
    object:{
        age:18,
        job:'前端工程师'
    }
}
```
### 声明接口类型
```md
//声明一个对象类型，就像接口
type ObjType = {
  name: string;
  age: number;
}
```


## interface接口
`interface` 通常用来定义一个对象类型 
描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，最多局限于泛型约束与索引类型这个层面
### 接口描述与继承
```md
//接口继承
interface Animal {
  name: string;
  age:number;
  type:string|number;
}

interface Dog extends Animal {
  bark(): void;
  // 不能将类型“boolean”分配给类型“string | number”。
  type:boolean;
}
```

### 同名的interface处理
```md
interface User {
  name: string;
  age:number;
}

interface User {
  job:string;
}

//等同于
interface User {
  name: string;
  age:number;
  job:string;
}
```

## 总结
::: details
+ 在对象继承上, interface 使用 extends 关键字，type 使用&符号
+ 同名的 interface 会自动合并，并且在合并时会要求兼容原接口的结构
+ interface 不能使用 type 定义数组类型和联合声明
+ interface 无法使用映射类型等类型工具
+ interface 就是描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，而 type 就是用于将一组类型的重命名，或是对类型进行复杂编程。
+ 在对象扩展的情况下，使用接口继承要比交叉类型的性能更好,一般声明接口返回值类型使用 interface
:::
