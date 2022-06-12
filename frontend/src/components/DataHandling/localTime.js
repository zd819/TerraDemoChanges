
export default function localTime(){
    var start = new window.Date();
    var x = start.getDate();
    var y = start.getMonth() + 1;
    var z = start.getFullYear();
    var fulldate = x + '-' + y + '-' + z;
    return fulldate;
}