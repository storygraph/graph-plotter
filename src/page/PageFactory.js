import React from 'react';
import GraphEditorPage from './graph_editor/GraphEditorPage';
import LandingPage from './landing/LandingPage';
import RegisterPage from './register/RegisterPage';

const Pages = Object.freeze({
    GraphEditor: "/graphEditor",
    Landing: "/landing",
    Register: "/register",
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