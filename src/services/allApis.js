import commonApi from "./commonApi";
import base_url from "./base_url";


export const registerApi=async(data)=>{
    return await commonApi("POST",`${base_url}/reg`,data,"")
}

export const loginApi=async(data)=>{
    return await commonApi("POST",`${base_url}/log`,data,"")
}

export const addProjectApi=async(data,header)=>{
    return await commonApi("POST",`${base_url}/addproject`,data,header)
}

export const getUserProjectsApi=async(header)=>{
    return await commonApi("GET",`${base_url}/userprojects`,"",header)
}

export const getAllProjects=async()=>{
    return await commonApi("GET",`${base_url}/allprojects`,"","")
}

export const deleteProjectApi=async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/deleteproject/${id}`,{},header)
}

export const updateProjectApi=async(id,data,header)=>{
    return await commonApi("PUT",`${base_url}/updateproject/${id}`,data,header)
}

export const updateProfileApi=async(data,header)=>{
    return await commonApi("PATCH",`${base_url}/profile`,data,header)
}