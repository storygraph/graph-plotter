import React from 'react';
import './Changelog.css';

class Changelog extends React.Component {

    getWeenieThumbnail()
    {
        return (
            <svg className="bi bi-person-fill" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
            </svg>
        );
    }
    getRelationThumbnail()
    {
        return (
            <svg className="bi bi-arrows-angle-expand" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M1.5 10.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M6.354 9.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0zm8.5-8.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M10.036 1.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 11-1 0V2h-3.5a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
            </svg>
        );
    }

    changelogToDOM(idx,obj)
    {
        switch (obj.subject.type) {
            case "vertex":
                return ( 
                    <div key={idx} className="changelog-item">
                        <figure className="changelog-thumb">{ this.getWeenieThumbnail() }</figure> 
                        <div className="changelog-desc-wrapp">
                            <h2 className="changelog-subject">{ obj.subject.name } </h2>
                            <p className="changelog-action" >{ obj.action } { obj.subject.name } to the story</p>
                            <p className="changelog-desc" >{ obj.description} </p>
                        </div>
                    </div>
                );
            case "edge":
                return (                    
                    <div key={idx} className="changelog-item">
                        <figure className="changelog-thumb">{ this.getRelationThumbnail() }</figure>
                        <div className="changelog-desc-wrapp">
                            <h2 className="changelog-subject">{ obj.subject.name } </h2>
                            <p className="changelog-action" >{ obj.action } { obj.subject.name } from {obj.subject.edge[0]} to { obj.subject.edge[1] }</p>
                            <p className="changelog-desc" >{ obj.description}</p>
                        </div>
                        
                    </div>
                );
            default:
                return(<p>What is this type</p>);
        }
    }

    render() {
        return (
            <div className="changelog">
                <header  className="changelog-header"><h1>Change Log</h1> <button className="changelog-btn">|||</button></header>          
                { this.props.changelog.map( (ch, idx) => this.changelogToDOM(idx, ch)) } 
            </div>
        );
    }
}

export default Changelog;