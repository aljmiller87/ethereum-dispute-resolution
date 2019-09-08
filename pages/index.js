import React from 'react'
import { Button, Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';
// import Layout from '../components/Layout';
import { Link } from '../routes';


const CampaignIndex = (props) => {
    console.log('props', props);

    // const renderCampaigns = () => {
    //     const items = props.campaigns.map(address => {
    //         return {
    //             header: address,
    //             description: (
    //                 <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>
    //             ),
    //             fluid: true
    //         }
    //     })

    //     return <Card.Group items={items} />
    // }
    return (
        // <Layout>
        <div>
            <h1>Open Campaigns</h1>
            <Link route="/campaigns/new">
                <a>
                    <Button
                        content="Create Campaign"
                        icon="add circle"
                        primary
                        floated="right"
                    />
                </a>
            </Link>

            {/* {renderCampaigns()} */}
            <p>test</p>
        </div>
        // </Layout>

    )
}

CampaignIndex.getInitialProps = async () => {
    const contracts = await factory.methods.getdeployedContracts().call();
    return { contracts }
}

export default CampaignIndex;