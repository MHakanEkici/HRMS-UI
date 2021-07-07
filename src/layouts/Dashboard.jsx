import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { Route } from 'react-router'
import { ToastContainer } from "react-toastify";
import JobAdvertList from '../pages/JobAdvertList'
import JobAdvertCreate from '../pages/JobAdvertCreate'
import JobAdvertDetail from '../pages/JobAdvertDetail'
import Login from '../pages/Login'
import RegisterCandidate from '../pages/RegisterCandidate';
import RegisterEmployer from '../pages/RegisterEmployer';
import CandidateProfile from '../pages/CandidateProfile';
import CreateCandidateProfile from '../pages/CreateCandidateProfile';

export default function Dashboard() {

    // const [isLoginPageOpen, setLoginPageOpen] = useState(false)

    // function handleLoginPageOpen() {
    //     setLoginPageOpen(!isLoginPageOpen)
    // }

    return (
        <div>
            <ToastContainer position="bottom-right"/>
            <Grid
            //  style = {{backgroundColor: "#66FCF1"}}
            > 
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Route exact path="/" component={JobAdvertList} />
                        <Route exact path="/login" component={Login} />                       
                        <Route exact path="/register/candidate" component={RegisterCandidate} />
                        <Route exact path="/register/employer" component={RegisterEmployer} />                        
                        <Route exact path="/jobAdvertCreate" component={JobAdvertCreate} /> 
                        <Route exact path="/jobAdvert/:id" component={JobAdvertDetail} />
                        <Route exact path="/candidateProfile/:id" component={CandidateProfile} />
                        <Route exact path="/candidateProfileCreate" component={CreateCandidateProfile} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
