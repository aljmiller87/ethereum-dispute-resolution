import React from 'react';
import { Step } from 'semantic-ui-react'

const Steps = (props) => {
    let currentState = parseInt(props.currentState);
    const contractSteps = ['Awaiting Payment', 'Awaiting Product Sent', 'Awaiting Delivery', 'Complete', 'In Dispute', 'Cancelled'];
    let nonDisputeSteps = [...contractSteps].slice(0, 4);

    const renderSteps = () => {
        let steps = nonDisputeSteps.map((step, index) => {
            return {
                key: nonDisputeSteps[index],
                title: nonDisputeSteps[index],
                active: index === currentState,
            }
        });

        return <Step.Group items={steps} />
    }

    return (
        <div>
            {renderSteps()}
        </div>
    )
}

export default Steps
