import React, { useRef, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { Route } from 'react-router'
import { Redirect, Switch } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import JobAdvertList from '../pages/JobAdvertList'
import JobAdvertCreate from '../pages/JobAdvertCreate'
import JobAdvertDetail from '../pages/JobAdvertDetail'
import Login from '../pages/Login'
import RegisterCandidate from '../pages/RegisterCandidate';
import RegisterEmployer from '../pages/RegisterEmployer';
import CandidateProfile from '../pages/CandidateProfile';
import CreateCandidateProfile from '../pages/CreateCandidateProfile';
import FavouriteJobAdvert from '../pages/FavouriteJobAdvert';

export default function Dashboard({setCv, sendCurrentCv}) {   

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <Switch>
                <Route exact path="/" component={JobAdvertList} />
                <Route exact path="/login" component={() => <Login />} />
                <Route exact path="/register/candidate" component={RegisterCandidate} />
                <Route exact path="/register/employer" component={RegisterEmployer} />
                <Route exact path="/jobAdvertCreate" component={JobAdvertCreate} />
                <Route exact path="/jobAdvert/:id" component={JobAdvertDetail} />
                <Route exact path="/candidateProfile/:id" component={() => <CandidateProfile setCv={(cv) => setCv(cv)} />} /> 
                <Route exact path="/candidateProfileCreate" component={() => <CreateCandidateProfile currentCv={sendCurrentCv}/> }/> 
                <Route exact path="/favouriteJobAdvert/:id" component={FavouriteJobAdvert} />
                <Redirect from="/*" to="/" />
            </Switch>
        </div>
    )
}
