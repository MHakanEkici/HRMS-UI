import React, { useState, useEffect, Fragment } from 'react'
import EmployerService from '../services/employerService'
import { useFormik } from 'formik';
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react"

export default function RegisterEmployer() {

    let employerService = new EmployerService()

    const formik = useFormik({
        initialValues: {
            confirmPassword: "",
            email: "",
            companyName: "",
            phoneNumber: "",
            webAdress: "",
            password: ""
        },
        onSubmit: (values) => {
            const request =
            {
                confirmPassword: values.confirmPassword,
                email: values.email,
                companyName: values.companyName,
                phoneNumber: values.phoneNumber,
                webAdress: values.webAdress,
                password: values.password
            }

            employerService.registerEmployer(request).then((result) => console.log(result));
            // Servisi entegre et
            // jobAdvertService.add(request).then((result) => { console.log(result) //burada dispatch ile ilgili action type çağrılır. });

        }
    });

    return (
        <div>
             <Fragment>
                <Card fluid>
                    <Card.Content header='Üye Ol' />
                    <Card.Content>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label htmlFor="companyName">Şirket İsmi</label>
                                    <TextArea rows={1}
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.companyName}
                                        placeholder='Şirket ismini giriniz'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="webAdress">Web Adresi</label>
                                    <TextArea rows={1}
                                        id="webAdress"
                                        name="webAdress"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.webAdress}
                                        placeholder='Web Adresiniz'
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label htmlFor="email">E-Posta Adresi</label>
                                    <TextArea rows={1}
                                        id="email"
                                        name="email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        placeholder='E-Posta adresiniz'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="phoneNumber">Telefon No</label>
                                    <TextArea rows={1}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                        placeholder='Telefon numaranız' //TODO placeholder 0 olarak gözüküyor
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label htmlFor="password">Parola</label>
                                    <TextArea rows={1}
                                        id="password"
                                        name="password"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        placeholder='Parolanız'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="confirmPassword">Parolanızı Doğrulayın</label>
                                    <TextArea rows={1}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                        placeholder='Parolanız'
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Button
                                content="Üye Ol"
                                labelPosition="right"
                                icon="add"
                                positive
                                type="submit"
                                style={{ backgroundColor: "blue", marginLeft: "0px" }}
                            />
                        </Form>
                    </Card.Content>
                </Card>
            </Fragment>
        </div>
    )
}
