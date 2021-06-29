import React, { useState, useEffect, Fragment } from 'react'
import CandidateService from '../services/candidateService';
import { useFormik } from 'formik';
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react"

export default function RegisterCandidate() {

    let candidateService = new CandidateService()

    const formik = useFormik({
        initialValues: {
            birthDate: "",
            confirmPassword: "",
            email: "",
            firstName: "",
            identityNumber: 0,
            lastName: "",
            password: ""
        },
        onSubmit: (values) => {
            const request =
            {
                birthDate: values.birthDate,
                confirmPassword: values.confirmPassword,
                email: values.email,
                firstName: values.firstName,
                identityNumber: values.identityNumber,
                lastName: values.lastName,
                password: values.password
            }

            candidateService.registerCandidate(request).then((result) => console.log(result));
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
                                    <label htmlFor="firstName">İsim</label>
                                    <TextArea rows={1}
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        placeholder='İsminiz'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="lastName">Soy İsim</label>
                                    <TextArea rows={1}
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        placeholder='Soy isminiz'
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
                                    <label htmlFor="identityNumber">T.C. Kimlik No</label>
                                    <TextArea rows={1}
                                        id="identityNumber"
                                        name="identityNumber"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.identityNumber}
                                        placeholder='Kimlik numaranız' //TODO placeholder 0 olarak gözüküyor
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
                            <Form.Field width={5}> 
                                <label htmlFor="birthDate">Doğum Tarihi</label> 
                                <Input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    onChange={formik.handleChange}
                                    value={formik.values.birthDate}
                                    placeholder='Doğum tarihiniz'
                                />
                            </Form.Field>
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
