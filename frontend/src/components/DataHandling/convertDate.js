
export default function convertDate(date){
    var x = date.getDate();
    var y = date.getMonth() + 1;
    var z = date.getFullYear();
    var fulldate = z + '-' + y + '-' + x ;
    return fulldate;
}