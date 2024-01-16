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
import MinimalAccess from 'pages/MinimalAccess/Loadable';
import Liquidation from 'pages/Liquidation/Loadable';
import DecideOnRequests from 'pages/DecideOnRequests/Loadable';
import DecideOnOrdreMission from 'pages/DecideOnOrdreMission/Loadable';
import DecideOnAvanceVoyage from 'pages/DecideOnAvanceVoyage/Loadable';
import DecideOnAvanceCaisse from 'pages/DecideOnAvanceCaisse/Loadable';
import DecideOnDepenseCaisse from 'pages/DecideOnDepenseCaisse/Loadable';
import DecideOnLiquidation from 'pages/DecideOnLiquidation/Loadable';
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
            path="/my-requests/liquidation"
            component={Liquidation}
          />
          <Route
            exact
            path="/decide-on-requests"
            component={DecideOnRequests}
          />
          <Route
            exact
            path="/decide-on-requests/decide-on-ordre-mission"
            component={DecideOnOrdreMission}
          />
          <Route
            exact
            path="/decide-on-requests/decide-on-avance-voyage"
            component={DecideOnAvanceVoyage}
          />
          <Route
            exact
            path="/decide-on-requests/decide-on-avance-caisse"
            component={DecideOnAvanceCaisse}
          />
          <Route
            exact
            path="/decide-on-requests/decide-on-depense-caisse"
            component={DecideOnDepenseCaisse}
          />
          <Route
            exact
            path="/decide-on-requests/decide-on-liquidation"
            component={DecideOnLiquidation}
          />
          <Route exact path="/unauthorized" component={Unauthorized} />

          <Route exact path="/access-denied" component={MinimalAccess} />
          {/* <Route component={MinimalAccess} /> */}
          <Route exact path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
}
