const STORIES = {
    "stories": [
        {
            "id": 1,
            "title": "Baron Hedgehog",
            "lastEdited": "05-05-2020",
            "currentEvent": "The battle of Noxville",
        },
        {
            "id": 2,
            "title": "Giggles",
            "lastEdited": "02-05-2020",
            "currentEvent": "The poisonous apple",
        },
        {
            "id": 3,
            "title": "Wreckage",
            "lastEdited": "02-04-2020",
            "currentEvent": "The good sailor",
        },
        {
            "id": 4,
            "title": "Friends in arms",
            "lastEdited": "01-04-2020",
            "currentEvent": "Dead Freddy",
        },
        {
            "id": 5,
            "title": "Neverspring",
            "lastEdited": "02-03-2020",
            "currentEvent": "A fool's paradise",
        },
    ],
};

class StoriesMock {
    static get STORIES() {
        return STORIES;
    }
}

export default StoriesMock;