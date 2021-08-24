import React, { useState, useEffect } from 'react'
import JobAdvertService from '../services/jobAdvertService'
import { Card, Container, Button, Icon } from 'semantic-ui-react'
import { toast } from "react-toastify";
import { Fragment } from 'react'
import backgroundImage from '../media/background.jpg'
import FavouriteJobAdvertService from '../services/favouriteJobAdvertService'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function FavouriteJobAdvert() {

    let { id } = useParams();

    const [favouriteJobAdverts, setFavouriteJobAdverts] = useState([])

    const { candidate, isCandidate, isLogin } = useSelector(state => state.globalReducer)

    let favouriteJobAdvertService = new FavouriteJobAdvertService()
    const handleDeleteFavourite = (favouriteJobAdvertId) => {       
        favouriteJobAdvertService.delete(favouriteJobAdvertId).then((result) => {
            toast.success(result.data.message)
        })    
    }

    useEffect(() => {
        let favouriteJobAdvertService = new FavouriteJobAdvertService()
        favouriteJobAdvertService.getFavouriteJobAdverts(id).then(result => {
            setFavouriteJobAdverts(result.data.data)
        })
    }, [])

    return (
        <Fragment>
            {isCandidate && candidate.userId == id &&
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
                        FAVORİ İŞ İLANLARIM
                    </div>

                    <Card.Group>

                        {favouriteJobAdverts.map((favouriteJobAdvert) => (

                            <Card fluid color="teal" key={favouriteJobAdvert.jobAdvert.jobAdvertId}>
                                <Card fluid color="teal" href={`/jobAdvert/${favouriteJobAdvert.jobAdvert.jobAdvertId}`} key={favouriteJobAdvert.jobAdvert.jobAdvertId}>
                                    <Card.Content >
                                        <Card.Header textAlign="left">{favouriteJobAdvert.jobAdvert.job.jobName}</Card.Header>
                                        <Card.Meta textAlign="left">{favouriteJobAdvert.jobAdvert.employer.companyName}</Card.Meta>
                                        <Card.Description textAlign="left" content={favouriteJobAdvert.jobAdvert.city.cityName} />
                                        <Card.Description textAlign="left" content={favouriteJobAdvert.jobAdvert.workTime} />
                                        <Card.Description textAlign="left" content={favouriteJobAdvert.jobAdvert.workStyle} />
                                        <Card.Description  >
                                            <div style={{ float: "left" }}>
                                                {"Son Basvuru Tarihi: " + favouriteJobAdvert.jobAdvert.deadline}
                                            </div>
                                            <div style={{ float: "right" }}>
                                                {"Oluşturulma tarihi: " + favouriteJobAdvert.jobAdvert.createTime}
                                            </div>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>                              
                                    <Button color="red" onClick={() => { handleDeleteFavourite(favouriteJobAdvert.id) }}>
                                        <Icon name="trash alternate" />
                                        Favorilerden Kaldır                                  
                                </Button>
                            </Card>

                        ))}

                    </Card.Group>

                </Container>
            }
        </Fragment>
    )
}