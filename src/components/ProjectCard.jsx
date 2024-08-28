import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ProjectCard.css'
import base_url from '../services/base_url';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img onClick={handleShow} variant="top" src={`${base_url}/upload/${project.picture}`} height={'180px'}/>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col">
                            <img className='img-fluid' src={`${base_url}/upload/${project.picture}`} alt="pro" />
                        </div>
                        <div className="col"  >
                            <h2  className='card-styles'>{project.title}</h2>
                            <h4 className='card-styles'>{project.description}</h4>
                            <h4 className='card-styles'>Languages : {project.languages}</h4>
                            <div className='d-flex justify-content-between card-styles'>
                                <a href={project.github}>
                                    <i className="fa-brands fa-github fa-xl"></i>
                                </a>
                                <a href={project.demo}>
                                    <i className="fa-solid fa-link fa-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard