import Detection from "../constants/detection"
import User from "../constants/user"

const baseURL = "https://django-stockrcgnt.herokuapp.com/api/detect"

const detectUrl = "http://127.0.0.1:8000/api/detect"
const detectStateUrl = "http://127.0.0.1:8000/api/detectstate"
const registerUserUrl = "http://127.0.0.1:8000/api/registeruser"
const loginUserUrl = "http://127.0.0.1:8000/api/loginuser"
const registerDetectionUrl = "http://127.0.0.1:8000/api/registerdetection"
const getDetectionUrl = "http://127.0.0.1:8000/api/getdetection"

const baseURL4 = "http://127.0.0.1:8000/api/"
const baseURL3 = 'https://django-stockrcgnt.herokuapp.com/api/'
const baseURL5 = 'https://django-stockrcgnt-production.up.railway.app/api/detect'
//const baseURL = 'https://django-stckrcgnt.vercel.app/api/
const djangoURL = 'http://localhost:8000/detect'

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
    })
        .then(res => res.json()) //returns array of data
        .then(res => { console.log(res.data); value = res.data }); //assign state to array res

    return value
}

export async function detect(file: any): Promise<any> {
    const formdata = new FormData();
    formdata.append('image', file)
    let value = ''

    let res = await fetch(detectUrl, {
        method: 'POST',
        body: formdata,
    })
        .then(res => res.json()) //returns array of data
        .then(res => { value = res; console.log(res) });
    return value;
}

export async function detectState(file: any): Promise<any> {
    const formdata = new FormData();
    formdata.append('image', file)
    let value = ''

    let res = await fetch(detectStateUrl, {
        method: 'POST',
        body: formdata,
    })
        .then(res => res.json()) //returns array of data
        .then(res => { value = res; console.log(res) });
    return value;
}

export async function registerUser(user: User): Promise<any> {
    let res = await fetch(registerUserUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
    return res;
}

export async function registerDetection(detection: Detection): Promise<any> {
    const formdata = new FormData();

    formdata.append('images', detection.images)
    formdata.append('user_id', detection.user_id)
    formdata.append('count', detection.count)
    formdata.append('percentage', detection.percentage)
    formdata.append('date', detection.date.toString())
    formdata.append('names', detection.names)
    formdata.append('nametype', detection.nametype)

    let res = await fetch(registerDetectionUrl, {
        method: 'POST',
        body: formdata
    })
    return res;
}

export async function loginUser(email: string, password: string): Promise<any> {
    let value = false
    let res = await fetch(loginUserUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
    }).then(res => res.json())
        .then((res: any) => {
            if (res.data) {
                console.log('login')
                localStorage.setItem('email', res.data['email'])
                localStorage.setItem('id', res.data['id'])
                localStorage.setItem('enterprise', res.data['enterprise'])
                value = true
            }
            else {
                value = false
            }
        });
    return value;
}
export async function getdetection(date:Date, id: number, productType:string): Promise<any> {
    let value = {}
    let res = await fetch(getDetectionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id:id, date: date, producttype:productType}),

    }).then(res => res.json())
        .then((res: any) => {
            if (res.data) {
                value = res.data
            }
            else {
                value = {}
            }
        });
    return value;
}