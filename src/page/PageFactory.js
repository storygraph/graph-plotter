import React from 'react';
import GraphEditorPage from './graph_editor/GraphEditorPage';
import LandingPage from './landing/LandingPage';
import RegisterPage from './register/RegisterPage';
import LoginPage from './login/LoginPage';

const Pages = Object.freeze({
    GraphEditor: "/graphEditor",
    Landing: "/landing",
    Register: "/register",
    Login: "/login",
});

class PageFactory extends React.Component {
    constructor(props) {
        super(props);
    }

    currentPage() {
        switch (window.location.pathname) {
            case Pages.GraphEditor:
                return <GraphEditorPage />;
            case Pages.Landing:
                return <LandingPage />;
            case Pages.Register:
                return <RegisterPage />;
            case Pages.Login:
                return <LoginPage />;
            default:
                return <LandingPage />;
        }
    }

    render() {
        return (
            this.currentPage()
        )
    }
}

export default PageFactory;