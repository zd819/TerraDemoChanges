export default function General1({data},card){
    var health = data["Health"]; //Sleep currently
    var nutrition = data["Nutrition"]; //Calories consumed 
    var performance = data["Performance"]; //Calories Burned
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    switch (card) {
        case 'Health': // Sleep
            if(nutrition && performance){  //Calories consumed vs Burned "Lower Stress Levels could help improve qua"
                for (let nValue of nutrition){ //Calories Consumed 
                    for (let pValue of performance){ //Calories Burned
                        if (nValue > 2500 && pValue < 500 ){
                            return "A more active life can help improve quality and duration of sleep"
                        } else if (nValue < 1000 && pValue < 500 ){
                            return "More hours awake and active could help increase your apetite"
                        } else return "Good Job, your nutrition levels indicate greatness"
                    }}
            }
            else if (nutrition){

            }
            else if (performance){

            }
            else{

            }

        case 'Nutrition': // Calories Consumed 
            if(health && performance){
                for (let hValue of health){ //Sleep 
                    for (let pValue of performance){ //Calories Burned
                        if (hValue < 4 && pValue > 1500 ){
                            return "Lower Anxiety Levels could help reduce over eating"
                        } else if (hValue > 11 && pValue < 300 ){
                            return "More hours awake and active could help increase your apetite"
                        } else return "Good Job, your nutrition levels indicate greatness"
                    }}
            }
            else if (health){
                for (let hValue of health){ //Sleep 
                    if( hValue < 4){
                        return "Decreased Fatigue could help increase your apetite, more sleep could help"
                    }
                    else if (hValue > 11){
                        return "Excessive Sleep can cause a spike in hunger, try gettig up earlier"
                    } else return "Good Job, your nutrition levels indicate greatness"
                }
            }
            else if (performance){
                for (let pValue of performance){ //Calories Burned 
                    if( pValue < 300){
                        return "Try being more Active and Take longer walks, this can help increase your apetite"
                    }
                    else if (pValue > 1700){
                        return "Wow, you're Active. A couple more rest days could be beneficial for your body"
                    } else return "Good Job, your nutrition levels indicate greatness"
                }
            }
            else{
                if(arrAvg(nutrition) > 3000){
                    return "You're consuming alot of calories! Make sure your diet and lifestyle are balancing out."
                }
                else if (arrAvg(nutrition) < 1000){
                    return "More Calories may be beneficial for your gut and heart, and overall health!"
                }
                else{
                    for (let nValue of nutrition){ //Calories Burned 
                        if( nValue < 1000){
                            return "You're nutrition levels are pretty good. Make sure you are eating enough every day"
                        }
                        else if (nValue > 1700){
                            return "You're nutrition levels are pretty good. Keep wary of your nutrition limits daily"
                        } else return "Good Job, your nutrition levels indicate greatness"
                    }
                }

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