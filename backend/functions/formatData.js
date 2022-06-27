function formatDate(data) {

    return data.data.metadata.start_time.substring(0,10).split('-').reverse().join('-');
};

function processData(data, type) {

    data.sort((a,b) => {
        return new Date(a.startDate) - new Date(b.startDate);
    });

    for(var i = 0; i < data.length; i++){
        data[i] = {date : formatDate(data[i]), data: getRelevantData(data[i].data, type)};
    }

    return data;
}

function getRelevantData(data, type) {

    switch(type) {
        case 'athlete': 
            break;
        case 'sleep':
            return data.sleep_durations_data;
            break;
        case 'heart':
            return data.heart_rate_data.summary;
            break;
        case 'body':
            break;
        case 'menstruation':
            break; 
        case 'nutrition':
            return data.summary.macros;
            break;
        case 'daily':
            return data;
            break;
        case 'body':
            break;
        case 'activity':
            break;
        default:
    }
}

module.exports = {processData}