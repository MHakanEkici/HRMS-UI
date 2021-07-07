import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { useHistory } from 'react-router';
import { Grid, Image, Icon, List, Divider, TextArea, Input, Modal, Button, Header, Card, GridColumn, } from "semantic-ui-react";
import CurriculumVitaeService from '../services/curriculumVitaeService';
import CandidateService from '../services/candidateService';

export default function CandidateProfile() {
    let { id } = useParams(); //userId mi olması gerek ?

    const history = useHistory()
    
    const [candidate, setCandidate] = useState({})
    const [curriculumVitae, setcurriculumVitae] = useState({})
    const cardStyle = {
        width: "100%",
        boxShadow: "22px 11px 22px rgb(230, 230, 230)",
        backgroundColor: "#d1fffc",
        marginTop: "40px"
    }

    useEffect(() => {
        let curriculumVitaeService = new CurriculumVitaeService()
        let candidateService = new CandidateService()

        candidateService.getCandidateById(id).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message)
            }else{ //Servis cagrimi basarili ise               
                setCandidate(result.data.data)                  
                              
            }    
        })   

        curriculumVitaeService.getByUserId(id).then(result => {           
            if(!result.data.success) {
                toast.error(result.data.message)
            }else{ //Servis cagrimi basarili ise
                if(result.data.data !== undefined && result.data.data !== null){ //CV kaydi varsa
                   setcurriculumVitae(result.data.data)                   
                }else{                  
                    history.push("/candidateProfileCreate")
                }               
            }           
        })

    }, []);



    return (

        <Fragment>
            <div style={{ height: '300px' }}>
                <Image
                    className="cv-profile-img"
                    src={"https://www.uscybersecurity.net/wp-content/uploads/2017/06/network-integrity-1100x300.jpg"}
                    size="large"
                    style={{
                        width: "1130px",
                        height: "300px",
                        position: "absolute",
                        borderStyle: "solid",
                        borderWidth: "thick",
                        borderColor: "black"
                    }}

                />
                <Image
                    className="cv-profile-img"
                    src={curriculumVitae.pictures !== undefined ? curriculumVitae.pictures[0].pictureUrl : "https://i1.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1"}
                    size="small"
                    style={{
                        width: "150px",
                        height: "150px",
                        marginTop: "200px",
                        marginLeft: "20px",
                        position: "absolute",
                        borderRadius: "50%",
                        borderStyle: "solid",
                        borderColor: "black",
                        borderWidth: "thick",
                    }}
                />

            </div>
            <div style={{ marginTop: "60px", marginLeft: "28px", fontSize: "25px", float: "left" }}>
                {candidate?.firstName}{" "}
                {candidate?.lastName}
            </div>
            <div
                style={{
                    marginTop: "90px",
                    // borderRadius: "15px",

                }}
            >
                <Card
                    style={cardStyle}
                >
                    <Grid>
                        <Grid.Row>
                            <Grid.Column
                                width={4}
                                style={{ paddingRight: "0px", height: "100%", paddingLeft: "0" }}
                            >
                                <div className="cv-left">
                                    {/* <div style={{ marginTop: "20px", fontSize: "25px" }}>
                                        {curriculumVitae.candidate?.firstName}{" "}
                                        {curriculumVitae.candidate?.lastName}
                                    </div> */}
                                    <div
                                        style={{
                                            textAlign: "left",
                                            marginLeft: "28px",
                                        }}
                                    >
                                        <div>
                                            <div className="cv-left-bar-header">
                                                <Icon name="at" /> Email
                                            </div>
                                            <span
                                            // style={{ color: "#d4d4d4" }}
                                            >
                                                {candidate?.email}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="cv-left-bar-header">
                                                <Icon name="table" /> Doğum Tarihi
                                            </div>
                                            <div>
                                                <span
                                                // style={{ color: "#d4d4d4" }}
                                                >
                                                    {candidate?.birthDate}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="cv-left-bar-header">
                                                <Icon name="thumbtack" /> Linkler
                                            </div>
                                            <div style={{ marginBottom: "10px" }}>
                                                <span
                                                // style={{ color: "#d4d4d4" }}
                                                >
                                                    <a
                                                        href={curriculumVitae?.githubAddress}
                                                        target="_blank"
                                                        rel="noopener noreferrer"

                                                    >
                                                        GitHub
                                                    </a>
                                                </span>
                                                <span style={{ marginLeft: "10px" }}
                                                // style={{ color: "#d4d4d4" }}
                                                >
                                                    <a
                                                        href={curriculumVitae?.linkedinAddress}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Linkedin
                                                    </a>
                                                </span>
                                            </div>
                                            {/* <LinkUpdateModal
                                            candidateLinks={curriculumVitae.candidateLinks}
                                            candidateId={id}
                                        /> */}
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                            <GridColumn
                                width={12}
                                style={{ marginTop: "15px", paddingRight: "0px", height: "100%", paddingLeft: "0" }}
                            >
                                <Card.Content header="Ön Yazı" className="cv-left-bar-header" />
                                <Card.Content>
                                    {curriculumVitae.coverLetter !== undefined ? curriculumVitae.coverLetter : "-----"}
                                </Card.Content>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </Card>
                {/* <Grid
                    style={{
                        marginTop: "40px"
                    }}
                >
                    <Grid.Row
                        style={{
                            alignItems: "center",
                            padding: "0",
                            backgroundColor: "white",
                            borderRadius: "15px",
                        }}
                    > */}
                {/* 
                        <Grid.Column
                            // width={11}
                            style={{ paddingLeft: "0px", height: "100%", padding: "0px" }}
                        >
                            <div
                                className="cv-right"
                                style={{
                                    backgroundColor: "#fff",
                                    padding: "30px",
                                    paddingBottom: "5px",
                                }}
                            > */}
                <Card
                    style={cardStyle}
                >
                    <div className="job-experiences" style={{ marginLeft: "15px" }}>
                        <div className="cv-right-header">
                            <Icon name="briefcase" /> <b>İş Deneyimleri</b>
                        </div>
                        <div>
                            <List>
                                {curriculumVitae.jobExperiences?.map((experience) => (
                                    <List.Item
                                        key={experience.id}
                                        style={{ marginTop: "35px" }}
                                    >
                                        <Grid>
                                            <Grid.Row
                                                style={{
                                                    paddingTop: "0px",
                                                    paddingBottom: "25px",
                                                }}
                                            >
                                                <Grid.Column width={6}>
                                                    <div style={{ fontSize: "16px" }}>
                                                        <Icon name="long arrow alternate right" />
                                                        {experience.startDate} - {" "}
                                                        {experience.finishDate == null
                                                            ? "Hala Devam Ediyor"
                                                            : experience.finishDate}
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column width={5}>
                                                    <div style={{ textAlign: "center" }}>
                                                        <div
                                                            style={{
                                                                fontSize: "18px",
                                                                marginBottom: "7px",
                                                            }}
                                                        >
                                                            İş Yeri Adı
                                                        </div>
                                                        <span className="cv-right-grey-text">
                                                            {experience.workplaceName}
                                                        </span>
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column width={5}>
                                                    <div style={{ textAlign: "center" }}>
                                                        <div
                                                            style={{
                                                                fontSize: "18px",
                                                                marginBottom: "7px",
                                                            }}
                                                        >
                                                            Pozisyon
                                                        </div>
                                                        <span className="cv-right-grey-text">
                                                            {experience.position}
                                                        </span>
                                                    </div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </List.Item>
                                ))}
                            </List>
                            {/* <JobExperienceUpdateModal
                                            candidateJobExperiences={curriculumVitae.jobExperiences}
                                            candidateId={id}
                                        />*/}
                        </div>
                    </div>
                </Card>
                {/* <Divider style={{ marginLeft: "0px" }} /> */}
                <Card
                    style={cardStyle}
                >
                    <div className="educations" style={{ marginLeft: "15px" }}>
                        <div className="cv-right-header">
                            <Icon name="building" /> <b>Eğitim</b>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <List>
                                {curriculumVitae.schools?.map((school) => (
                                    <Grid key={school.id}>
                                        <Grid.Row>
                                            <Grid.Column width={3}>
                                                <div style={{
                                                    fontSize: "18px",
                                                    marginBottom: "7px",
                                                }}>
                                                    <Icon name="graduation cap" />
                                                    <span>
                                                        Okul
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="cv-right-grey-text">
                                                        {school.name}
                                                    </span>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={5}>
                                                <div style={{
                                                    fontSize: "18px",
                                                    marginBottom: "7px",
                                                }}>
                                                    <span>
                                                        Bölüm
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="cv-right-grey-text">
                                                        {school.department}
                                                    </span>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <div style={{
                                                    fontSize: "18px",
                                                    marginBottom: "7px",
                                                }}>
                                                    <span>
                                                        Başlangıç
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="cv-right-grey-text">
                                                        {school.startDate}
                                                    </span>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={5}>
                                                <div style={{
                                                    fontSize: "18px",
                                                    marginBottom: "7px",
                                                }}>
                                                    <span>
                                                        Bitiş
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="cv-right-grey-text">
                                                        {school.graduationDate == null
                                                            ? "Hala Devam Ediyor"
                                                            : school.graduationDate}
                                                    </span>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                ))}
                            </List>
                            {/* <SchoolUpdateModal
                                            candidateSchools={curriculumVitae.schools}
                                            candidateId={id}
                                        /> */}
                        </div>
                    </div>
                </Card>
                {/* <Divider style={{ marginLeft: "0px" }} /> */}
                <Card
                    style={cardStyle}
                >
                    <div
                        className="skills"
                        style={{ marginLeft: "15px", marginBottom: "25px" }}
                    >
                        <div className="cv-right-header">
                            <Icon name="pencil" /> <b>Yetenekler</b>
                        </div>
                        <div style={{ margin: "0 auto" }}>
                            <Input> {/*textAlign işe yaramadı ona bak !!!!!!! */}
                                {curriculumVitae?.knownTechnologies}
                            </Input>
                        </div>
                    </div>
                </Card>
                {/* <Divider style={{ marginLeft: "0px" }} /> */}
                <Card
                    style={cardStyle}
                >
                    <div
                        className="languages"
                        style={{ marginLeft: "15px", marginBottom: "25px" }}
                    >
                        <div className="cv-right-header">
                            <Icon name="language" /> <b>Diller</b>
                        </div>
                        <div>
                            <List>
                                <Grid columns={2} style={{ marginTop: "20px" }}>
                                    {curriculumVitae.foreignLanguages?.map((language) => (
                                        <Grid.Column
                                            key={language.id}
                                            style={{ paddingTop: "0px" }}
                                        >
                                            <List.Item>
                                                <div style={{
                                                    fontSize: "18px",
                                                    marginBottom: "7px",
                                                }}>
                                                    <Icon name="comment alternate" />
                                                    <span>
                                                        Dil:
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="cv-right-grey-text" >
                                                        {language.languageName}
                                                    </span>

                                                    <span
                                                        className="cv-right-grey-text"
                                                        style={{ marginLeft: "20px" }}
                                                    >
                                                        Seviye:
                                                    </span>
                                                    <span className="cv-right-grey-text" >
                                                        {language.level}
                                                    </span>
                                                </div>
                                            </List.Item>
                                        </Grid.Column>
                                    ))}
                                </Grid>
                            </List>
                            {/* <LanguageUpdateModal
                                            candidateLanguages={curriculumVitae.languages}
                                            candidateId={id}
                                        /> */}
                        </div>
                    </div>
                </Card>
                {/* </div>
                        </Grid.Column> */}
                {/* </Grid.Row>
                </Grid> */}
            </div>
        </Fragment>
    )
}
