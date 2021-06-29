import React, { useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useFormik } from 'formik';
import CandidateService from '../services/candidateService';


export default function Login() {

    let candidateService = new CandidateService();

    const signIn = () => {
        
        //login sayfasında servisini çağır
        //sonra then kısmında gelen result isSuccess ise  dispatch(signIn(result)); çağır
       
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""           
        },
        onSubmit: (values) => {
            const request =
            {
                email:  values.email,               
                password: values.password                
            }

            candidateService.logInCandidate(request).then((result) => console.log(result));
            // Servisi entegre et
            // jobAdvertService.add(request).then((result) => { console.log(result) //burada dispatch ile ilgili action type çağrılır. });

        }
    });

    return (
        <div>
            <Grid textAlign='center' style={{backgroundColor: "white",  height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, marginBottom: "400px" }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        {/* <Image src='/logo.png' /> */}
                         Hesabınıza giriş yapın
                    </Header>
                     {/*formik eklenecek*/}                  
                    <Form size='large' onSubmit={formik.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='teal' fluid size='large'  onClick={() => signIn()} >
                                Giriş yap
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}