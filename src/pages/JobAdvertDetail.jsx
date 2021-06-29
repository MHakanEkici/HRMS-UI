import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header, Icon, Table, Button, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux'
import JobAdvertService from "../services/jobAdvertService";

export default function JobAdvertDetail() {
  let { id } = useParams();

  const [jobAdvert, setJobAdvert] = useState({})

  const { isLogin, isEmployer } = useSelector(state => state.globalReducer)

  useEffect(() => {
    let jobAdvertService = new JobAdvertService()
    jobAdvertService.getByJobAdvertId(id).then(result => {
      setJobAdvert(result.data.data)
    })
  }, []);


  const handleApply = () => {
    if (isLogin) {
      toast.success("İlana başvuru yapıldı")
    }
    else {
      //TODO kayıt olma sayfasına yönlendirilecek
    }
  }

  return (
    <div>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Table celled color={"black"} stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>İş veren</Table.HeaderCell>
                  <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="building" />
                        Şirket Adı
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {/* <br></br> Bir alt satıra almak istersen*/}
                    {jobAdvert.employer !== undefined ? jobAdvert.employer.companyName : ""}
                  </Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="mail" />
                        Email
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAdvert.employer !== undefined ? jobAdvert.employer.email : ""}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="phone" />
                        Telefon
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAdvert.employer !== undefined ? jobAdvert.employer.phoneNumber : ""}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="world" />
                        Web Sitesi
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAdvert.employer !== undefined ? jobAdvert.employer.webAdress : ""}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="list ul" />
                        Detaylar
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Button /*animated as={Link} to={`/employers/${jobAd.employer?.id}`}*/>
                      <Button.Content visible>Detaylara Git</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={10}>
            <Table celled fixed singleLine color={"black"}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>İş İlanı</Table.HeaderCell>
                  <Table.HeaderCell>Detaylar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>İş Pozisyonu</Table.Cell>
                  <Table.Cell>{jobAdvert.job !== undefined ? jobAdvert.job.jobName : ""}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Şehir</Table.Cell>
                  <Table.Cell>{jobAdvert.city !== undefined ? jobAdvert.city.cityName : ""}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Çalışma Şekli</Table.Cell>
                  <Table.Cell>{jobAdvert !== undefined ? jobAdvert.workStyle : ""}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Çalışma Zamanı</Table.Cell>
                  <Table.Cell>{jobAdvert !== undefined ? jobAdvert.workTime : ""}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell> Maaş</Table.Cell>
                  <Table.Cell> {jobAdvert !== undefined ? jobAdvert.salary : ""}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Açık Pozisyonlar</Table.Cell>
                  <Table.Cell>{jobAdvert !== undefined ? jobAdvert.openPositionCount : ""}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Son Başvuru Tarihi</Table.Cell>
                  <Table.Cell>{jobAdvert !== undefined ? jobAdvert.deadline : ""}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card fluid color={"black"}>
              <Card.Content header="Açıklama" />
              <Card.Content>
                {jobAdvert !== undefined ? jobAdvert.description : ""}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              content="Başvur"
              labelPosition="right"
              icon="arrow circle right"
              positive
              // type="button"
              onClick={() => handleApply()}
              style={{ backgroundColor: "green" }}
            />
          </Grid.Column>
        </Grid.Row>


      </Grid>
    </div>
  );
}
