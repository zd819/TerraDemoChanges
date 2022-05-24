
function findCalories(data) {

    console.log("hi");
    console.log(data)
    return {date : data.data.metadata.start_time.substring(0,10), dataPoint: data.data.summary.macros.calories};


};

module.exports = {findCalories}