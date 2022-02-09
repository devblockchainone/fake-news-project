import './Content.css'
import React from 'react'
import { Switch, Route, BrowserRouter as Router  } from 'react-router-dom'


import LandingBuilding from '../../views/LandingBuilding'

const Content = props => (
    <main>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LandingBuilding />
                    </Route>
                </Switch>
            </Router>
    </main>
)

export default Content