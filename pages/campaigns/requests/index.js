import React from 'react';
import { Button, Table, Label } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';
import web3 from '../../../ethereum/web3';

const RequestIndex = ({ address, requests, requestCount, approversCount}) => {
    const renderRow = () => {
        return requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
            />
        });
    }
    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary floated="right" style={{marginBottom: 10}}>
                        Add request
                    </Button>
                </a>
            </Link>
            <h3>Pending Requests</h3>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Approve Count</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {renderRow()}
                </Table.Body>
            </Table>
            <p>Found {requestCount} requests!</p>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (props) => {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call()
    const requests = await Promise.all(
        Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
            return campaign.methods.requests(index).call()
        })
    )

    return { address, requests, requestCount, approversCount };
}

export default RequestIndex;
