const sendNotification = async (successfulBidders, contract) => {
    successfulBidders.forEach(async (bidder) => {
        
     await notificationService.sendEmail(bidder.email, 'Contract Awarded', `Congratulations! You have been awarded the contract. Here are the details:\n${JSON.stringify
        (contract)}`);
    });
  };
  
  module.exports = {
    sendNotification,
  };
  