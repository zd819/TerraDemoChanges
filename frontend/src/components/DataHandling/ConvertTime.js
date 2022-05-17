// Form of Time : "2019-11-08T00:00:00+00:00"
// Expected Output : "12-01-2019"


// conversion code : const d = new Date('2015-03-04T00:00:00.000Z');


export default function ConvertTime(isoTime) {
    const data = isoTime;
    const normalTime = date.getDate() +'-' (date.getMonth()+1) +'-' date.getFullYear();//prints expected format.
    console.log('Iso time :', date, 'to normal time : ', normalTime);
    return normalTime;

}











