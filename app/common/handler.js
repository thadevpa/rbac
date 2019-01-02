/**
 * @class handler
 * @param success
 * @param error
 */

module.exports.izara = {
    succeed: (message) => {
        console.log("Success: ", JSON.stringify(message));
    },
    fail: (message) => {
        console.log("Fail: ", JSON.stringify(message));
    }
};