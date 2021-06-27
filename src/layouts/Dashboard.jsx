import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Route } from 'react-router'

import JobAdvertList from '../pages/JobAdvertList'
import JobAdvertCreate from '../pages/JobAdvertCreate'
import JobAdvertDetail from '../pages/JobAdvertDetail'
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position="bottom-right"/>
            <Grid style = {{backgroundColor:`rgba(1, 1, 100, 0.5)`}}> 
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Route exact path="/" component={JobAdvertList} />
                        <Route exact path="/jobAdvertCreate" component={JobAdvertCreate} /> 
                        <Route exact path="/jobAdvert/:id" component={JobAdvertDetail} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
