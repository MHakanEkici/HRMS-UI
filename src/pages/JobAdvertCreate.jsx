import React, { useState, useEffect, Fragment } from 'react'
import JobAdvertService from '../services/jobAdvertService'
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react"
import { useFormik } from 'formik';
import CityService from '../services/cityService';
import JobService from '../services/jobService';

export default function JobAdvertCreate() {

    let jobAdvertService = new JobAdvertService();

    const workStyles = [
        { text: 'Uzaktan Çalışma', value: 'Uzaktan Çalışma' },
        { text: 'Ofiste Çalışma', value: 'Ofiste Çalışma' },
    ]

    const workTimes = [
        { text: 'Tam Zamanlı', value: 'Tam Zamanlı' },
        { text: 'Yarı Zamanlı', value: 'Yarı Zamanlı' },
    ]

    const [cities, setCities] = useState([])

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        // return ile render edilen bileşenlerden sonra yapılacak işlemler burada yapılır
        let cityService = new CityService();
        let jobService = new JobService();

        cityService.getCities().then(result => {
            const cityList = []

            result.data.data.map(cityResult => {
                let city = {
                    text: cityResult.cityName,
                    value: cityResult.cityId
                }
                cityList.push(city)
            })

            setCities(cityList);
        })

        jobService.getJobs().then(result => {           
            const jobList = []

            result.data.data.map(jobResult => {
                let job = {
                    text: jobResult.jobName,
                    value: jobResult.jobId
                }
                jobList.push(job)
            })

            setJobs(jobList);
        })


    }, [])


    const formik = useFormik({
        initialValues: {
            workStyle: "",
            workTime: "",
            city: 0,
            job: 0,
            deadline: '',
            description: '',
            employerId: 84, //TODO
            salary: "belirtilmemiş",
            openPositionCount: "belirtilmemiş"
        },


        onSubmit: (values) => {

            const request =
            {
                city: {
                    cityId: values.city
                },
                deadline: values.deadline,
                description: values.description,
                employer: {
                    userId: 84 //TODO
                },
                job: {
                    jobId: values.job
                },
                openPositionCount: values.openPositionCount,
                salary: values.salary,
                workTime: values.workTime,
                workStyle: values.workStyle
            }

            jobAdvertService.add(request).then((result) => console.log(result));

        },
    });

    const handleChangeSemantic = (value, fieldName) => {       
        formik.setFieldValue(fieldName, value)
    }

    return (
        <Fragment>
            <Card fluid style={{backgroundColor: "#d1fffc"}}>
                <Card.Content header='İş ilanı Ekle' />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label htmlFor="salary">Meslek</label>
                                <Dropdown
                                    search
                                    selection
                                    onChange={(event, data) =>
                                        handleChangeSemantic(data.value, data.name)
                                    }
                                    name='job'
                                    value={formik.values.job}
                                    options={jobs}
                                    placeholder='Meslek Seçiniz'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="salary">Şehir</label>
                                <Dropdown
                                    search
                                    selection
                                    onChange={(event, data) =>
                                        handleChangeSemantic(data.value, data.name)
                                    }
                                    name='city'
                                    value={formik.values.city}
                                    options={cities}
                                    placeholder='Şehir Seçiniz'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field style={{ marginBottom: "1rem" }}>
                                <label htmlFor="workStyle">Çalışma Türü</label>
                                <Dropdown
                                    search
                                    selection
                                    onChange={(event, data) => {
                                        handleChangeSemantic(data.value, data.name)
                                    }}
                                    name='workStyle'
                                    value={formik.values.workStyle}
                                    options={workStyles}
                                    placeholder='Çalışma Şeklini Seçiniz'

                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="workTime">Çalışma Saati</label>
                                <Dropdown
                                    search
                                    selection
                                    onChange={(event, data) =>
                                        handleChangeSemantic(data.value, data.name)
                                    }
                                    name='workTime'
                                    value={formik.values.workTime}
                                    options={workTimes}
                                    placeholder='Çalışma Zamanını Seçiniz'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label htmlFor="salary">Maaş</label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.salary}
                                    placeholder='Maaş Giriniz'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="openPositionCount">Açık Pozisyon Sayısı</label>
                                <Input
                                    id="openPositionCount"
                                    name="openPositionCount"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.openPositionCount}
                                    placeholder='Açık Pozisyon Sayısını Giriniz'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label htmlFor="description">Açıklama</label>
                            <TextArea rows={8}
                                id="description"
                                name="description"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                placeholder='Açıklama giriniz'
                            />
                        </Form.Field>
                        <Form.Field width={5}>
                            <label htmlFor="deadline">Son Başvuru Tarihi</label> 
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                onChange={formik.handleChange}
                                value={formik.values.deadline}
                                placeholder='Son başvuru tarih giriniz'                               
                            />
                        </Form.Field>
                        <Button
                            content="Ekle"
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
    );
}