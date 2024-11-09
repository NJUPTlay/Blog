# TypeScript 就变成了令人诟病的 AnyScript
any类型的万能性也导致我们经常回去滥用 (定义成any就直接跳过类型检测) 比如不想写或者写不来的类型
## 使用的一些技巧tips
### 1. 类型断言
```tsx | pure
let unknownVar: unknown;

(unknownVar as { foo: () => {} }).foo();
```
同样的我们也可以as any来跳过类型检查
```tsx | pure
const str: string = "linbudu";

(str as any).func().foo().prop;
```
正确的使用方法则是在类型分析不正确或者不符合预期时,将其断言为正确类型
```tsx | pure
function getValue(): any {
  return { id: 1, name: "Kimi" };
}

const user = getValue();
const id: number = user.id; // Error: Property 'id' does not exist on type 'any'.
const id2: number = (user as { id: number }).id; // OK
```
非空断言
```tsx | pure
declare const foo: {
  func?: () => ({
    prop?: number | null;
  })
};

foo.func().prop.toFixed();

//可能有两个类型报错
foo.func!().prop!.toFixed(); //运行会报错
//对比可选链
foo.func?.().prop?.toFixed(); //运行中将直接短路
```
当然,非空断言其实可以理解成类型断言的简写
```tsx | pure
((foo.func as () => ({
  prop?: number;
}))().prop as number).toFixed();
```
### 2. 使用unknown
`unkonwwn` 它表示一个不透明的值,在未来会被定义,我们可以再次复制为任意的类型,但是 `unknown` 只能赋值给 `any` 和 `unknown` 类型
```tsx | pure
let unknownVar: unknown = "linbudu";

unknownVar = false;
unknownVar = "linbudu";
unknownVar = 1
```
这里也可以顺便提一嘴never类型,它表示一个值不能是任何类型的 在type的交叉类型中 如 stirng & number 永远不可能存在

