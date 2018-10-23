async function addCookies(cookies_str:string, page,domain){
    let cookies = cookies_str.split(';').map(pair=>{
        let name = pair.trim().slice(0,pair.trim().indexOf('='));
        let value = pair.trim().slice(pair.trim().indexOf('=')+1);
        return {name,value,domain}
    });
    await Promise.all(cookies.map(pair=>{
        return page.setCookie(pair)
    }))
}
export {addCookies}