const TIMELINE = {
    "timeline": "dadsadas",
    "events":
        [
            {
                "vertices": [[]],
                "edges": [[]],
                "id": 0,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 2",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 1,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 2",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 2,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 2",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 3,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 2",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 4,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 00100",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 5,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding ",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description ",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 6,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding round Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 314",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 7,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding evil Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 3c3 ",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 8,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding more Ivan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 11",
                        }
                    ]
            }, {
                "vertices": [[]],
                "edges": [[]],
                "id": 9,
                "changelog":
                    [
                        {
                            "subject": {
                                "type": "vertex",
                                "idx": 1, // idx
                                "name": "Ivan"
                            },
                            "action": "add",
                            "description": "Adding anotherIvan",
                        },
                        {
                            "subject": {
                                "type": "edge",
                                "edge": [0, 1], // from, to
                                "name": "Friendship"
                            },
                            "action": "add",
                            "description": "description 12",
                        }
                    ]
            },
        ]
};

class TimelineMock {
    static get TIMELINE() {
        return TIMELINE;
    }
}

export default TimelineMock;