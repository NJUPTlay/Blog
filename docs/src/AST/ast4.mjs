import core from '@babel/core';
import types from '@babel/types';
import pathlib from 'path';

const sourceCode = `console.log('日志')`;

const CosolePlugin={
    visitor:{
        CallExpression(path,state){
            const {node}=path;
            if(types.isMemberExpression(node.callee)){
                if(node.callee.object.name==='console'){
                    if(['log','info','warn','error'].includes(node.callee.property.name)){
                        const { line, column } = node.loc.start;
                        node.arguments.push(types.stringLiteral(`${line}:${column}`));
                        const filename = state.file.opts.filename;
                        const __dirname = import.meta.url.match(/(\/[^/]+)+(?=\/)/)?.[0];
                        const replaceWith = pathlib.resolve(__dirname,filename);
                        node.arguments.push(types.stringLiteral(replaceWith));
                    }
                }
            }
        }
    }
}

const targetSourceCode=core.transform(sourceCode,{
    plugins:[CosolePlugin],
    filename:'test.js'
});

console.log(targetSourceCode.code);

