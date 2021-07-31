import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Radio, TextArea, Input } from 'semantic-ui-react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import CandidateService from '../services/candidateService';
import EmployerService from '../services/employerService';
import { toast } from 'react-toastify';
import { signIn } from '../store/actions/globalActions'

export default function Login() {

    let candidateService = new CandidateService();
    let employerService = new EmployerService();

    const dispatch = useDispatch()
    const history = useHistory()

    const [userType, setUserType] = useState('')

    const handleChange = (e, { value }) => {
        setUserType(value)
    }

    const handleResult = (result) => {
        if (result !== null && result.data.success) {
            dispatch(signIn(result));

            toast.success("Giriş başarılı")

            history.push("/")

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
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            const request =
            {
                email: values.email,
                password: values.password
            }

            if (userType === "Candidate") {
                candidateService.logInCandidate(request).then((result) => {
                    handleResult(result)
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Bilinmeyen bir hata alındı")
                });
            }
            else {
                employerService.logInEmployer(request).then((result) => {
                    handleResult(result)
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Bilinmeyen bir hata alındı")
                });
            }
        }
    });

    return (
        <div>
            <Grid textAlign='center' style={{ backgroundColor: "white", height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, marginBottom: "400px" }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        {/* <Image src='/logo.png' /> */}
                        Hesabınıza giriş yapın
                    </Header>
                    {/*formik eklenecek*/}
                    <Form
                        size='large'
                        onSubmit={formik.handleSubmit}>  {/*Formik onSubmit çağrımı*/}
                        <Segment stacked>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-Posta adresi'
                            />
                            <Input style={{ marginTop: "15px" }}
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Parola'
                            />

                            <Form.Field style={{ marginTop: "15px" }}>
                                <Radio
                                    label='Üye'
                                    name='radioGroup'
                                    value='Candidate'
                                    checked={userType === 'Candidate'}
                                    onChange={handleChange}
                                    style={{ marginRight: "30px" }}
                                />

                                <Radio
                                    label='İşveren'
                                    name='radioGroup'
                                    value='Employer'
                                    checked={userType === 'Employer'}
                                    onChange={handleChange}
                                />
                            </Form.Field>

                            <Button
                                color='teal'
                                fluid
                                size='large'
                                type="submit"
                            >
                                Giriş yap
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}