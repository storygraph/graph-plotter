import React from 'react';
import SideMenu from '../common/menu/SideMenu';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SideMenu menuType={SideMenu.READER_MENU} />
            </div>
        );
    }
}

export default RegisterPage;