import React, { Fragment } from 'react'
import { Button, Container, Menu, Dropdown, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { signOut } from '../store/actions/globalActions'

export default function Navi({ clearData }) {

    const { isLogin, isEmployer, isCandidate, candidate, employer } = useSelector(state => state.globalReducer)

    const history = useHistory()
    const dispatch = useDispatch()

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

    const goToHomePage = (value, fieldName) => {
        history.push("/")
    }

    const goToJobAdvertCreatePage = (value, fieldName) => {
        history.push("/jobAdvertCreate")
    }

    const goToLoginPage = (value, fieldName) => {
        history.push("/login")
    }

    const goToProfilePage = (value, fieldName) => {
        history.push("/candidateProfile/" + candidate.userId)
    }

    const goToFavouriteJobAdvertPage = (value, fieldName) => {
        history.push("/favouriteJobAdvert/" + candidate.userId)
    }

    const callSignOut = () => {
        clearData()
        dispatch(signOut());
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

        <Menu size='large' style={{ backgroundColor: "#45c4cd", fontFamily: 'Arial', fontize: '16px' }}>
            <Container>
                <Menu.Item>
                    <Button style={{
                        borderStyle: "solid",
                        borderColor: "black",
                        borderWidth: "revert",
                    }}
                        primary onClick={() => goToHomePage()}> Anasayfa
                    </Button>
                </Menu.Item>

                {isEmployer &&
                    <Menu.Item>
                        <Button style={{
                            borderStyle: "solid",
                            borderColor: "black",
                            borderWidth: "revert",
                        }}
                            primary onClick={() => goToJobAdvertCreatePage()}> İlan Oluştur
                        </Button>
                    </Menu.Item>
                }

                {isCandidate &&
                    <Fragment>
                        <Menu.Item>
                            Hoşgeldin {candidate.firstName + " " + candidate.lastName}
                        </Menu.Item>
                    </Fragment>
                }
                {isEmployer &&
                    <Fragment>
                        <Menu.Item>
                            Hoşgeldin {employer.companyName}
                        </Menu.Item>
                    </Fragment>
                }


                <Menu.Menu position='right'>
                    <Menu.Item>
                        {isLogin
                            ? //if isLogin
                            <Fragment>
                                {isCandidate &&
                                    <Button style={{
                                        borderStyle: "solid",
                                        borderColor: "black",
                                        borderWidth: "revert",
                                        marginRight: "10px"
                                    }}
                                        primary onClick={() => goToFavouriteJobAdvertPage()}>Favori İlanlarım
                                    </Button>
                                }
                                {isCandidate &&
                                    <Button style={{
                                        borderStyle: "solid",
                                        borderColor: "black",
                                        borderWidth: "revert",
                                        marginRight: "10px"
                                    }}
                                        primary onClick={() => goToProfilePage()}>Profilim
                                    </Button>
                                }
                                <Button style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    borderWidth: "revert"
                                }}
                                    primary onClick={() => callSignOut()} > Çıkış Yap
                                </Button>
                            </Fragment>
                            : //else
                            <Button style={{
                                borderStyle: "solid",
                                borderColor: "black",
                                borderWidth: "revert",
                            }}
                                primary onClick={() => goToLoginPage()}> Giriş Yap
                            </Button>

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
                                    primary onClick={() => registerCandidate()}>Kayıt Ol
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    borderWidth: "revert",
                                }}
                                    primary onClick={() => registerEmployer()}>İşveren Kaydı
                                </Button>
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

    )
}
