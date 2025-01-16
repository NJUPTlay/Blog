import core from '@babel/core';
import types from '@babel/types';

const sourceCode = `
var a = 1;
console.log(a);
var b = 2;
`;



//no-console 禁用 console fix=true 自动修复
const eslintPlugin=({fix})=>{
    return {
        //AST遍历也会有自己的生命周期,有两个钩子,在遍历之前和之后 pre和post
        pre(file){
            file.set('errors',[]);
        },
        visitor:{
            CallExpression(path,state){
                const errors = state.file.get("errors");
                const {node}=path;
                if(types.isMemberExpression(node.callee)){
                    if(node.callee.object.name==='console'){
                        errors.push(
                            path.buildCodeFrameError(`代码中不能出现console语句`, Error)
                        );
                        if(fix){
                            //启动了自动修复就删除console语句
                            path.parentPath.remove();
                        }
                    }
                }
            }
        },
        post(file){
            console.log(...file.get('errors'));
        },
    }
}

let targetSource = core.transform(sourceCode, {
    plugins: [eslintPlugin({ fix: true })], //使用插件
  });
  
console.log(targetSource.code);
  
