import * as parser from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";

const traverse = _traverse.default
const generate = _generate.default;

const code = `function example() {
  let a = 1;
  let b = 2;
  return a + b;
}`;

// 使用babel解析器解析源码为AST
const ast = parser.parse(code);

// 定义一个遍历AST的访问器对象，也就是访问到目标节点【这里是VariableDeclaration】的时候会做什么处理
const visitor = {
  VariableDeclaration(path) { // 这里的 path 是指当前的上下文，而不是路径
    if (path.node.kind === 'let') {
      path.node.kind = 'const';
    }
  }
};

// 使用traverse遍历AST并应用访问器，也就是遍历并应用刚才那个 visitor 规则
traverse(ast, visitor);

// 使用generate根据修改后的AST生成新的代码
const output = generate(ast, {});

// 打印修改后的代码
console.log(output.code);
