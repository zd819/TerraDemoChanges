export default function General1({data},card){
    var health = (data["Health"] !== undefined ) ? data["Health"] : false ; //Sleep currently
    var nutrition = (data["Nutrition"] !== undefined ) ? data["Nutrition"] : false; //Calories consumed 
    var performance = (data["Performance"] !== undefined ) ? data["Performance"] : false; //Calories Burned
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    switch (card) {
        case 'Health': // Sleep
            if(nutrition && performance){  //Calories consumed vs Burned "Lower Stress Levels could help improve qua"
                for (let nValue of nutrition){ //Calories Consumed 
                    for (let pValue of performance){ //Calories Burned
                        if (nValue > 2500 && pValue < 500 ){
                            return "A more active routine can help improve quality and duration of sleep"
                        } else if (nValue < 1000 && pValue < 500 ){
                            return "Make sure you're hitting your diet and exercise goals, and your body will naturally increase quality of sleep"
                        } else if (nValue < 1000 && pValue > 1800 ){
                            return "Exercising in nature, like walks in the sun, can help decrease Cortisol levels and improve sleep.Try replacing some of your activity with these"
                        } else return "Good Job, your Sleep patterns indicate greatness"
                    }}
            }
            else if (nutrition){
                for (let nValue of nutrition){ //Calories consumed 
                    if( nValue < 1000){
                        return "A more vibrant and balanced diet can help your body to recover better during sleep"
                    }
                    else if (nValue > 3000){
                        return "More moderate calorie consumption can help decrease sleep deprivation and increase sleep quality"
                    } else return "Good Job, your Sleep patterns indicate greatness"
                }
            }
            else if (performance){
                for (let pValue of performance){ //Calories burned 
                    if( pValue < 500){
                        return "Adding more moderate-vigorous activity during the day can greatly imprve sleep quality. Try taking a walk in the sun!"
                    }
                    else if (pValue > 2000){
                        return "Allow your body to rest and recover regularly, especially after vigorous exercise, and your sleep and overall health will improve"
                    } else return "Good Job, your Sleep patterns indicate greatness"
                }
            }
            else{
                if(arrAvg(health) > 11){
                    return "Moderate Alchohol and Medication consumption can help rebalance sleep quantity"
                }
                else if (arrAvg(health) < 5){
                    return "Meditation can reduce stress and anxiety levels and help increase sleep quantity and quality"
                }
                else{
                    for (let hValue of health){ //Calories Burned 
                        if( hValue < 6){
                            return "You're Sleep indicators are pretty good. Make sure you're sleeping at the right time and amount each day"
                        }
                        else if (hValue > 11){
                            return "You're Sleep indicators are pretty good. Make sure you are controlling your alcohol consumption and eating healthy"
                        } else return "Good Job, your Sleep quantity indicates greatness"
                    }
                }

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