import web3 from './web3';
import ThreeJudge from './build/ThreeJudge.json';


export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(ThreeJudge.interface),
        address
    );
};

