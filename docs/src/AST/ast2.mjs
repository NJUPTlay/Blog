import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generator from "@babel/generator";
import core from '@babel/core';


const code = `
const hello = () => {};
`;


const ast = parser.parse(code);

// 2. 转换
const visitor = {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  Identifier(path) {
    const { node } = path; //从path中解析出当前 AST 节点
    if (node.name === "hello") {
      node.name = "world"; 
    }
  },
};
traverse.default(ast, visitor);

const result = generator.default(ast, {});

console.log(result.code);


const sourceCode = `
const hello = () => {};
`;
//babel插件
const namePlugin={
    visitor:{
        Identifier(path){
            const {node} = path;
            if (node.name === "hello") {
                node.name = "universe"; 
            }
        },
    }
}

const targetSource=core.transform(sourceCode,{
    plugins:[namePlugin],
})

console.log(targetSource.code);
