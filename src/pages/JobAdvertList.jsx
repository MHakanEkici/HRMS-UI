import React, { useState, useEffect } from 'react'
import JobAdvertService from '../services/jobAdvertService'
import { Card, Container } from 'semantic-ui-react'
import { Fragment } from 'react'
import backgroundImage from '../media/background.jpg'

export default function JobAdvertList() {

    const [jobAdverts, setJobAdverts] = useState([])

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getJobAdverts().then(result => {
            setJobAdverts(result.data.data)
        })
    }, [])

    return (
        <Fragment>
            <Container
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    minHeight: "calc(100vh - 60px)"
                }}
            >

                <div style={{ fontSize: "20px", padding: "20px 0px", fontWeight: "bold", fontFamily: "cursive" }}>
                    İŞ İLANLARI
                </div>

                <Card.Group>

                    {jobAdverts.map((jobAdvert) => (

                        <Card fluid color="teal" href={`/jobAdvert/${jobAdvert.jobAdvertId}`} key={jobAdvert.jobAdvertId}>
                            <Card.Content >
                                <Card.Header textAlign="left">{jobAdvert.job.jobName}</Card.Header>
                                <Card.Meta textAlign="left">{jobAdvert.employer.companyName}</Card.Meta>
                                <Card.Description textAlign="left" content={jobAdvert.city.cityName} />
                                <Card.Description textAlign="left" content={jobAdvert.workTime} />
                                <Card.Description textAlign="left" content={jobAdvert.workStyle} />
                                <Card.Description  >
                                    <div style={{ float: "left" }}>
                                        {"Son Basvuru Tarihi: " + jobAdvert.deadline}
                                    </div>
                                    <div style={{ float: "right" }}>
                                        {"Oluşturulma tarihi: " + jobAdvert.createTime}
                                    </div>
                                </Card.Description>
                            </Card.Content>
                        </Card>

                    ))}

                </Card.Group>

            </Container>
        </Fragment>
    )
}
