function dayDifference(startDate, endDate){

    var date1 = startDate;
    var date2 = endDate;
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days
}

async function findMissingDates(startDate, endDate, data, callback){

    var begin = startDate;
    const end = endDate;
    const datesToRequest = [];

    if(data !== undefined){
        data.sort((a,b) => {
            return new Date(a.startDate) - new Date(b.startDate);
        });

        for(var i = 0; i < data.length; i++){
            var currDate = new Date(data[i].startDate.substring(0,10));
            if(begin >= currDate) {
                // do nothing
            } else {    
                datesToRequest.push({startDate: begin.toISOString().substring(0,10), endDate: currDate.toISOString().substring(0,10)});
            } 
            begin = new Date(currDate.setDate(currDate.getDate() + 1));
        }
    }

    if(begin <= end){
        datesToRequest.push({startDate: begin.toISOString().substring(0,10), endDate: end.toISOString().substring(0,10)});
    }
    callback(datesToRequest);
}

module.exports = {dayDifference, findMissingDates};