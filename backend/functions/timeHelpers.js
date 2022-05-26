function dayDifference(startDate, endDate){

    var date1 = startDate;
    var date2 = endDate;
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days

}

async function findMissingDates(startDate, endDate, data){

    const begin = new Date(startDate);
    const end = new Date(endDate);
    const datesToRequest = [];

    for(var i = 0; i < data.length; i++){
        const currDate = new Date(data[i].data.metadata.start_time);
    }


}

module.exports = {dayDifference, findMissingDates};