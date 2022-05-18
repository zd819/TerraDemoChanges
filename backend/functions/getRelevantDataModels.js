
async function relevantDataModels(provider) {

    switch(provider) {

        case "FITBIT":
            return ["nutrition"];
            break;
        case "OURA":
            return ["sleep"];
            break;
        case "TRAININGPEAKS":
            break;
        case "WITHINGS":
            break;
        case "SUUNTO":
            break;
        case "PELOTON":
            break;
        case "ZWIFT": 
            break;
        case "GARMIN":
            break;
        case "EIGHT":
            break;
        case "WAHOO":
            break;
        case "GOOGLE":
            break;
        case "POLAR":
            break;
        case "APPLE":
            break;
        case "FREESTYLELIBRE":
            break;
        case "TEMPO":
            break;
        case "IFIT":
            break;
        case "CONCEPT2":
            break;

        default:
            return [];
    }

}

async function getRelevantPath(dataModel) {

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