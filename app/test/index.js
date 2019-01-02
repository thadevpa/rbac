'use strict';
const AccessControl = require('accesscontrol');


module.exports.handler = (event, context, cb) => {

    const params = {
        user_id: 1,
        resource: "product",    //table_name
        action: "read"        //read , create , update, delete
    };
    
    var user_role="";
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'mysql-sg.cubsy5aifria.ap-southeast-1.rds.amazonaws.com',
        user: 'rpm',
        password: 'rpm2018!',
        database: 'approle'
    });

    connection.connect();

    const ac = new AccessControl();
    const sql = 'select * from role_permissions where user_id=' + params.user_id;
    connection.query(sql, function (error, results, fields) {
        if (error) cb(`Error: ${JSON.stringify(error)}`);
        //cb(null,`The solution is: ${results[0].role}`);

        if(results.length > 0){

            user_role = results[0].role;

            for(var i = 0; i < results.length; i++) {  
                if(results[i].action =='read'){
                    ac.grant(results[i].role).readAny(results[i].resource);   
                }
                if(results[i].action =='create'){
                    ac.grant(results[i].role).createAny(results[i].resource);   
                }
                if(results[i].action =='update'){
                    ac.grant(results[i].role).updateAny(results[i].resource);   
                }
                if(results[i].action =='delete'){
                    ac.grant(results[i].role).deleteAny(results[i].resource);   
                }
            }
        }


        const readPermission = ac.can(user_role).readAny(params.resource);
        if(readPermission.granted){
            cb(null, "has permission "+ params.action);
        }
        else{
            cb(null, "no permission "+ params.action)
        }

        const createPermission = ac.can(user_role).createAny(params.resource);
        if(createPermission.granted){
            cb(null, "has permission "+ params.action);
        }
        else{
            cb(null, "no permission "+ params.action)
        }

        const updatePermission = ac.can(user_role).updateAny(params.resource);
        if(updatePermission.granted){
            cb(null, "has permission "+ params.action);
        }
        else{
            cb(null, "no permission "+ params.action)
        }

        const deletePermission = ac.can(user_role).deleteAny(params.resource);
        if(deletePermission.granted){
            cb(null, "has permission "+ params.action);
        }
        else{
            cb(null, "no permission "+ params.action)
        }
    });  
    connection.end();
};

