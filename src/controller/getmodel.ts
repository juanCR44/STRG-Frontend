const baseURL = "https://django-stockrcgnt.herokuapp.com/api/test"
const baseURL2 = "http://127.0.0.1:8000/api/test"
const baseURL4 = "http://127.0.0.1:8000/api/"
const baseURL3 = 'https://django-stockrcgnt.herokuapp.com/api/'
const baseURL5 = 'https://django-stockrcgnt-production.up.railway.app/api/test'
//const baseURL = 'https://django-stckrcgnt.vercel.app/api/
const djangoURL = 'http://localhost:8000/test'

export async function getUsers(): Promise<any> {
    //const token = document.cookie.split('token=')[1]
    let value = ""
    await fetch(baseURL, {
        method: 'GET',
        //headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        //headers: { 'Content-Type': 'application/json', 'authorization' : token },
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json()) //returns array of data
        .then(res => { console.log(res.data); value = res.data }); //assign state to array res

    return value
}


export async function getjango(): Promise<any> {
    //const token = document.cookie.split('token=')[1]
    let value = ""
    await fetch(baseURL3, {
        method: 'GET',
        //headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        //headers: { 'Content-Type': 'application/json', 'authorization' : token },
        //body: JSON.stringify({msg:'que hay'})
    })
        .then(res => res.json()) //returns array of data
        .then(res => { console.log(res.data); value = res.data }); //assign state to array res

    return value
}

export async function testing(file: any): Promise<any> {
    //const fileBlob = DataURIToBlob(file)
    //let splitFile = file.split('data:image/jpeg;base64,')[1]
    /*const base64Resp = await fetch(file)
    const blob = await base64Resp.blob();
    console.log(blob)*/

    //console.log(file)

    const formdata = new FormData();
    formdata.append('image', file)
    let value = ''

    let res = await fetch(baseURL2, {
        method: 'POST',
        //headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        //headers: { 'Content-Type': 'application/json', 'authorization' : token },
        //headers: { 'Content-Type': 'multipart/form-data' },
        body: formdata,
    })
        .then(res => res.json()) //returns array of data
        //.then(res => {value = res.data}); //assign state to array res
        .then(res => {value = res.data; console.log(res.data)});

    return value;
}


/*export async function playTile(wallet: string, blockPlayed:string[] = ['init']): Promise<any> {
    //let response = await fetch(baseURL).the   n(res => res.text());
    let value : User;
    let res = await fetch(urlPlayTile, {
        method: 'PUT',
        //headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: wallet, blockPlayed: blockPlayed}),
    })
        .then(res => res.json()) //returns array of data
        .then(res => {
            
            value = res.user
        }); //assign state to array res

    return value!;
}*/

/*export async function registerWallet(user: User): Promise<Response> {
    console.log(user)
    let res = await fetch(urlRegisterCasino, {
        method: 'POST',
        //headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        //headers: { 'Content-Type': 'application/json', 'authorization' : token },
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
    return res;
}


export async function loginWallet(wallet: string): Promise<any> {
    let value = ""
    //let response = await fetch(baseURL).the   n(res => res.text());
    let res = await fetch(urlLoginCasino, {
        method: 'POST',
        //headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: wallet }),
    })
        .then(res => res.json()) //returns array of data
        .then(res => {
            document.cookie = `token=${res.token}; max-age=${Date.now() + 1 * 24 * 60 * 60}; path=/; samesite=strict`
            value = res.token
        }); //assign state to array res

    return res;
}*/