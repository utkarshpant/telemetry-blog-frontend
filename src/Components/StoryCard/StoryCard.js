import React, { useContext } from "react";
import Can from "../Can/Can";
import { AuthContextType } from './../../authcontext';
import './storycard.css';
import axios from 'axios';
import { Container, Row, Col, } from "react-bootstrap";
import { Link } from 'react-router-dom';
import _ from 'lodash';


const Storycard = (props) => {

    const authContext = useContext(AuthContextType);

    const onPublishUnpublishHandler = (storyToUpdate) => {
        
        axios.get(`https://telemetry-blog.herokuapp.com/api/story/${storyToUpdate.isPublished ? "unpublish" : "publish"}/${storyToUpdate._id}`)
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                
            })
        // TODO: Set up the unpublish POST request here
        // using axios;
    }

    const onDeleteHandler = (deletedStoryId) => {
        
        axios.delete(`https://telemetry-blog.herokuapp.com/api/story/delete/${deletedStoryId}`)
            .then(response => {
                props.handleDeletion(deletedStoryId);
            })
            .catch(err => {
                
            })
        // TODO: Set up the DELETE request here
        // using axios;
    }

    return (
        <div className="StoryCard">
            <div className="StoryDetails">
                <a href={`/story/${props.story._id}`} className="StoryCardLink">

                    <div className="StoryCardTitle">
                        <span>{props.story.content.title}</span>
                    </div>
                    <div className="StoryCardSubtitle">
                        <span >{props.story.content.subtitle.substring(0, 30) + '...'}</span>
                    </div>
                </a>
            </div>
            <Can
                role={authContext.role}
                perform="posts:edit"
                data={{ username: authContext.user ? authContext.user.username : null, postOwner: props.story.owner }}
                yes={() => (
                    <div className="StoryEditControlsContainer">
                        <div className="text-left">
                            <a href={`story/edit/${props.story._id}`} id="editStoryLink" className="StoryOptions">Edit</a>
                        </div>
                        <div className="text-md-left text-sm-left">
                            <span
                                id="unpublishStoryLink"
                                className="StoryOptions"
                                onClick={(event) => {
                                    onPublishUnpublishHandler(props.story);
                                }}
                            >
                                {props.story.isPublished ? "Unpublish" : "Publish"}
                            </span>
                        </div>
                        <div className="text-md-left text-sm-left">
                            <span
                                id="deleteStoryLink"
                                className="StoryOptions"
                                onClick={(event) => {
                                    onDeleteHandler(props.story._id);
                                }}>
                                Delete
                            </span>
                        </div>
                        {
                            
                        }
                    </div>
                )}
                no={() => {
                    return null;
                }}
            />
        </div>
    )
};

export default Storycard;