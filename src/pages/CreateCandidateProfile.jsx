import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from 'react-redux'
import { useFormik } from 'formik';
import { Grid, Image, Icon, List, Divider, TextArea, Input, Modal, Button, Header, Card, GridColumn, Dropdown, Form } from "semantic-ui-react";
import CurriculumVitaeService from '../services/curriculumVitaeService';

export default function CreateCandidateProfile() {

    let curriculumVitaeService = new CurriculumVitaeService()

    const { candidate } = useSelector(state => state.globalReducer)
    const [languageCount, setLanguageCount] = useState([{ language: '', level: '', id: 1 }])

    const levels = [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' }
    ]

    const cardStyle = {
        width: "100%",
        boxShadow: "22px 11px 22px rgb(230, 230, 230)",
        backgroundColor: "#d1fffc",
        marginTop: "40px"
    }

    const addLanguage = () => {
        setLanguageCount([...languageCount, { language: '', level: '', id: 1 }])
    }

    const removeLanguage = (index) => {
        languageCount.splice(index, 1)
        setLanguageCount([...languageCount])
    }

    const handleResult = (result) => {
        if (result !== null && result.data.success) {

            toast.success("CV başarılı bir şekilde eklendi")
        } else {
            if (result !== null) {
                toast.error(result.data.message)
            } else {
                toast.error("Bilinmeyen bir hata alındı")
            }
        }
    }


    const formik = useFormik({
        initialValues: {
            coverLetter: "",
            languageName: "",
            level: 0,
            githubAddress: "",
            finishDate: "",
            position: "",
            startDate: "",
            workplaceName: "",
            knownTechnologies: "",
            linkedinAddress: "",
            department: "",
            graduationDate: "",
            schoolStartDate: "",
            userId: 0,
        },


        onSubmit: (values) => {

            const request =
            {
                coverLetter: values.coverLetter,
                foreignLanguages: [
                    {
                        languageName: "İngilizce",//values.languageName,
                        level: 2 // values.level
                    },
                ],
                githubAddress: values.githubAddress,
                jobExperiences: [
                    {
                        finishDate: values.finishDate,
                        position: values.position,
                        startDate: values.jobStartDate,
                        workplaceName: values.workplaceName
                    }
                ],
                knownTechnologies: values.knownTechnologies,
                linkedinAddress: values.linkedinAddress,
                schools: [
                    {
                        department: values.department,
                        graduationDate: values.graduationDate,
                        schoolName: values.schoolName,
                        startDate: values.schoolStartDate
                    }
                ],
                pictures: [
                    {
                        pictureName: values.pictureName,
                        pictureUrl: values.pictureUrl,
                        pictureId: values.pictureId
                    }
                ],
                userId: 93 // TODO candidate.userId
            }

            curriculumVitaeService.add(request).then((result) => {
                console.log(result)
                handleResult(result)
            });
        },
    });

    const handleChangeSemantic = (value, fieldName) => {
        console.log(value)
        formik.setFieldValue(fieldName, value)
    }


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
            > <Form onSubmit={formik.handleSubmit}>
                    <Card style={cardStyle} >
                        <Grid style={{ width: "100%" }} >
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
                                                <div>
                                                    <label htmlFor="githubAddress">GitHub:</label>
                                                </div>
                                                <div>
                                                    <Input
                                                        id="githubAddress"
                                                        name="githubAddress"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.githubAddress}
                                                        placeholder='GitHub Adresiniz'
                                                    />
                                                </div>
                                                <div style={{ marginTop: "8px" }}>
                                                    <label htmlFor="linkedinAddress">Linkedin:</label>
                                                </div>
                                                <div>
                                                    <Input
                                                        id="linkedinAddress"
                                                        name="linkedinAddress"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.linkedinAddress}
                                                        placeholder='Linkedin Adresiniz'
                                                    />
                                                </div>
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
                                        <TextArea
                                            style={{ width: "100%" }}
                                            rows={11}
                                            id="coverLetter"
                                            name="coverLetter"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.coverLetter}
                                            placeholder='Ön Yazı Giriniz'
                                        />
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

                            <Grid style={{ marginTop: "35px" }}>
                                <Grid.Row
                                    style={{
                                        paddingTop: "0px",
                                        paddingBottom: "25px",
                                    }}
                                >
                                    <Grid.Column width={6}>
                                        <div style={{ fontSize: "16px" }}>
                                            <div>
                                                <label htmlFor="startDate">İşe Başlama Tarihi: </label>
                                            </div>
                                            <div style={{ marginTop: "3px" }}>
                                                <Input
                                                    id="startDate"
                                                    name="startDate"
                                                    type="date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.startDate}
                                                    placeholder='İşe Başlama Tarihiniz'
                                                />
                                            </div>
                                            <div style={{ marginTop: "10px" }}>
                                                <label htmlFor="finishDate">İşten Ayrılma Tarihi: </label>
                                            </div>
                                            <div style={{ marginTop: "3px" }}>
                                                <Input
                                                    id="finishDate"
                                                    name="finishDate"
                                                    type="date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.finishDate}
                                                    placeholder='İşten Ayrılma Tarihiniz'
                                                />
                                            </div>
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
                                                <Input
                                                    id="workplaceName"
                                                    name="workplaceName"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.workplaceName}
                                                    placeholder='İş Yeri Adını Giriniz'
                                                />
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
                                                <Input
                                                    id="position"
                                                    name="position"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.position}
                                                    placeholder='Çalıştığınız Pozisyon'
                                                />
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

                                <Grid >
                                    <Grid.Row
                                        style={{
                                            paddingTop: "0px",
                                            paddingBottom: "25px",
                                        }}
                                    >
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
                                                    <Input
                                                        id="schoolName"
                                                        name="schoolName"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.schoolName}
                                                        placeholder='Okul Adını Giriniz'
                                                    />
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
                                                    <Input
                                                        id="department"
                                                        name="department"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.department}
                                                        placeholder='Okuduğunuz Bölüm'
                                                    />
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
                                                    <Input
                                                        id="schoolStartDate"
                                                        name="schoolStartDate"
                                                        type="date"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.schoolStartDate}
                                                        placeholder='Okula Başladığınız Tarih'
                                                    />
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
                                                    <Input
                                                        id="graduationDate"
                                                        name="graduationDate"
                                                        type="date"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.graduationDate}
                                                        placeholder='Mezuniyet Tarihi'
                                                    />
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
                            style={{ marginLeft: "15px", marginRight: "15px", marginBottom: "25px" }}
                        >
                            <div className="cv-right-header">
                                <Icon name="pencil" /> <b>Yetenekler</b>
                            </div>
                            <div style={{ marginTop: "10px", margin: "0 auto" }}>
                                <TextArea rows={5} style={{ width: "100%" }}
                                    id="knownTechnologies"
                                    name="knownTechnologies"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.knownTechnologies}
                                    placeholder='Bildiğiniz Teknolojileri Yazınız'
                                />
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

                            <List style={{ marginTop: "20px" }}>
                                {
                                    languageCount.map((item, index) => (
                                        <Fragment>
                                            <List.Item>
                                                <Grid>
                                                    <Grid.Row style={{ display: "block" }}>
                                                        <GridColumn style={{ width: "auto" }}>
                                                            <div style={{
                                                                fontSize: "18px",
                                                                marginBottom: "7px",
                                                            }}>
                                                                <Icon name="comment alternate" />
                                                                <span>
                                                                    Dil:
                                                                </span>
                                                            </div>
                                                            <Input
                                                                id="index"
                                                                name={`item.${index}.languge`}
                                                                type="text"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.languageName + index}
                                                                placeholder='Dil Adını Giriniz'
                                                            />
                                                        </GridColumn>

                                                        <GridColumn style={{ width: "auto" }}>
                                                            <div style={{ marginTop: "10px", fontSize: "15px" }}>
                                                                <label>Seviye:</label>
                                                            </div>
                                                            <div>
                                                                <Dropdown
                                                                    search
                                                                    selection
                                                                    onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, data.name)
                                                                    }
                                                                    name='level'
                                                                    value={formik.values.level}
                                                                    options={levels}
                                                                    placeholder='(5 Çok İyi - 1 Çok Az)'
                                                                />
                                                            </div>
                                                        </GridColumn>

                                                        <GridColumn style={{ width: "auto", marginTop: "27px" }}>
                                                            <Button
                                                                icon
                                                                primary
                                                                onClick={() => removeLanguage(index)}
                                                            >
                                                                <Icon name='delete' />

                                                            </Button>
                                                        </GridColumn>
                                                    </Grid.Row>
                                                </Grid>
                                            </List.Item>
                                        </Fragment>
                                    ))
                                }
                            </List>
                            <Button
                                icon
                                primary
                                onClick={() => addLanguage()}
                            >
                                <Icon name='add' />

                            </Button>
                        </div>
                    </Card>
                    <Button
                        content="Ekle"
                        labelPosition="right"
                        icon="add"
                        positive
                        size="big"
                        type="submit"
                        style={{ backgroundColor: "#7FFFFD", marginTop: "10px" }}
                    />
                </Form>
            </div>

        </Fragment >
    )
}