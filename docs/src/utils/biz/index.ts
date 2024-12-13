/**
 * 将对象序列化为字符串，如{a: 1, b: 2} ——> a=1&b=2
 * @param {object} query 参数
 * @returns {string} query字符串
 */
export const serializeQuery = (query?: Record<string, number | string | number[] | string[]>) => {
    if (!query) {
        return ''
    }
    let search = ''
    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            const value = query[key];
            if (value === null || value === undefined) {
                continue;
            }
            search += '&' + key + '=' + value.toString();
        }
    }
    return search.slice(1);
}

/**
 * 将url参数处理为对象{key: value}
 * @param search {string} 含?拼接的url，如xx?a=1&b=2 ——》{a: 1, b: 2}
 * @returns {{[key: string]: string}} 返回解析后的参数对象
 */
export const parseUrlQuery = (search: string) => {
    const arr = search.split('?')
    if (!arr[1]) return {}

    const paramsArr = arr[1].split('&')
    const params: Record<string, string> = {};
    paramsArr.forEach(item => {
        const [key, value] = item.split('=')
        value !== null && value !== undefined && (params[key] = decodeURIComponent(value))
    })
    return params
}

// 根据params更新url参数
export const updateUrlQuery=(params:Record<string,string|number[]|string[]|number|null|undefined>)=>{
    const preQuery=parseUrlQuery(window.location.href);
    const splitArr=window.location.href.split('?');
    let newUrl=splitArr[0]||'';
    const nextQuery={
        ...preQuery,
        ...params
    };
    for (const [key,value] of Object.entries(nextQuery)){
        if(['', undefined, null].includes(value as any)){
            delete nextQuery[key];
        }
    }
    newUrl+='?'+serializeQuery(nextQuery as Record<string, string | number>);
    window.history.replaceState('','',newUrl)
    return nextQuery
}



//获取当前语言环境
export const getCurrentLanguage = () => {
    return JSON.parse(localStorage.getItem('__I18N__') as string).language||'zh-cn';
}

//获取当前语料
export const getCurrentLocale=(locale:string)=>{
    const datasource=JSON.parse(localStorage.getItem('__I18N__') as string)?.datasource||{};
    return datasource?.[locale]||locale;
}

// 改变当前语言环境
export const changeLanguage = (language: string) => {
    window.localStorage.setItem('__I18N__',JSON.stringify(
        {
            language,
            datasource:{}
        }
    ))
    //根据它的路由方式采用不同的刷新方式
    if(window.location.hash){
        updateUrlQuery({locale:language});
    }else{
        let newUrl=window.location.href;
        newUrl +="#/?"+serializeQuery({locale:language});
        window.history.replaceState('','',newUrl) 
    }
    window.location.reload();
}
