import React, { useState } from "react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useFormik } from 'formik';
import { Grid, Image, Icon, List, TextArea, Input, Button, Card, GridColumn, Dropdown, Form } from "semantic-ui-react";
import CurriculumVitaeService from '../services/curriculumVitaeService';
import PictureService from '../services/pictureService';

export default function CreateCandidateProfile() {

    let curriculumVitaeService = new CurriculumVitaeService()
    let pictureService = new PictureService()

    const history = useHistory()

    const { candidate } = useSelector(state => state.globalReducer)

    const [image, setImage] = useState({ preview: "", raw: "" });
    const [languageInputs, setLanguageInputs] = useState([{ language: '', level: '' }])
    const [schoolInputs, setSchoolInputs] = useState([{ schoolName: '', department: '', schoolStartDate: '', graduationDate: '' }])
    const [jobExperienceInputs, setJobExperienceInputs] = useState([{ workplaceName: '', position: '', startDate: '', finishDate: '' }])

    const levels = [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' }
    ]

    //PICTURE UPLOAD

    const onFileChange = (e) => {       
        if (e.target.files.length) {
            const types = ['image/png', 'image/jpeg']
            // if (types.every(type => e.target.files[0].type !== type)) {
            //     e.target.value = null
            //     toast.warning("png veya jpeg türünde dosya yükleyiniz")
            //     return;
            // }
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    }

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            image.raw,
            image.raw.name
        );
        // await fetch("YOUR_URL", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "multipart/form-data"
        //     },
        //     body: formData
        //   });
    }

    //LANGUAGE INPUTS
    const addLanguageInput = () => {
        setLanguageInputs([...languageInputs, { language: '', level: '' }])
    }

    const removeLanguageInput = (index) => {
        const list = [...languageInputs];
        list.splice(index, 1)
        setLanguageInputs(list)
    }

    const handleLanguageInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...languageInputs];
        list[index][name] = value;
        setLanguageInputs(list);
    };

    const handleLevelChange = (value, name, index) => {
        const list = [...languageInputs];
        list[index][name] = value;
        setLanguageInputs(list);
    }

    //SCHOOL INPUTS
    const addSchoolInput = () => {
        setSchoolInputs([...schoolInputs, { schoolName: '', department: '', schoolStartDate: '', graduationDate: '' }])
    }

    const removeSchoolInput = (index) => {
        const list = [...schoolInputs];
        list.splice(index, 1)
        setSchoolInputs(list)
    }

    const handleSchoolInputsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...schoolInputs];
        list[index][name] = value;
        setSchoolInputs(list);
    };

    //JOB EXPERIENCE INPUTS
    const addJobExperienceInput = () => {
        setJobExperienceInputs([...jobExperienceInputs, { workplaceName: '', position: '', startDate: '', finishDate: '' }])
    }

    const removeJobExperienceInput = (index) => {
        const list = [...jobExperienceInputs];
        list.splice(index, 1)
        setJobExperienceInputs(list)
    }

    const handleJobExperienceInputsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...jobExperienceInputs];
        list[index][name] = value;
        setJobExperienceInputs(list);
    };

    //HANDLE RESULT
    const handleResult = (result) => {
        if (result !== null && result.data.success) {
            toast.success("CV başarılı bir şekilde eklendi")
            history.push("/candidateProfile/" + candidate.userId)
        } else {
            if (result !== null) {
                toast.error(result.data.message)
            } else {
                toast.error("Bilinmeyen bir hata alındı")
            }
        }
    }

    //FORMIK
    const formik = useFormik({
        initialValues: {
            githubAddress: "",
            linkedinAddress: "",
            coverLetter: "",
            knownTechnologies: "",
            userId: candidate.userId,
        },
        onSubmit: (values) => {

            const formData = new FormData();
            formData.append(
                "multipartFile",
                image.raw,
                "profile"
            );         
           
            pictureService.uploadPicture(values.userId, formData).then((result) => { debugger;
                if (result !== null && result.data.success) {
                    const cvRequest =
                    {
                        githubAddress: values.githubAddress,
                        linkedinAddress: values.linkedinAddress,
                        coverLetter: values.coverLetter,
                        jobExperiences: jobExperienceInputs,
                        schools: schoolInputs,
                        foreignLanguages: languageInputs,
                        knownTechnologies: values.knownTechnologies,
                        userId: values.userId
                    }
                    debugger;
                    // curriculumVitaeService.add(cvRequest).then((result) => {
                    //     handleResult(result)
                    // });
                } else {
                    if (result !== null) {
                        toast.error(result.data.message)
                    } else {
                        toast.error("Bilinmeyen bir hata alındı")
                    }
                }
            });


        }
    });

    //STYLE
    const cardStyle = {
        width: "100%",
        boxShadow: "22px 11px 22px rgb(230, 230, 230)",
        backgroundColor: "#d1fffc",
        marginTop: "40px"
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
                    src={image.preview ? image.preview : "https://i1.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1"}
                    alt="dummy"
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

                <div              
                    style={{
                        position: "absolute",
                        marginTop: "200px", //245px
                        marginLeft: "120px", //50px
                        paddingTop: "10px",
                        paddingLeft: "3px",
                        fontSize: "30px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        borderStyle: "solid",
                        borderColor: "black",
                        borderWidth: "medium"
                    }}
                >
                    <input
                        id="uploadButton"
                        type="file"
                        accept="image/*"
                        onChange={e => onFileChange(e)}
                        style={{ display: "none" }}
                    />
                    <label htmlFor="uploadButton">
                        <Icon name= {image.preview ? "edit" : "camera"} />
                        {/* <div
                            style={{
                                marginTop: "7px",
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            Resim Yüklemek<br></br> İçin Tıklayınız
                        </div> */}
                    </label>
                </div>

            </div>

            <div style={{ marginTop: "60px", marginLeft: "28px", fontSize: "25px", float: "left" }}>
                {candidate?.firstName}{" "}
                {candidate?.lastName}
            </div>

            <div style={{ marginTop: "90px" }}>
                <Form onSubmit={formik.handleSubmit}>

                    <Card style={cardStyle} >
                        <Grid style={{ width: "100%", marginTop: "-10px", marginBottom: "10px" }} >
                            <Grid.Row>

                                <Grid.Column width={6} >
                                    <div style={{ textAlign: "left", marginLeft: "28px" }} >
                                        <div className="cv-left-bar-header">
                                            <Icon name="at" /> Email
                                        </div>
                                        {candidate?.email}
                                        <div className="cv-left-bar-header">
                                            <Icon name="table" /> Doğum Tarihi
                                        </div>
                                        {candidate?.birthDate}
                                        <div className="cv-left-bar-header">
                                            <Icon name="thumbtack" /> Linkler
                                        </div>


                                        <div style={{ marginBottom: "10px" }}>
                                            <label htmlFor="githubAddress" style={{ fontSize: "16px" }}>GitHub:</label>
                                            <Input
                                                id="githubAddress"
                                                name="githubAddress"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.githubAddress}
                                                placeholder='GitHub Adresiniz'
                                                style={{ marginLeft: "18px" }}
                                            />
                                        </div>

                                        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                                            <label htmlFor="linkedinAddress" style={{ fontSize: "16px" }}>Linkedin:</label>
                                            <Input
                                                id="linkedinAddress"
                                                name="linkedinAddress"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.linkedinAddress}
                                                placeholder='Linkedin Adresiniz'
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </div>
                                    </div>
                                </Grid.Column>

                                <GridColumn width={10} style={{ paddingRight: "20px", height: "100%", paddingLeft: "0" }} >
                                    <div className="cv-left-bar-header">
                                        Ön Yazı
                                    </div>
                                    <TextArea
                                        style={{ width: "100%", marginTop: "10px" }}
                                        rows={10}
                                        id="coverLetter"
                                        name="coverLetter"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.coverLetter}
                                        placeholder='Ön Yazı Giriniz'
                                    />
                                </GridColumn>
                            </Grid.Row>
                        </Grid>
                    </Card>

                    <Card style={cardStyle} >
                        <div className="cv-card-header">
                            <Icon name="briefcase" /> <b>İş Deneyimleri</b>
                        </div>
                        <div style={{ marginBottom: "20px", marginTop: "5px" }}>
                            <List style={{ marginBottom: "15px" }}>
                                {
                                    jobExperienceInputs.map((item, index) => (
                                        <Fragment>
                                            <List.Item>
                                                <Grid style={{ marginTop: "10px", marginBottom: "0px" }}>
                                                    {/* <Grid style={{ marginTop: "5px", marginBottom: "10px" }}> */}
                                                    <Grid.Row style={{ padding: "0px", display: "block" }}>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                İş Yeri Adı
                                                            </div>
                                                            <Input
                                                                id="workplaceName"
                                                                name="workplaceName"
                                                                type="text"
                                                                onChange={e => handleJobExperienceInputsChange(e, index)}
                                                                value={item.workplaceName}
                                                                placeholder='İş Yeri Adını Giriniz'
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                Pozisyon
                                                            </div>
                                                            <Input
                                                                id="position"
                                                                name="position"
                                                                type="text"
                                                                onChange={e => handleJobExperienceInputsChange(e, index)}
                                                                value={item.position}
                                                                placeholder='Çalıştığınız Pozisyon'
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                İşe Başlama Tarihi:
                                                            </div>
                                                            <Input
                                                                id="startDate"
                                                                name="startDate"
                                                                type="date"
                                                                onChange={e => handleJobExperienceInputsChange(e, index)}
                                                                value={item.startDate}
                                                                placeholder='İşe Başlama Tarihiniz'
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                İşten Ayrılma Tarihi:
                                                            </div>
                                                            <Input
                                                                id="finishDate"
                                                                name="finishDate"
                                                                type="date"
                                                                onChange={e => handleJobExperienceInputsChange(e, index)}
                                                                value={item.finishDate}
                                                                placeholder='İşten Ayrılma Tarihiniz'
                                                            />
                                                        </Grid.Column>

                                                        {index !== 0 &&
                                                            <GridColumn style={{ width: "auto", marginTop: "27px" }}>
                                                                <Button
                                                                    icon
                                                                    primary
                                                                    onClick={() => removeJobExperienceInput(index)}
                                                                    type="button"
                                                                >
                                                                    <Icon name="delete" />
                                                                </Button>
                                                            </GridColumn>
                                                        }
                                                        {index === 0 && jobExperienceInputs.length > 1 &&
                                                            <GridColumn></GridColumn>
                                                        }

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
                                onClick={() => addJobExperienceInput()}
                                type="button"
                            >
                                <Icon name='add' />
                            </Button>
                        </div>
                    </Card>

                    <Card style={cardStyle}>
                        <div className="cv-card-header">
                            <Icon name="building" />
                            <b>Eğitim</b>
                        </div>
                        <div style={{ marginBottom: "20px", marginTop: "5px" }}>
                            <List style={{ marginBottom: "15px" }}>
                                {
                                    schoolInputs.map((item, index) => (
                                        <Fragment>
                                            <List.Item>

                                                <Grid style={{ marginTop: "10px", marginBottom: "0px" }}>
                                                    <Grid.Row style={{ padding: "0px", display: "block" }}>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                <Icon name="graduation cap" />
                                                                Okul
                                                            </div>
                                                            <Input
                                                                id="schoolName"
                                                                name="schoolName"
                                                                type="text"
                                                                onChange={e => handleSchoolInputsChange(e, index)}
                                                                value={item.schoolName}
                                                                placeholder='Okul Adını Giriniz'
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                Bölüm
                                                            </div>
                                                            <Input
                                                                id="department"
                                                                name="department"
                                                                type="text"
                                                                onChange={e => handleSchoolInputsChange(e, index)}
                                                                value={item.department}
                                                                placeholder='Okuduğunuz Bölüm'
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                Başlangıç
                                                            </div>
                                                            <Input
                                                                id="schoolStartDate"
                                                                name="schoolStartDate"
                                                                type="date"
                                                                onChange={e => handleSchoolInputsChange(e, index)}
                                                                value={item.schoolStartDate}
                                                                placeholder='Okula Başladığınız Tarih'
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                                                                Bitiş
                                                            </div>
                                                            <Input
                                                                id="graduationDate"
                                                                name="graduationDate"
                                                                type="date"
                                                                onChange={e => handleSchoolInputsChange(e, index)}
                                                                value={item.graduationDate}
                                                                placeholder='Mezuniyet Tarihi'
                                                            />
                                                        </Grid.Column>

                                                        {index !== 0 &&
                                                            <GridColumn style={{ width: "auto", marginTop: "27px" }}>
                                                                <Button
                                                                    icon
                                                                    primary
                                                                    onClick={() => removeSchoolInput(index)}
                                                                    type="button"
                                                                >
                                                                    <Icon name="delete" />
                                                                </Button>
                                                            </GridColumn>
                                                        }
                                                        {index === 0 && schoolInputs.length > 1 &&
                                                            <GridColumn></GridColumn>
                                                        }

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
                                onClick={() => addSchoolInput()}
                                type="button"
                            >
                                <Icon name='add' />
                            </Button>
                        </div>
                    </Card>

                    <Card style={cardStyle} >
                        <div style={{ marginBottom: "20px", marginLeft: "20px", marginRight: "20px" }} >

                            <div className="cv-card-header">
                                <Icon name="pencil" />
                                <b>Yetenekler</b>
                            </div>

                            <div style={{ margin: "0 auto", }}>
                                <TextArea rows={5} style={{ width: "100%", marginTop: "15px" }}
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

                    <Card style={cardStyle} >
                        <div style={{ marginBottom: "20px" }} >

                            <div className="cv-card-header">
                                <Icon name="language" />
                                <b>Diller</b>
                            </div>

                            <List style={{ marginBottom: "0px" }}>
                                {
                                    languageInputs.map((item, index) => (
                                        <Fragment>
                                            <List.Item>
                                                <Grid>
                                                    <Grid.Row style={{ display: "block", marginBottom: "15px" }}>

                                                        <GridColumn style={{ width: "auto" }}>
                                                            <div style={{ marginBottom: "10px", fontSize: "16px" }}>
                                                                {/* <Icon name="comment alternate" /> */}
                                                                <label>Dil:</label>
                                                            </div>
                                                            <Input
                                                                name="language"
                                                                type="text"
                                                                onChange={e => handleLanguageInputChange(e, index)}
                                                                value={item.language}
                                                                placeholder='Dil Adını Giriniz'
                                                            />
                                                        </GridColumn>

                                                        <GridColumn style={{ width: "auto" }}>
                                                            <div style={{ marginBottom: "10px", fontSize: "16px" }}>
                                                                <label>Seviye:</label>
                                                            </div>
                                                            <Dropdown
                                                                search
                                                                selection
                                                                onChange={(event, data) =>
                                                                    handleLevelChange(data.value, data.name, index)
                                                                }
                                                                name="level"
                                                                value={item.level}
                                                                options={levels}
                                                                placeholder="(5 Çok İyi - 1 Çok Az)"
                                                            />
                                                        </GridColumn>

                                                        {index !== 0 &&
                                                            <GridColumn style={{ width: "auto", marginTop: "27px" }}>
                                                                <Button
                                                                    icon
                                                                    primary
                                                                    onClick={() => removeLanguageInput(index)}
                                                                    type="button"
                                                                >
                                                                    <Icon name="delete" />
                                                                </Button>
                                                            </GridColumn>
                                                        }
                                                        {index === 0 && languageInputs.length > 1 &&
                                                            <GridColumn></GridColumn>
                                                        }

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
                                onClick={() => addLanguageInput()}
                                type="button"
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