import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from 'react-redux'
import { Grid, Image, Icon, List, Divider, TextArea, Input, Modal, Button, Header, Card, GridColumn, } from "semantic-ui-react";
import CurriculumVitaeService from '../services/curriculumVitaeService';

export default function CreateCandidateProfile() {

    const { candidate } = useSelector(state => state.globalReducer)
    const cardStyle = {
        width: "100%",
        boxShadow: "22px 11px 22px rgb(230, 230, 230)",
        backgroundColor: "#d1fffc",
        marginTop: "40px"
    }

    useEffect(() => {


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
                    src={"https://i1.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1"}
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
                    marginTop: "90px"
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
                                    <div
                                        style={{
                                            textAlign: "left",
                                            marginLeft: "28px",
                                        }}
                                    >
                                        <div className="cv-left-bar-header">
                                            <Icon name="at" /> Email
                                        </div>
                                        <span
                                        // style={{ color: "#d4d4d4" }}
                                        >
                                            {candidate?.email}
                                        </span>


                                        <div className="cv-left-bar-header">
                                            <Icon name="table" /> Doğum Tarihi
                                        </div>
                                        <div className="cv-left-bar-header">
                                            <Icon name="thumbtack" /> Linkler
                                        </div>
                                        <div style={{ marginBottom: "10px" }}>
                                            {/* // LİNKEDLN LİNK INPUTU EKLE */}
                                            {/* // GİTHUB LİNK INPUTU EKLE */}
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
                                    {/* // ON YAZI TEXTARE EKLE */}
                                </Card.Content>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </Card>

                <Card
                    style={cardStyle}
                >
                    <div className="job-experiences" style={{ marginLeft: "15px" }}>
                        <div className="cv-right-header">
                            <Icon name="briefcase" /> <b>İş Deneyimleri</b>
                        </div>

                        <Grid  style={{ marginTop: "35px" }}>
                            <Grid.Row
                                style={{
                                    paddingTop: "0px",
                                    paddingBottom: "25px",
                                }}
                            >
                                <Grid.Column width={6}>
                                    <div style={{ fontSize: "16px" }}>
                                        <Icon name="long arrow alternate right" />
                                        {/* //İŞ STARTDATE <EKLE>*/}
                                        {/* //İŞFİNİSHDATE EKLE</EKLE> */}
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
                                            {/* //İŞ YERİ ADI <EKLE>*/}
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
                                            {/* //İŞ POZİSYON <EKLE>*/}
                                        </span>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
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

                            <Grid>
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
                                                {/* //OKUL ADI <EKLE>*/}
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
                                                {/* //BÖLÜM ADI <EKLE>*/}
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
                                                {/* //OKUL BAŞLANGIÇ TARİHİ <EKLE>*/}
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
                                                {/* //OKUL Mezuniyet TARİHİ <EKLE>*/}
                                            </span>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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
                            {/* //YETENEK EKLE Mezuniyet TARİHİ <EKLE>*/}
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

                            <Grid columns={2} style={{ marginTop: "20px" }}>
                                <Grid.Column                                   
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
                                                {/* //DİL ADI EKLE */}
                                            </span>

                                            <span
                                                className="cv-right-grey-text"
                                                style={{ marginLeft: "20px" }}
                                            >
                                                Seviye:
                                            </span>
                                            <span className="cv-right-grey-text" >
                                                {/* //DİL SEVİYESİ EKLE */}
                                            </span>
                                        </div>
                                    </List.Item>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </div>
                </Card>
            </div>

        </Fragment >
    )
}
