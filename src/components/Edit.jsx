import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/base_url';
import { updateProjectApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { editResponseContext } from '../Context_Api/ContextShare';

function Edit({ project }) {
    const [show, setShow] = useState(false);
    const [projectData, setProjectData] = useState({
        ...project
    })
    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")
    const {editResponse,setEditResponse}=useContext(editResponseContext)

    useEffect(() => {
        if (projectData.picture.type != 'image/jpg' && projectData.picture.type != 'image/png' && projectData.picture.type != 'image/jpeg') {
            console.log("invalid file type")
            setImgStatus(false)
            setProjectData({
                ...project
            })
            setPreview("")
        }
        else {
            setImgStatus(true)
            console.log("valid")
            setPreview(URL.createObjectURL(projectData.picture))
        }
    }, [projectData.picture])

    const handleUpdate = async() => {
        const { title, description, languages, github, demo, picture } = projectData
        if (!title || !description || !languages || !demo || !github || !picture) {
            toast.warning("Fill form with valid Data!!")
        }
        else {
            if (imgStatus) {
                const formdata = new FormData()
                formdata.append("title", title)
                formdata.append("description", description)
                formdata.append("languages", languages)
                formdata.append("github", github)
                formdata.append("demo", demo)
                formdata.append("picture", picture)

                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
                const result=await updateProjectApi(project._id,formdata,header)
                if(result.status==200){
                    toast.success("Project Updated Successfully!!")
                    handleClose()
                    setEditResponse(result)
                }
                else{
                    toast.error("Updation Failed!!")
                    console.log(result)
                }

            }
            else {
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }

                const result=await updateProjectApi(project._id,projectData,header)
                if(result.status==200){
                    toast.success("Project Updated Successfully!!")
                    handleClose()
                    setEditResponse(result)
                }
                else{
                    toast.error("Updation Failed!!")
                    console.log(result)
                }

            }
        }

    }


    const handleClose = () => {
        setShow(false)
        setProjectData({
            ...project
        })
        setPreview("")
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="btn p-1 border me-3 border-dark" onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square fa-2xl"></i>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col">
                            <label htmlFor="img">
                                <input type="file" onChange={(e) => { setProjectData({ ...projectData, picture: e.target.files[0] }) }} name="" id="img" style={{ display: 'none' }} />
                                <img src={preview ? preview : `${base_url}/upload/${projectData?.picture}`} className='img-fluid' alt="" />
                            </label>
                        </div>
                        <div className="col">
                            <div>
                                <FloatingLabel controlId="tit" className='mb-2' label="Title">
                                    <Form.Control type="text" value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} />
                                </FloatingLabel>

                                <FloatingLabel controlId="des" className='mb-2' label="Description">
                                    <Form.Control type="text" value={projectData?.description} onChange={(e) => { setProjectData({ ...projectData, description: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="lang" className='mb-2' label="Languages">
                                    <Form.Control type="text" value={projectData?.languages} onChange={(e) => { setProjectData({ ...projectData, languages: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="git" className='mb-2' label="GitHub URL">
                                    <Form.Control type="text" value={projectData?.github} onChange={(e) => { setProjectData({ ...projectData, github: e.target.value }) }} />
                                </FloatingLabel>

                            </div>
                        </div>
                        <FloatingLabel controlId="demo" label="Demo URL">
                            <Form.Control type="text" value={projectData?.demo} onChange={(e) => { setProjectData({ ...projectData, demo: e.target.value }) }} />
                        </FloatingLabel>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit