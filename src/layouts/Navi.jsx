import React, { Fragment } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from "react-toastify";

export default function Navi() {

    const { isLogin, isEmployer } = useSelector(state => state.globalReducer)

    const history = useHistory()

    const signIn = () => {
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
            <Menu size='large' style={{ backgroundColor: `rgba(247, 213, 4, 1)`, fontFamily: 'Arial', fontize: '16px' }}>
                <Container>
                    <Link to={`/`}>
                        <Menu.Item
                            name='anasayfa'
                            style={{ color: 'black' }}
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
                                <Button primary onClick={() => signOut()} > Çıkış Yap </Button>
                                : //else
                                <Button primary onClick={() => signIn()}> Giriş Yap </Button>
                            }
                        </Menu.Item>

                        {!isLogin && //isLogin değilse
                            <Fragment>
                                <Menu.Item>
                                    <Button primary onClick={() => registerCandidate()}>Kayıt Ol</Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button primary onClick={() => registerEmployer()}>İşveren Kaydı</Button>
                                </Menu.Item>
                            </Fragment>
                        }

                    </Menu.Menu>

                </Container>
            </Menu>
        </div>
    )
}
