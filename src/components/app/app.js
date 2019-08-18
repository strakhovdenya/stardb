import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import {SwapiServiceProvider} from "../swapi-service-context";
import ErrorIndicator from "../error-indicator"
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundary from "../error-boundary";
import {LoginPage, SecretPage, PeoplePage, PlanetPage, StarshipPage} from "../pages/";

import './app.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {StarshipDetails} from "../sw-components";


export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            return {
                swapiService: new service()
            }
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>

                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to Star DB</h2>}
                                       exact/>
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets/" component={PlanetPage}/>
                                <Route path="/starships/" exact component={StarshipPage}/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           return <StarshipDetails itemId={id}/>
                                       }}/>
                                <Route path="/login"
                                       render={() => (
                                           <LoginPage
                                               isLoggedIn={this.state.isLoggedIn}
                                               onLogin={this.onLogin}
                                           />
                                       )}
                                />
                                <Route path="/secret"
                                       render={() => (
                                           <SecretPage
                                               isLoggedIn={this.state.isLoggedIn}
                                           />
                                       )}
                                />
                                <Route render={() => (<div className="jumbotron text-center"><h2>Page not found</h2></div>)}/>
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}