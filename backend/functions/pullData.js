
async function pullData(vars, callback) {

    const startDate = vars.startDate.toISOString();
    const endDate = vars.endDate.toISOString();
    const terraId = vars.terraId;
    const type = vars.type

    wearableDB.aggregate( [ { $match : { $and: [ 
                        { "terraId" : terraId },
                        { "startDate" : { $gte : startDate }},
                        { "startDate" : { $lte : endDate }},
                        { "type" : type} 
                        ]}}]).
                        toArray( (err,res) => {
        if(err){
            throw err;
        }
        callback(res);
    });
}

module.exports = {pullData}