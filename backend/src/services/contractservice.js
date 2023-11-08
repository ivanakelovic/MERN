const generateContract = async (evaluationResults) => {
    const contract = {
        evaluationResults: evaluationResults,
  
    };
    return contract;
};
module.exports = {
    generateContract,
};