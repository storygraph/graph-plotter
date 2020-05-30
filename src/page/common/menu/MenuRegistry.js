import IconFactory from '../IconFactory';

const STORYTELLER_MENU = [
    {
        "id": 1,
        "icon": IconFactory.getBook(),
        "description": "Stories",
        "path": "stories",
    },
    {
        "id": 2,
        "icon": IconFactory.getGear(),
        "description": "Settings",
        "path": "settings",
    },
    {
        "id": 3,
        "icon": IconFactory.getLifebelt(),
        "description": "Support",
        "path": "support",
    }
];

const READER_MENU = [
    {
        "id": 1,
        "icon": IconFactory.getHouse(),
        "description": "Home",
        "path": "landing",
    },
    {
        "id": 2,
        "icon": IconFactory.getController(),
        "description": "Playground",
        "path": "graphEditor",
    },
    {
        "id": 3,
        "icon": IconFactory.getLogin(),
        "description": "Login",
        "path": "login",
    },
    {
        "id": 4,
        "icon": IconFactory.getRegister(),
        "description": "Register",
        "path": "register",
    },
    {
        "id": 5,
        "icon": IconFactory.getLifebelt(),
        "description": "Support",
        "path": "support",
    }
];

const EMPTY_MENU = [];

class StoryTellerMenu {
    static get STORYTELLER_MENU() {
        return STORYTELLER_MENU;
    }

    static get EMPTY_MENU() {
        return EMPTY_MENU;
    }

    static get READER_MENU() {
        return READER_MENU;
    }
}

export default StoryTellerMenu;