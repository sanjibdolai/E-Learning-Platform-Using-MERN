import { Col, Container, Row, Accordion, ListGroup, Tabs, Tab, Ratio, Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

import ReactPlayer from 'react-player'
import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { getEnrolledCourseDetails, updateEnrolledCourseStatus } from "../utilities/commonfunctions";

function Course() {

    const [course, setCourse] = useState({});
    const [currentLession, setCurrentLession] = useState({});
    const [currentTopicId, setCurrentTopicId ]= useState();
    const params = useParams();
    const [topNavTitle,setTopNavTitle]=useOutletContext();
    const [courseProgress,setCourseProgress]=useState();
    
    const getCourseStatus=(data)=>{
        setCourse(data.courseId);
        setCourseProgress(data.courseProgress);
    }
    
    const getLessionStatus=(topicId,lessionId)=>{
       var status=(courseProgress[topicId] && courseProgress[topicId][lessionId] && courseProgress[topicId][lessionId]==="Completed") ? true :false;
        return status;
    }

    useEffect(() => {
        getEnrolledCourseDetails(params.id,setCourse,(data)=>{
            setTopNavTitle(<h2>{data.courseId.courseTitle}</h2>);
            getCourseStatus(data);
        });
        
    }, []);

    const onVideoFinish=()=>{
        var obj={
            courseId:course._id,
            topicId:currentTopicId,
            lessionId:currentLession._id
        };
        updateEnrolledCourseStatus(obj,getCourseStatus);
    }

    return (
        <>
        {course &&
            <Container fluid className="py-2">
                <Row>
                    <Col lg="8" className="px-0">
                        <Container fluid className="bg-dark w-100  px-sm-0">
                            <Ratio aspectRatio="16x9" className="px-lg-5 px-sm-0">
                                <ReactPlayer
                                    url={currentLession.lessionVideoURL}
                                    width="100%" height="100%"
                                    controls={true}
                                    onEnded={onVideoFinish}
                                />
                            </Ratio>

                        </Container>
                        <Tabs defaultActiveKey="content" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="content" title="Content">
                               <div dangerouslySetInnerHTML={{ __html: currentLession.lessionContent }} />
                            </Tab>
                            <Tab eventKey="discussion" title="Discussion">
                                
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews">
                              
                            </Tab>
                        </Tabs>

                    </Col>
                    <Col lg="4" className="pe-0 ps-2">
                        <Accordion >
                            {course.topics && course.topics.map((topic, index) =>
                                <Accordion.Item key={index} eventKey={topic._id}>
                                    <Accordion.Header onClick={()=>setCurrentTopicId(topic._id)}>
                                        <h6>Section 1: {topic.topicName}</h6>
                                    </Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        <ListGroup as="ul">
                                            {topic.lessions.map((lession, inx) =>
                                                <ListGroup.Item
                                                key={inx}
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start"
                                                    action
                                                    onClick={() => setCurrentLession({ ...lession })}
                                                >
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{inx + 1}. {lession.lessionTitle}</div>
                                                        <span><i className="fa-solid fa-circle-play"></i> {lession.lessionDuration}min</span>
                                                    </div>
                                                    {courseProgress && getLessionStatus(topic._id,lession._id) &&
                                                    <i className="fa fa-check-circle mt-3 text-success"></i>
                                                    }
                                                </ListGroup.Item>
                                            )}

                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                           
                        </Accordion>
                    </Col>
                </Row>
            </Container>
}
        </>
    );
}
export default Course;