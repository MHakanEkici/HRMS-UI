import React, { Fragment } from 'react'
import { Button, Container, Menu, Dropdown, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from "react-toastify";

export default function Navi() {

    const { isLogin, isEmployer } = useSelector(state => state.globalReducer)

    const history = useHistory()

    const options = [
        {
            key: 1,
            text: "Üye Girişi",
            value: 1,
            content: (
                <Header
                    icon="mobile"
                    content="Üye Girişi"
                    subheader="The smallest size"
                />
            )
        },
        {
            key: 2,
            text: "İşveren Girişi",
            value: 2,
            content: (
                <Header
                    icon="tablet"
                    content="İşveren Girişi"
                    subheader="The size in the middle"
                />
            )
        }
    ];

    const signIn = (value, fieldName) => {
        // Login sayfasına yönlendir "/login"

        //login sayfasında servisini çağır
        //sonra then kısmında gelen result isSuccess ise  dispatch(signIn(result)); çağır
        history.push("/login")
    }

    const signOut = () => {
        toast.success("Çıkış yapıldı")
        history.push("/") //anasayfaya yani / pathine yönlendir.     
    }

    const registerCandidate = () => {
        // Üye kayıt olma pathine "/register/candidate" pathine yönlendir.
        history.push("/register/candidate")
    }

    const registerEmployer = () => {
        // İşveren kayıt olma pathine "/register/employer" pathine yönlendir.
        history.push("/register/employer")
    }

    return (
        <div>
            <Menu size='large' style={{ backgroundColor: "#66FCF1", fontFamily: 'Arial', fontize: '16px' }}>
                <Container>
                    <Link to={`/`}>
                        <Menu.Item
                            name='anasayfa'
                            style={{
                                borderStyle: "solid",
                                borderColor: "black",
                                borderWidth: "revert",
                                color: 'black',
                                margin: "8px 0px",
                                padding: "10px"
                            }}
                        />
                    </Link>
                    {isEmployer &&
                        <Link to={`/jobAdvertCreate`}>
                            <Menu.Item
                                name='İlan Oluştur'
                            // active={activeItem === 'messages'}
                            // onClick={this.handleItemClick}
                            />
                        </Link>
                    }

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {isLogin
                                ? //if isLogin
                                <Button style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    borderWidth: "revert",
                                }}
                                    primary onClick={() => signOut()} > Çıkış Yap </Button>
                                : //else
                                <Button style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    borderWidth: "revert",
                                }}
                                    primary onClick={() => signIn()}> Giriş Yap </Button>

                            }
                        </Menu.Item>

                        {!isLogin && //isLogin değilse
                            <Fragment>
                                <Menu.Item>
                                    <Button style={{
                                        borderStyle: "solid",
                                        borderColor: "black",
                                        borderWidth: "revert",
                                    }}
                                        primary onClick={() => registerCandidate()}>Kayıt Ol</Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button style={{
                                        borderStyle: "solid",
                                        borderColor: "black",
                                        borderWidth: "revert",
                                    }}
                                        primary onClick={() => registerEmployer()}>İşveren Kaydı</Button>
                                </Menu.Item>
                            </Fragment>
                        }

                        {/* <Dropdown
                            onChange={(event, data) => {
                                signIn(data.value, data.name);
                            }}
                            selection
                            // fluid
                            options={options}
                            placeholder="Giriş Yap"
                        /> */}

                    </Menu.Menu>

                </Container>
            </Menu>
        </div>
    )
}
