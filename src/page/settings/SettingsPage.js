import React from 'react';
import './SettingsPage.css';
import SideMenu from '../common/menu/SideMenu';
import IconFactory from '../common/IconFactory';
import Card from 'react-bootstrap/Card';


class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-wrapper">
                <SideMenu menuType={SideMenu.STORY_TELLER_MENU} />
                <div className="page-content">
                    <Card className="col-md-5 card">
                        <Card.Body>
                            <Card.Title className="text-center">{IconFactory.getGear()} Settings</Card.Title>
                            <Card.Img variant="top" src="http://placekitten.com/350/350" />
                            
                            <Card.Text>
                                <input placeholder="Email" value="cate@cat.com" />
                                <input placeholder="Username" value="Cat Catson" />
                                <input placeholder="Expertise" />
                                <textarea placeholder="Short writer portfolio..." />
                                <button className="btn">{IconFactory.getGear()} Update data</button>
                                <hr />
                                <p>Forgotten password? Click <a href="#">here to restore.</a></p>
                                <p><a href="#">Export my data</a></p>
                                <p><a href="#">Purge my data</a></p>
                                <p><a href="#">Delete account</a></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SettingsPage;