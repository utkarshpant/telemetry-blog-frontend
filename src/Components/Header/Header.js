import axios from 'axios';
import React, { useState, useEffect, useContext, Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './header.css';
import Axios from 'axios';
import { AuthConsumer, AuthContextType, AuthProvider } from '../../authcontext';
import IdleTimer from 'react-idle-timer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import UserCard from '../../Components/UserCard/UserCard';
import StoryCard from './../StoryCard/StoryCard';
import SearchStoryCard from './../SearchStoryCard/SearchStoryCard';
import Collapse from 'react-bootstrap/Collapse';

class Header extends Component {
    static contextType = AuthContextType;
    constructor(props) {
        super(props);
        const currentDate = new Date();
        const hourOfDay = currentDate.getHours();
        const timeOfDay = "";
        if (hourOfDay >= 0 && hourOfDay < 12) {
            this.timeOfDay = "morning";
        } else if (hourOfDay >= 12 && hourOfDay <= 16) {
            this.timeOfDay = "afternoon";
        } else if (hourOfDay > 16 && hourOfDay <= 23) {
            this.timeOfDay = "evening";
        }

        let cancelToken = undefined;
    };

    state = {
        user: null,
        searchOpen: false,
        query: null,
        results: null,
        loadingResults: false
    }

    fireSearch = (query) => {
        this.setState({ loadingResults: true });
        if (typeof this.cancelToken != typeof undefined) {
            // cancel token exists;
            this.cancelToken.cancel('Request cancelled due to new search request');
            console.log("Cancel occured");
        }

        // new token;
        this.cancelToken = axios.CancelToken.source();
        // console.log(process.env.REACT_APP_API_URL);
        axios.get(`${process.env.REACT_APP_API_URL}/api/search?querystring=${query}`, {
            cancelToken: this.cancelToken.token
        })
            .then(response => {
                this.setState({ results: response.data.data, loadingResults: false });
                // alert(JSON.stringify(response.data.data));
            })
            .catch(err => {
                console.log(err);
                // alert(JSON.stringify(err.response));
            })
    }

    render(props) {
        return (
            <AuthConsumer>
                {
                    (value) => (
                        <React.Fragment>
                            <Row className="Header">
                                <Col lg={2} md={12} id="headerWordmark" className="text-left text-lg-left text-md-left text-sm-left text-xs-center">
                                    <span><a href="/"><img src="/images/Wordmark.svg"></img></a></span>
                                </Col>
                                <Col lg={6} md={12} id="headerSearch" className="text-center text-lg-center d-inline d-lg-inline d-md-inline d-sm-inline">
                                    <input
                                        type="text"
                                        className="SearchBar"
                                        placeholder="Search by authors or story titles/subtitles."
                                        value={this.state.query}
                                        onClick={(event) => {
                                            this.setState({ searchOpen: true });
                                        }}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            this.setState({ query: event.target.value });
                                            if (event.target.value == "") {
                                                this.setState({ query: event.target.value, results: null });
                                            }

                                            this.fireSearch(event.target.value);
                                            // console.log(this.state.query);
                                        }}
                                    />
                                </Col>
                                <Col lg={2} md={12} id="headerGreeting" className="text-right text-md-right text-sm-left d-inline d-lg-inline d-md-inline d-sm-inline">
                                    {`Good ${this.timeOfDay}${value.authenticated ? ', ' + value.user.firstName : ""}!`}
                                </Col>
                                <Col lg={2} sm={12} className="text-right text-md-right text-sm-right">
                                    {
                                        this.context.authenticated
                                            ? <button className="Logout" onClick={() => {
                                                this.context.logout();
                                            }}>
                                                Sign out.
                                            </button>
                                            : <a className="Logout" href='/signin'>
                                                Sign in.
                                            </a>
                                    }
                                </Col>
                            </Row>
                            <Collapse in={this.state.searchOpen}>
                                <div>
                                    <Row className={`SearchResultsContainer`} >
                                        <Container fluid>
                                            <Row className="SearchResultsHeader">
                                                <Col lg={6} md={6} sm={10} xs={10} className="SearchHeaderText">
                                                    <span>Search</span>
                                                </Col>
                                                <Col lg={6} md={6} sm={2} xs={2} className="SearchHeaderClose text-right text-md-right" onClick={() => {
                                                    this.setState({
                                                        searchOpen: false
                                                    });
                                                }}>
                                                    <span>&times;</span>
                                                </Col>
                                            </Row>
                                            <Row className="SearchResults">
                                                <span className="AuthorColumnHeader">Authors</span>
                                                <Col md={12} className="AuthorResults">
                                                    <SkeletonTheme color="#6a6a6a20" highlightColor="##7a7a7a80">
                                                        {
                                                            this.state.results
                                                                ? this.state.results[0].map((author) => (
                                                                    <a href={`/${author.username}`}>
                                                                        <UserCard user={author} size="small" />
                                                                    </a>
                                                                ))
                                                                : <Skeleton count={1} height={125} width={200} />
                                                        }
                                                    </SkeletonTheme>
                                                </Col>
                                                <span className="StoryColumnHeader">Stories</span>
                                                <Col md={12} className="StoryResults">
                                                    <SkeletonTheme color="#6a6a6a20" highlightColor="##7a7a7a80">
                                                        {
                                                            this.state.results
                                                                ? this.state.results[1].map((story) => (
                                                                    <a href={`/story/${story._id}`}>
                                                                        <SearchStoryCard story={story} key={story._id} />
                                                                    </a>
                                                                ))
                                                                : <Skeleton count={1} height={200} width={250} />
                                                        }
                                                    </SkeletonTheme>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Row>
                                </div>
                            </Collapse>
                        </React.Fragment>
                    )
                }
            </AuthConsumer>
        )
    }
}

export default Header;