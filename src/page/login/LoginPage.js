import React from 'react';
import SideMenu from '../common/menu/SideMenu';
import Card from 'react-bootstrap/Card'
import IconFactory from '../common/IconFactory'

class LoginPage extends React.Component {
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
                            <Card.Title className="text-center">{IconFactory.getLogin()} Login</Card.Title>
                            <Card.Text>
                                <input type="text" placeholder="Username" required="required"/>
                                <input type="password" placeholder="Password" required="required"/>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
                                    <label className="custom-control-label" for="defaultUnchecked">
                                        Keep me logged in.
                                    </label>
                                </div>
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
}

export default LoginPage;