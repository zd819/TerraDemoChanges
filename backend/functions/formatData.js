function findCalories(data) {
    return {date : data.data.metadata.start_time.substring(0,10).split('-').reverse().join('-'), dataPoint: data.data.summary.macros.calories};
};

module.exports = {findCalories}