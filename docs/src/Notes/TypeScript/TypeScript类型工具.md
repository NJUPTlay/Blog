# 类型工具
类型工具的分类: 操作符、关键字、专用语法 从目的来看也可以划分为 类型创建、类型保护
## 接受泛型的类型别名
这样的工具类型能够接受泛型参数
泛型参数的名称（上面的 T ）也不是固定的,采用大驼峰命名法
```tsx | pure
type Test<T> = T|number|string;
const foo: Test<boolean> = true;

//一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名
type TestWithBool = Test<boolean>;
const foo: TestWithBool = true;
```
## 联合类型和交叉类型
```tsx | pure
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
```
## 索引类型
从创建的角度 索引签名类型
从读取的角度 索引类型查询 索引类型访问

### 索引签名类型 
快速声明一个键值类型一致的类型结构
```tsx | pure
interface AllStringTypes {
    [key: string]: string;
}
```
### 索引类型查询
通过keyof 可以快速查询索引key值的联合字面量 
```tsx | pure
interface Test{
    'lay':1,
    6:2
}
type TestKeys=keyof Test //'lay'|6
```
### 索引类型访问
类似js中对象属性的访问 我们可以在ts中能通过类似的方法 声明类型
```tsx | pure
interface NumberRecord {
  [key: string]: number;
}
type PropType = NumberRecord[string]; // number

interface Foo {
  propA: number;
  propB: boolean;
}
type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean
type PropsType = Foo[keyof Foo]; // number | boolean
```
## 映射类型
```tsx | pure
interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type Clone<T>={
  [K in keyof T]:T[K]
}
type CloneType=Clone<Foo> //与Foo等价
```
## 类型守卫
类型控制流分析
```tsx | pure
export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

function test(input:string|null){
  if(isFalsy(input)){
    //这里就类似被确认为null
  }
}
```
## 基于in和instanceof的类型守卫
in 判断这个键字是否在对象中 ,instanceof会沿着原型链条来查找
```tsx | pure
interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function test(x: Foo | Bar) {
  if('foo' in x){
    x.fooOnly
  }else{
    x.barOnly
  }
}
```

