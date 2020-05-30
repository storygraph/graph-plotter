const TIMELINE = {
    "timeline": "dadsadas",
    "events":
        [
            {
                "id": 0,
                "name": "Frodo meets Gandalf",
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Gandalf"
                            },
                            "action": "add",
                            "description": "A wise magician."
                        },
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Frodo"
                            },
                            "action": "add",
                            "description": "Fat little hobbit. Son of Bilbo."
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Frodo and Gandalf become allies"
                            },
                            "action": "add",
                            "description": "Gandalf and Frodo are allies.",
                        }
                    ]
            },
            {
                "id": 1,
                "name": "Sam, Pippin and Merry join the company",
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Sam"
                            },
                            "action": "add",
                            "description": "Frodo's personal hobbit gardener."
                        },
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Merry"
                            },
                            "action": "add",
                            "description": "A hobbit that is a friend of Frodo's."
                        },
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Pippin"
                            },
                            "action": "add",
                            "description": "A hobbit that is a friend of Frodo's."
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [2, 1],
                                "name": "Sam meets Gandalf"
                            },
                            "action": "add",
                            "description": "Sam and Gandalf are allies."
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [3, 2],
                                "name": "Merry meets Gandalf"
                            },
                            "action": "add",
                            "description": "Merry and Gandalf are allies."
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 2],
                                "name": "Pippin meets Gandalf"
                            },
                            "action": "add",
                            "description": "Pippin and Gandalf are allies."
                        }
                    ]
            }, {
                "id": 2,
                "name": "Gandalf departs",
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Gandalf"
                            },
                            "action": "edit",
                            "description": "Gandalf is in blackwoods.",
                        },
                    ]
            },
            {
                "id": 3,
                "name": "Hobbits set of to Tom Bombadil's cottage",
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Frodo"
                            },
                            "action": "edit",
                            "description": "Frodo is at Tom Bombadil's cottage."
                        },
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Sam"
                            },
                            "action": "edit",
                            "description": "Sam is at Tom Bombadil's cottage."
                        },
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Merry"
                            },
                            "action": "edit",
                            "description": "Merry is at Tom Bombadil's cottage."
                        },
                        {
                            "subject": {
                                "type": "vertex",
                                "name": "Pippin"
                            },
                            "action": "edit",
                            "description": "Pippin is at Tom Bombadil's cottage."
                        },
                    ]
            }
        ]
};

class TimelineMock {
    static get TIMELINE() {
        return TIMELINE;
    }
}

export default TimelineMock;