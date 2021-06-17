import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Route } from 'react-router'

import JobAdvertList from '../pages/JobAdvertList'
import JobAdvertCreate from '../pages/JobAdvertCreate'

export default function Dashboard() {
    return (
        <div>
            <Grid style = {{backgroundColor:`rgba(1, 1, 100, 0.5)`}}> 
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Route exact path="/" component={JobAdvertList} />
                        <Route exact path="/jobAdvertCreate" component={JobAdvertCreate} /> 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
