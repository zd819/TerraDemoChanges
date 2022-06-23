function dayDifference(startDate, endDate){

    var date1 = startDate;
    var date2 = endDate;
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
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
            const currDate = new Date(data[i].startDate);   
            if(begin < currDate){
    
                datesToRequest.push({startDate: begin.toISOString().substring(0,10), endDate: currDate.toISOString().substring(0,10)});
                begin = currDate + 1;
            }else {
                begin = begin + 1;
            }
        }
    }


    if(begin <= end){
        datesToRequest.push({startDate: begin.toISOString().substring(0,10), endDate: end.toISOString().substring(0,10)});
    }

    callback(datesToRequest);

}

module.exports = {dayDifference, findMissingDates};