import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Navi() {
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
                    <Link to={`/jobAdvertCreate`}>
                        <Menu.Item
                            name='İlan Oluştur'
                            // active={activeItem === 'messages'}
                            // onClick={this.handleItemClick}
                        />
                    </Link>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button primary>Giriş Yap</Button>
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
