export default function General1({data},card){
    var health = data["Health"]; //Sleep currently
    var nutrition = data["Nutrition"]; //Calories consumed 
    var performance = data["Performance"]; //Calories  Burned
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    switch (card) {
        case 'Health': // Sleep
            if(nutrition && performance){  //Calories consumed vs Burned
                
            }
            else if (nutrition){

            }
            else if (performance){

            }
            else{

            }

        case 'Nutrition': // Calories Consumed 
            if(health && performance){
                for (let hValue of health){
                    for (let pValue of performance){
                        if (hValue < 4 && pValue > 1500 ){
                            return "Increased Sleep and Less Activity Could Help Hit Calory Goals"
                        }
                    }

                }
            }
            else if (health){

            }
            else if (performance){

            }
            else{

            }
        default: // Performance
            if(nutrition && health){

            }
            else if (nutrition){

            }
            else if (health){

            }
            else{

            }
    }
};