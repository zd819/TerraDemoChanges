function relevantDataModels(provider) {
    console.log("inside here");

    switch(provider) {
        case "FITBIT":
            return ["activity", "daily", "sleep", "body", "athlete"];
        case "OURA":
            return ["sleep", "daily", "athlete"];
        case "TRAININGPEAKS":
            return ["activity", "body", "athlete"];
        case "WITHINGS":
            return ["activity", "sleep", "body"];
        case "SUUNTO":
            return ["activity", "daily"];
        case "PELOTON":
            return ["activity", "athlete"];
        case "ZWIFT": 
            return ["activity", "body", "athlete"];
        case "GARMIN":
            return ["nutrition", "activity", "daily", "sleep", "body", "athlete"];
        case "EIGHT":
            return ["sleep", "athlete"];
        case "WAHOO":
            return ["activity", "athlete"];
        case "GOOGLE":
            return ["activity", "daily", "sleep", "body", "athlete"];
        case "POLAR":
            return ["activity", "daily", "sleep", "body", "athlete"];
        case "APPLE":
            return ["activity", "daily", "sleep", "body", "athlete"];
        case "FREESTYLELIBRE":
            return ["body", "athlete"];
        case "TEMPO":
            return ["activity"];
        case "IFIT":
            return ["activity", "athlete"];
        case "CONCEPT2":
            return ["activity", "athlete"];
        case "MYFITNESSPAL":
            return ["nutrition"];
        default:
            return [];
    }
}

function getDataPath(dataModel) {

    switch(dataModel) {
        case 'athlete': 
            break;
        case 'sleep':
            break;
        case 'body':
            break;
        case 'menstruation':
            break; 
        case 'nutrition':
            
            break;
        case 'daily':
            break;
        case 'body':
            break;
        case 'activity':
            break;
        default:
    }
}

function findStartDate(type,data) {


    switch(type) {
        case 'athlete': 
            break;
        case 'sleep':
            break;
        case 'body':
            break;
        case 'menstruation':
            break; 
        case 'nutrition':     
            return data.metadata.start_time;
            break;
        case 'daily':
            break;
        case 'body':
            break;
        case 'activity':
            break;
        default:
    }
    
}

module.exports = {relevantDataModels, getDataPath, findStartDate};