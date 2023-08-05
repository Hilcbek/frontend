import axios from 'axios'
export let Axios = axios.create({
    baseURL : 'https://oose-ass.onrender.com/api',
    withCredentials : true
})
export let UploadImage = async (url) => {
    try {
        let form = new FormData();
        form.append('cloud_name','du9pkirsy')
        form.append('upload_preset','user_profile')
        form.append('file',url)
        let data = await axios.post(`https://api.cloudinary.com/v1_1/du9pkirsy/image/upload`,form)
        return data
    } catch (error) {
        console.error(error)
    }
}