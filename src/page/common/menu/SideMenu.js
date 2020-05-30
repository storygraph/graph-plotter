import React from 'react';
import './SideMenu.css';
import IconFactory from '../IconFactory';
import MenuRegistry from './MenuRegistry';

const SIDE_MENU_WIDE = "side-menu-wide";
const SIDE_MENU = "side-menu";

const STORY_TELLER_MENU = "story_teller";
const READER_MENU = "reader";

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSideMenu = this.toggleSideMenu.bind(this);
    }

    componentDidMount() {
        this.sideMenu = document.getElementById("side-menu");
    }

    toggleSideMenu() {
        if (this.sideMenu.className !== SIDE_MENU) {
            this.sideMenu.className = SIDE_MENU;
            return;
        }

        this.sideMenu.className = SIDE_MENU + " " + SIDE_MENU_WIDE;
    }

    getMenu() {
        switch (this.props.menuType) {
            case STORY_TELLER_MENU:
                return MenuRegistry.STORYTELLER_MENU;
            case READER_MENU:
                return MenuRegistry.READER_MENU;
            default:
                return MenuRegistry.EMPTY_MENU;
        }
    }

    menuItem(id, path, icon, description, onclick = null) {
        return (
            <li key={id}>
                <a href={path} onClick={onclick}>
                    {icon}
                    <div className="option-description">{description}</div>
                </a>
            </li>
        );
    }

    render() {
        let menu = this.getMenu();

        return (
            <div id="side-menu" className="side-menu">
                <ul>
                    {this.menuItem(0, "#", IconFactory.getList(), "Hide", this.toggleSideMenu)}
                    {menu.map(i => this.menuItem(i.id, i.path, i.icon, i.description))}
                </ul>
            </div>
        );
    }

    static get READER_MENU() {
        return READER_MENU;
    }

    static get STORY_TELLER_MENU() {
        return STORY_TELLER_MENU;
    }
}

export default SideMenu;