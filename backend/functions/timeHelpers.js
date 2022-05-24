// Form of Time : "2019-11-08T00:00:00+00:00"
// Expected Output : "12-01-2019"


// conversion code : const d = new Date('2015-03-04T00:00:00.000Z');


// export default function ConvertTime(isoTime) {
//     const date = isoTime;
//     const normalTime = date.getDate() +'-' (date.getMonth()+1) ;//+'-' date.getFullYear();//prints expected format.
//     console.log('Iso time :', date, 'to normal time : ', normalTime);
//     return normalTime;

// }

function dayDifference(startDate, endDate){

    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
      
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      
    return Difference_In_Days

    // //To display the final no. of days (result)
    // document.write("Total number of days between dates  <br>"
    //                + date1 + "<br> and <br>" 
    //                + date2 + " is: <br> " 
    //                + Difference_In_Days);
      

}

module.exports = {dayDifference};