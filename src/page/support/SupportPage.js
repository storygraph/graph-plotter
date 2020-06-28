import React from 'react';
import SideMenu from '../common/menu/SideMenu';
import Card from 'react-bootstrap/Card'
import IconFactory from '../common/IconFactory'

class SupportPage extends React.Component {
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
                            <Card.Title className="text-center">{IconFactory.getLifebelt()} Support</Card.Title>
                            <Card.Text>
                                <textarea placeholder="Describe your issue here..." required="required"/>
                                <button className="btn">{IconFactory.getLifebelt()} Get support</button>
                                <hr />
                                <p>Feel free to submit feedback on any buggy feature.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SupportPage;