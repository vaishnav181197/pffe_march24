import React from 'react'
import { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';
import { addResponseContext } from '../Context_Api/ContextShare';

function Add() {
    const [show, setShow] = useState(false);

    const {addResponse,setAddResponse}=useContext(addResponseContext)

    const [projectData, setProjectData] = useState({
        title: "", description: "", languages: "", demo: "", github: "", picture: ""
    })
    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        console.log(projectData.picture.type)
        if (projectData.picture.type != 'image/jpg' && projectData.picture.type != 'image/png' && projectData.picture.type != 'image/jpeg') {
            console.log("invalid file type")
            setImgStatus(false)
            setProjectData({
                title: "", description: "", languages: "", github: "", demo: "", picture: ""
            })
            setPreview("")
        }
        else {
            setImgStatus(true)
            console.log("valid")
            setPreview(URL.createObjectURL(projectData.picture))
        }
    }, [projectData.picture])

    console.log(projectData)

    const handleSubmission = async () => {
        const { title, description, languages, demo, github, picture } = projectData
        if (!title || !description || !languages || !demo || !github || !picture) {
            toast.warning("Fill form with valid Data!!")
        }
        else {
            // api call
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
            //api call
            const res = await addProjectApi(formdata, header)
            if (res.status == 201) {
                toast.success("Project Added Successfully!!")
                handleClose()
                setProjectData({
                    title: "", description: "", languages: "", demo: "", github: "", picture: ""
                })
                setAddResponse(res)
                setPreview("")

            }
            else {
                toast.error("Project Adding failed!! ," + res.response.data)
            }
        }
    }

    const handleClose = () => {
        setShow(false);
        setProjectData({
            title: "", description: "", languages: "", demo: "", github: "", picture: ""
        })
        setPreview("")
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-info' onClick={handleShow}>Add Project</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col">
                            <label htmlFor="img">
                                <input type="file" onChange={(e) => { setProjectData({ ...projectData, picture: e.target.files[0] }) }} name="" id="img" style={{ display: 'none' }} />
                                <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrVLGzO55RQXipmjnUPh09YUtP-BW3ZTUeAA&s"} className='img-fluid' alt="" />
                                {
                                    !imgStatus &&
                                    <p className='text-danger'>Invalid File type...Image must be .png,.jpg or .jpeg</p>
                                }
                            </label>

                        </div>
                        <div className="col">
                            <div>
                                <FloatingLabel controlId="tit" className='mb-2' label="Title">
                                    <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, title: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="des" className='mb-2' label="Description">
                                    <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, description: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="lang" className='mb-2' label="Languages">
                                    <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, languages: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="git" className='mb-2' label="GitHub URL">
                                    <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, github: e.target.value }) }} />
                                </FloatingLabel>

                            </div>
                        </div>
                        <FloatingLabel controlId="demo" label="Demo URL">
                            <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, demo: e.target.value }) }} />
                        </FloatingLabel>
                    </div>.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmission}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add