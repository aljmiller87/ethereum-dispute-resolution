import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Contract from '../../ethereum/contract';
import { Link } from '../../routes';

const ContractDetail = props => {
    const {
        address,
        currentState,
        currentDisputeState,
        buyer,
        seller,
        balance
    } = props;

    const contractState = ['Awaiting Payment', 'Awaiting Product Sent', 'Awaiting Delivery', 'Complete', 'In Dispute', 'Cancelled']

    const renderCards = () => {

        const items = [
            {
                header: buyer,
                meta: 'Address of Buyer',
                description: 'The manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: seller,
                meta: 'Address of Seller',
                description: 'You must contribute at least this much wei to become an approver.'
            },
            {
                header: contractState[parseInt(currentState)],
                meta: 'Current State',
                description: 'A request tries to withdraw money from the contract. A request must be approved by approvers'
            },
            {
                header: currentDisputeState,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has raised.'
            }

        ];

        return <Card.Group items={items} />
    };

    return (
        <Layout>
            <h3>Contract Details</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}

                    </Grid.Column>
                    {/* <Grid.Column width={6}>
                        <ContributeForm address={props.address} />
                    </Grid.Column> */}
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${address}/requests`}>
                            <a>
                                <Button primary>Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

ContractDetail.getInitialProps = async (props) => {
    console.log('CampaignShow.getInitialProps called');
    const address = props.query.address;
    const contract = Contract(address);
    const summary = await contract.methods.getStatus().call();
    return {
        address,
        currentState: summary[0],
        currentDisputeState: summary[1],
        buyer: summary[2],
        seller: summary[3],
        balance: summary[4]
    }
}

export default ContractDetail;
