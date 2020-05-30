import React from 'react';
import SideMenu from '../common/menu/SideMenu';
import Card from 'react-bootstrap/Card'
import IconFactory from '../common/IconFactory'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-wrapper">
                <SideMenu menuType={SideMenu.READER_MENU} />
                <div className="page-content">
                    <Card className="col-md-5 card">
                        <Card.Body>
                            <Card.Title className="text-center">{IconFactory.getRegister()} Register</Card.Title>
                            <Card.Text>
                                <input placeholder="Email" />
                                <input placeholder="Username" />
                                <input placeholder="Password" />
                                <input placeholder="Repeat password" />
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
                                    <label className="custom-control-label" for="defaultUnchecked">
                                        I agree with the <a href="#">terms of use.</a>
                                    </label>
                                </div>
                                <button className="btn">{IconFactory.getRegister()} Register</button>
                                <hr />
                                <p>Already registered? Login from <a href="/login">here.</a></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default RegisterPage;