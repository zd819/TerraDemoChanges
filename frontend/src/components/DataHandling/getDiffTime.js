
export default function getDiffTime(past, difference){
    var current = new window.Date();
    var beforedate =  past =='-' ? new Date(new Date().setDate(current.getDate() - difference)) : 
    new Date(new Date().setDate(current.getDate() + difference));
    var x = beforedate.getDate();
    var y = beforedate.getMonth() + 1;
    var z = beforedate.getFullYear();
    var fulldate = x + '-' + y + '-' + z;
    return fulldate;
}