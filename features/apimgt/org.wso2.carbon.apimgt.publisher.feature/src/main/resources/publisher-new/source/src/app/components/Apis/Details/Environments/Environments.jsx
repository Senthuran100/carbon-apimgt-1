/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useContext, useState } from 'react';
import { APIContext } from 'AppComponents/Apis/Details/components/ApiContext';
import 'react-tagsinput/react-tagsinput.css';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from 'AppComponents/Shared/Alert';
import Paper from '@material-ui/core/Paper';

/**
 * Renders an Environments list
 * @class Environments
 * @extends {React.Component}
 */
export default function Environments() {
    const { api, updateAPI } = useContext(APIContext);

    const [gatewayEnvironments, setGatewayEnvironments] = useState([...api.gatewayEnvironments]);

    /**
     *
     * Handle the Environments save button action
     */
    function addEnvironments() {
        updateAPI({ gatewayEnvironments }).then(() => Alert.info('API Update Successfully'));
    }

    // TODO: Get environments from setting API
    const environments =
        {
            environment: [
                {
                    name: 'Production and Sandbox',
                    type: 'hybrid',
                    serverUrl: 'https://localhost:9443/services/',
                    showInApiConsole: true,
                    endpoints: {
                        http: 'http://localhost:8280',
                        https: 'https://localhost:8243',
                    },
                },
            ],
        };

    return (
        <div>
            <Typography variant='h4' align='left' >
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.APIGateways'
                    defaultMessage='API Gateways'
                />
            </Typography>

            <Paper>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>Type</TableCell>
                            <TableCell align='right'>ServerURL</TableCell>
                            <TableCell align='right'>Http</TableCell>
                            <TableCell align='right'>Https</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {environments.environment.map(row => (
                            <TableRow key={row.name}>
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        checked={gatewayEnvironments.includes(row.name)}
                                        onChange={
                                            (event) => {
                                                const { checked, name } = event.target;
                                                if (checked) {
                                                    setGatewayEnvironments([...gatewayEnvironments, name]);
                                                } else {
                                                    setGatewayEnvironments(gatewayEnvironments.filter(env =>
                                                        env !== name));
                                                }
                                            }
                                        }
                                        name={row.name}
                                    />
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell align='right'>{row.type}</TableCell>
                                <TableCell align='right'>{row.serverUrl}</TableCell>
                                <TableCell align='right'>{row.endpoints.http}</TableCell>
                                <TableCell align='right'>{row.endpoints.https}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Grid
                container
                direction='row'
                alignItems='flex-start'
                spacing={4}
            >
                <Grid item>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={addEnvironments}
                    >
                        <FormattedMessage
                            id='Apis.Details.Environments.Environments.save'
                            defaultMessage='Save'
                        />
                    </Button>
                </Grid>
                <Grid item>
                    <Link to={'/apis/' + api.id + '/overview'}>
                        <Button>
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}