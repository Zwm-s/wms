import axios from "axios";

const  service =axios.create({
    baseURL:'http://localhost:8090',
})
service.interceptors.request.use(
    config=>{
        const token =sessionStorage.getItem('token')
        if(token){
            config.headers['Token'] = token.replace(/"/g,'');
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default service;