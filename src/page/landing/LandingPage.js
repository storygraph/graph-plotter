import React from 'react';
import './LandingPage.css';
import IconFactory from '../common/IconFactory'
import Card from 'react-bootstrap/Card'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    jumbotron() {
        return (
            <div className="jumbotron-wrapper">
                <div className="jumbotron-content">
                    <div className="col-md-6">
                        <h1>Story Graph</h1>
                        <p>A storytelling state-control system</p>
                        <a href="/graphEditor" className="btn">{IconFactory.getController()} Try out the editor</a>
                    </div>
                    <Card className="col-md-4 card">
                        <Card.Body>
                            <Card.Title>Onto your next big story!</Card.Title>
                            <Card.Text>
                                <input placeholder="Username" />
                                <input placeholder="Password" />
                                <button className="btn">{IconFactory.getLogin()} Login</button>
                                <hr />
                                <p>Forgotten password? Click <a href="#">here to restore.</a></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }

    description() {
        return (
            <div className="section">
                <Card className="col-md-4 card">
                    <Card.Body>
                        <Card.Title>Automatic plot hole detection</Card.Title>
                        <Card.Text>
                            Embrace the possibility to be free of. We provide you with a static story logic checker that guarantees story robustness.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className="col-md-4">
                    <img src={require('../../img/wireframe_ball.png')} />
                </div>
                <Card className="col-md-4 card">
                    <Card.Body>
                        <Card.Title>Modelling the antimathematical with maths</Card.Title>
                        <Card.Text>
                            We model a story as a set of storylines with states at every given moment. Each state is modeled via a graph where the vertices and the edges are respectively the story protagonists and their corresponding relations.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    tutorials() {
        return (
            <div className="jumbotron-wrapper jumbotron-wrapper-rotated-top">
                <div className="jumbotron-content text-center">
                    <h3>Become a storyteller in seconds! It's never been easier!</h3>
                    <p>You can start with watching one of our tutorials or directly in the playground.</p>
                    <div className="col-md-4">
                        <a href="/graphEditor" className="btn giant-button">{IconFactory.getController()}</a>
                    </div>
                    <div className="col-md-4">
                        <a className="btn giant-button">{IconFactory.getPlayStack()}</a>
                    </div>
                </div>
            </div>
        );
    }

    founders() {
        return (
            <div className="section text-center">
                <h1>Our founders</h1><br />
                <Card className="col-md-3 card">
                    <Card.Img variant="top" src={require('../../img/ivan_hristov.jpg')} />
                    <Card.Body>
                        <Card.Title>Ivan Hristov</Card.Title>
                        <Card.Text>
                            A fisherman experienced with a wide variety of technologies. Always trying to learn something new.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className="col-md-2"></div>
                <Card className="col-md-3 card">
                    <Card.Img variant="top" src={require('../../img/georgi_atanasov.jpg')} />
                    <Card.Body>
                        <Card.Title>Georgi Atanasov</Card.Title>
                        <Card.Text>
                            A geek never failing to impress. Has the ability to turn a grain of wheat into an elephant within seconds.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.jumbotron()}
                {this.description()}
                {this.tutorials()}
                {this.founders()}
            </div>
        );
    }
}

export default LandingPage;