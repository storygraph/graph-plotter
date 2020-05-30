import React from 'react';
import './StoriesPage.css';
import SideMenu from '../common/menu/SideMenu';
import StoriesMock from '../common/mock/StoriesMock';
import IconFactory from '../common/IconFactory';

class StoriesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getStories() {
        // should be fetched from a backing service
        return StoriesMock.STORIES;
    }

    storyBox(story) {
        return (
            <div className="col-md-3 story-box-wrapper align-top">
                <div className="story-box">
                    <h1>{story.title}</h1>
                    <p>Current event - {story.currentEvent}</p>
                    <p>Last edited - {story.lastEdited}</p>
                    <a href="/graphEditor" className="btn">{IconFactory.getEdit()} Continue</a>
                </div>
            </div>
        );
    }

    render() {
        let stories = this.getStories();

        return (
            <div className="page-wrapper">
                <SideMenu menuType={SideMenu.STORY_TELLER_MENU} />
                <div className="page-content">
                    <h1>{IconFactory.getBook()} Stories</h1><hr />
                    <div className="stories-section">
                        <div className="col-md-3 story-box-wrapper align-top">
                            <div className="story-box new-story-box">
                                {IconFactory.getPlus()}
                            </div>
                        </div>
                        {stories.stories.map(i => this.storyBox(i))}
                    </div>
                </div>
            </div>
        );
    }
}

export default StoriesPage;