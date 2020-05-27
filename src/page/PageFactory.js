import React from 'react';
import GraphEditorPage from './graph_editor/GraphEditorPage';
import LandingPage from './landing/LandingPage';

const Pages = Object.freeze({
    GraphEditorPage: "/graphEditor",
    Landing: "/landing",
});

class PageFactory extends React.Component {
    constructor(props) {
        super(props);
    }

    currentPage() {
        switch (window.location.pathname) {
            case Pages.GraphEditorPage:
                return <GraphEditorPage />;
            case Pages.Landing:
                return <LandingPage />;
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