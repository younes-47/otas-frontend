/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from 'pages/LoginPage/Loadable';

import Unauthorized from 'pages/Unauthorized/Loadable';
import NotFound from 'pages/NotFound/Loadable';

import SideBar from 'containers/SideBar';
import Header from 'containers/Header';
import MyRequests from 'pages/MyRequests/Loadable';
import OrdreMission from 'pages/OrdreMission/Loadable';
import AvanceCaisse from 'pages/AvanceCaisse/Loadable';
import DepenseCaisse from 'pages/DepenseCaisse/Loadable';
import AvanceVoyage from 'pages/AvanceVoyage/Loadable';
import OrdreMissionForm from 'pages/OrdreMissionForm';
import { DepenseCaisseForm } from 'pages/DepenseCaisseForm';
import AvanceCaisseForm from 'pages/AvanceCaisseForm';
import GlobalStyle from '../../global-styles';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SideBar />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/my-requests" component={MyRequests} />
          <Route
            exact
            path="/my-requests/ordre-mission"
            component={OrdreMission}
          />
          <Route
            exact
            path="/my-requests/avance-voyage"
            component={AvanceVoyage}
          />
          <Route
            exact
            path="/my-requests/avance-caisse"
            component={AvanceCaisse}
          />
          <Route
            exact
            path="/my-requests/depense-caisse"
            component={DepenseCaisse}
          />
          <Route
            exact
            path="/my-requests/ordre-mission/add"
            component={OrdreMissionForm}
          />
          <Route
            exact
            path="/my-requests/depense-caisse/add"
            component={DepenseCaisseForm}
          />
          <Route
            exact
            path="/my-requests/avance-caisse/add"
            component={AvanceCaisseForm}
          />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <Route exact path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
}
