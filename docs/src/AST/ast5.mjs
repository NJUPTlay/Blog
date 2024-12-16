import core from '@babel/core';
import types from '@babel/types';
import template from '@babel/template';

let sourceCode = ` 
  //四种声明函数的方式
  function sum(a, b) {
    return a + b;
  }
  const multiply = function (a, b) {
    return a * b;
  };
  const minus = (a, b) => a - b;
  class Calculator {
    divide(a, b) {
      return a / b;
    }
  }
`;

const autoImportPlugin={
    visitor:{
        Program(path,state){ //state就是一个用来暂存数据的对象，是一个容器，用于共享数据
            let loggerId;
            path.traverse({
                ImportDeclaration(path){
                    const {node}=path;
                    if(node.source.value==='logger'){
                        loggerId=node.specifiers[0].local.name
                        // 跳出当前遍历
                        path.stop()
                    }
                }
            });
            if (!loggerId){
                loggerId='loggerLib'
                path.node.body.unshift(
                    template.statement(`import ${loggerId} from 'logger'`)()
                )
            }
            //在 state 中保存 loggerLib()
            state.loggerNode = template.statement(`${loggerId}()`)();
        },
        //此处不可有空格
        "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod"(path, state) {
            const {node}=path;
            if(types.isBlockStatement(node.body)){
                node.body.body.unshift(state.loggerNode)
            }else{
                const newBody=types.blockStatement([
                    state.loggerNode,
                    types.returnStatement(node.body)
                ])
                node.body=newBody;
            }
        }
    }
}

let targetSource = core.transform(sourceCode, {
    plugins: [autoImportPlugin], //使用插件
});

console.log(targetSource.code);
