import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";

export default function Navi() {

    const { isLogin, isEmployer } = useSelector(state => state.globalReducer)

    const signIn = () => {
        //login servisiini çağır
        //sonra then kısmında gelen result isSuccess ise  dispatch(signIn(result)); çağır
        toast.success("Giriş yapıldı")
    }

    const signOut = () => {
        toast.success("Çıkış yapıldı")
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
                            {isLogin ?
                                <Button
                                    primary
                                    onClick={() => signOut()}
                                >
                                    Çıkış Yap
                                </Button>
                            :
                                <Button
                                    primary
                                    onClick={() => signIn()}
                                >
                                    Giriş Yap
                                </Button>
                            }
                        </Menu.Item>
                        <Menu.Item>
                            <Button primary>Kayıt Ol</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
