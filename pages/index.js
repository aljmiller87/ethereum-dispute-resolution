import React, { useState, useEffect } from 'react'
import { Button, Card, List } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout';
import { Link } from '../routes';


const CampaignIndex = ({ coinbase, contracts }) => {
    const [Coinbase, setCoinbase] = useState(coinbase);
    const [Contracts, setContracts] = useState(contracts);
    console.log(coinbase, Coinbase);

    useEffect(() => {
        console.log('useEffect');
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', async (accounts) => {
                const [coinbase] = await web3.eth.getAccounts();
                const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
                setCoinbase(coinbase);
                setContracts(contracts);
            })

            window.ethereum.on('networkChanged', async (netId) => {
                const [coinbase] = await web3.eth.getAccounts();
                const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
                setCoinbase(coinbase);
                setContracts(contracts);
            })
        }
    }, []);

    const renderContracts = () => {
        let items = contracts.map(address => {
            return {
                header: address,
                content: (
                    <Link route={`/contracts/${address}`}><a>View Campaign</a></Link>
                )
            }
        })

        items = [...items, ...items]

        return (
            <List
                animated={true}
                divided={true}
                items={items}
            />
        )
    }

    return (
        <Layout>
            <div>
                <h1>{coinbase}</h1>
                <Link route="/campaigns/new">
                    <a>
                        <Button
                            content="Create Campaign"
                            icon="add circle"
                            primary
                        />
                    </a>
                </Link>

                {renderContracts()}
                <p>test</p>
            </div>
        </Layout>

    )
}

CampaignIndex.getInitialProps = async () => {
    const [coinbase] = await web3.eth.getAccounts();
    const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
    console.log(coinbase);
    return { coinbase, contracts }
}

export default CampaignIndex;