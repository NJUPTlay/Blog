import core from '@babel/core'; //里面就包含了@babel/parser、@babel/traverse、@babel/generate、@babel/types等
import types from '@babel/types';
// import arrowFunctionPlugin from 'babel-plugin-transform-es2015-arrow-functions'; //箭头函数转为普通函数

let sourceCode = `
const sum = (a, b) => {
    console.log(this)
    return a + b;
}
`;

function addThisEnvironment(path){
    //确认当前箭头函数需要使用的this环境
    const thisEnv=path.findParent((parent)=>{
        return (
            parent.isProgram() || ( parent.isFunction() && !parent.isArrowFunctionExpression())
        )
    })
    //父作用域中放入一个 _this 变量
    thisEnv.scope.push({
        id:types.identifier('_this'),
        init:types.thisExpression(),
    })

    //找到在当前箭头函数中所有使用的this路径,遍历子节点 类visitor
    let thisPaths = []; 
    path.traverse(
        {ThisExpression(path){
            thisPaths.push(path);
        }}
    )

    //将所有this替换为 _this
    thisPaths.forEach((path)=>{
        path.replaceWith(types.identifier('_this'))
    })
    
}


const arrowFunctionPlugin={
    visitor:{
        ArrowFunctionExpression(path){
            const {node}=path;
            node.type='FunctionExpression';

            addThisEnvironment(path) 
            //如果箭头函数体不是块语句，则将其转换为块语句 const sum = (a, b) => a + b
            if(!types.isBlockStatement(node.body)){
                node.body=types.blockStatement([types.returnStatement(node.body)]);
            }
        }
    }
}

let targetSource = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin], //使用插件
});

console.log(targetSource.code);


