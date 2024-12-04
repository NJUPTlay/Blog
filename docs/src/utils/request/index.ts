interface NormalObject {[key: string]: any};
// 竞态问题忽略请求
export const onlyResolvesLast = <T extends NormalObject>(fn) => {
    let id = 0;
    const wrappedFn = (...args) => {
        const fetchId = id + 1;
        id = fetchId;

        const result = fn.apply(this, args);
        return new Promise((resolve, reject) => {
            Promise.resolve(result).then(res => {
                if (fetchId === id) {
                    resolve(res);
                };
            }).catch(err => {
                reject(err);
            });
        });
    };
    return wrappedFn as (value: NormalObject) => Promise<T>;
};

export const _onlyResolvesLast = <T extends NormalObject>(fn) => {
    let id = 0;
    const wrappedFn = (...args) => {
        const fetchId = id + 1;
        id = fetchId;

        return fn.apply(this, args).then(res => {
            if (fetchId === id) {
                return res;
            }
            // 处理过时的请求
            return Promise.reject(new Error('Outdated request'));
        }).catch(err => {
            if (fetchId === id) {
                throw err;
            }
            return Promise.reject(err);
        });
    };
    return wrappedFn as (value: NormalObject) => Promise<T>;
};

//控制请求的并发
export const concurRequest=(
    urls,
    api,
    setResult,
    getParams,
    clusterId,
    max=6
)=>{
    return new Promise((resolve)=>{
        if(urls.length==0) return resolve([]);
        const results=new Array(urls.length);
        let currentIndex=0;
        const requestTask=async()=>{
            while(currentIndex<urls.length){
                const i=currentIndex++;
                const url=urls[i];
                try{
                    const res = await api(clusterId, getParams(url.title, i));
                    results[i] = setResult(res, url);
                }catch(error){
                    results[i] = setResult(null, url);
                }
            }
        }
        const tasks=Array(Math.min(max,urls.length)).fill(null).map(()=>requestTask())
        Promise.all(tasks).then(()=>resolve(results))
    })
}

