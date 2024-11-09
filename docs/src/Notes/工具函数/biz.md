# 代码示例

## serializeQuery
将对象序列化为字符串，如{a: 1, b: 2} ——> a=1&b=2
```js
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
```

## parseUrlQuery
将url参数解析为对象{key: value}
```js
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
```