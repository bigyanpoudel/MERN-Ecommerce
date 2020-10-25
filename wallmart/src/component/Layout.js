import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Container} from 'react-bootstrap';
const Layout = ({children}) => {
    return (
        <div>
            <Header/>
            <main className="py-3">
                <Container>
                {children}
                </Container>
            </main>
            <Footer/>
        </div>
    )
}
export default Layout
