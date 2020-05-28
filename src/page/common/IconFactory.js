import React from 'react';

class IconFactory {
    static getWeenieThumbnail() {
        return (
            <svg className="bi bi-person-fill" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
        );
    }

    static getRelationThumbnail() {
        return (
            <svg className="bi bi-arrows-angle-expand" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M1.5 10.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.354 9.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0zm8.5-8.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10.036 1.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 11-1 0V2h-3.5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
            </svg>
        );
    }

    static getClockThumbnail() {
        return (
            <svg className="timeline-clock bi bi-clock" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clipRule="evenodd" />
            </svg>
        );
    }

    static getController() {
        return (
            <svg className="bi bi-controller" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 0 1-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" />
                <path d="M11.5 6.026a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-7-2.5h1v3h-1v-3z" />
                <path d="M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .258.966l-1.932.518a.5.5 0 0 1-.612-.354zm9.976 0a.5.5 0 0 0-.353-.613l-1.932-.518a.5.5 0 1 0-.259.966l1.932.518a.5.5 0 0 0 .612-.354z" />
            </svg>
        );
    }

    static getLogin() {
        return (
            <svg class="bi bi-box-arrow-in-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8.146 11.354a.5.5 0 0 1 0-.708L10.793 8 8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 1 8z" />
                <path fill-rule="evenodd" d="M13.5 14.5A1.5 1.5 0 0 0 15 13V3a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 4 3v1.5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 5 13v-1.5a.5.5 0 0 0-1 0V13a1.5 1.5 0 0 0 1.5 1.5h8z" />
            </svg>
        );
    }

    static getPlayStack() {
        return (
            <svg class="bi bi-collection-play" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
                <path fill-rule="evenodd" d="M6.258 6.563a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
            </svg>
        );
    }
}

export default IconFactory;