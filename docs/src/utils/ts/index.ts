//异名的interface继承
interface Struct1 {
    primitiveProp: string;
    objectProp: {
        name: string;
    };
    unionProp: string | number;
}

// 接口“Struct2”错误扩展接口“Struct1”。
interface Struct2 extends Struct1 {
    // “primitiveProp”的类型不兼容。不能将类型“number”分配给类型“string”。
    primitiveProp: number;
    // 属性“objectProp”的类型不兼容。
    objectProp: {
        age: number;
    };
    // 属性“unionProp”的类型不兼容。
    // 不能将类型“boolean”分配给类型“string | number”。
    unionProp: boolean;
}

//同名的interface
interface Struct1 {
    primitiveProp: string;
}

interface Struct1 {
    // 后续属性声明必须属于同一类型。
    // 属性“primitiveProp”的类型必须为“string”，但此处却为类型“number”。
    primitiveProp: number;
}

//interface继承type
type Base = {
    name: string;
};

interface IDerived extends Base {
    // 报错！就像继承接口一样需要类型兼容
    name: number;
    age: number;
}

//type合并interface
interface IBase {
    name: string
}

type Derived = IBase & {
    name: number
}

//type的合并
type A = {
    name: string;
    age: number
}
type B = {
    name: number
}

type C = A & B
declare let c: C;
c = {
    name: 1,
    age: 12,
}


function getData<T>(data: T): T {
    return data;
}
let testvalue = 123
const result = getData(testvalue); // 返回值为 number 类型
const name1 = 'lay'
const result2 = getData(name1); // 字面量 'lay' 类型

function swap<T, U>([start, end]: [T, U]): [U, T] {
    return [end, start];
}

const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);


const object = { 'a': 1, 'b': '2', 'c': 3 };
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }

//Pick涉及到后面的工具类型
function pick<T extends object, U extends keyof T>(object: T, arrKeys: U[]): Pick<T, U> { }


export declare class TagProtector<T extends string> {
    protected __tag__: T;
}

export type Nominal<T, U extends string> = T & TagProtector<U>;

export type CNY = Nominal<number, 'CNY'>;

export type USD = Nominal<number, 'USD'>;

type Result43 = [] extends number[] ? 1 : 2; // 1


//工具类型
// interface Person{
//     name:string;
//     age:number;
// }

// type PersonPartial = Partial<Person>

// const person: PersonPartial = {
//   name: 'linbudu',
// };

// interface Person{
//     name?:string;
//     age?:number;
// }

// const person:Required<Person>={
//  name:'linbudu',
//  age:18   
// }

// interface Person{
//     name:string;
//     age:number;
// }
// const person:Readonly<Person>={
//   name:'lay',
//   age:18   
// }
// //无法为“name”赋值，因为它是只读属性。
// person.name='123'

// type Keys = 'name' | 'age' | 'location';
// type Person = Record<Keys, string | number>;

// const person: Person = {
//   name: 'Alice',
//   age: 30,
//   location: 123,
// };
