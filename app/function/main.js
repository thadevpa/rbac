'use strict';

const Database = require("../common/database");
const handler = require("../common/handler");

const fs = require('fs');
const AWS = require('aws-sdk'); 
const lambda = new AWS.Lambda({  
    region: process.env.region
});

module.exports.handler = async  (event, ct, cb) => {
   
    if(!event.level){
        cb("not found level");
    }

    var result = await checkRole(event);

    if(result.length > 0){
        cb(null, (`has permission ${event.permission}`));
    }
    else{
        cb(null, (`no permission ${event.permission}`));
    }
};


var checkRole = async function(event){
    let database = null;

    try {

        database = new Database(event.db);
        await database.connect();       

        let sql = `select * from role_permissions where user_id=${event.user_id} and permission='${event.permission}'`;
        let response  = await database.query(sql);

        await database.disconnect();
        return response;
    } 
    catch (error) {
        if (database) {
            await database.disconnect();
        }
        return error;
    }
}
