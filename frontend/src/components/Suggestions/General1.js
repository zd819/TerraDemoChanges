export default function General1(data,card){
    // console.log('data VALUE IS ,', data)
    var health,nutrition,performance = []
    if(data === undefined){
        return "No suggestion"
    }
    else{
    health = (data['Health'] !== undefined ) ? data['Health'] : false  ; //Sleep currently
    nutrition = (data['Nutrition'] !== undefined ) ?  data['Nutrition'] : false ; //Calories consumed
    performance = (data['Performance'] !== undefined ) ?  data['Performance'] : false  ; //Calories Burned
    function Average(array){
        return array.reduce((a,b) => a + b, 0) / array.length
    }
    // const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    switch (card) {
        case 'Health': // Sleep
        // Active : 0
        // Portion Control : 1
        // Outdoor Sun : 2 
        // Healthy Eating : 3
        // Vice Balance : 4
        // Rest : 5
        // Meditation : 6
        // Target : 7
            if(nutrition && performance){  //Calories consumed vs Burned "Lower Stress Levels could help improve qua"
                let nValue =  Average(nutrition); //Calories Consumed 
                    let pValue = Average(performance); //Calories Burned
                        if (nValue > 2500 && pValue < 500 ){
                            return [0,"A more active routine can help improve quality and duration of sleep"]
                        } else if (nValue < 1000 && pValue < 500 ){
                            return [0,"Make sure you're hitting your diet and exercise goals, and your body will naturally increase quality of sleep"]
                        } else if (nValue < 1000 && pValue > 1800 ){
                            return [2,"Exercising in nature, like walks in the sun, can help decrease Cortisol levels and improve sleep.Try replacing some of your activity with these"]
                        } else return [7,"Good Job, your Sleep patterns indicate greatness"]
                    
            }
            else if (nutrition){
                let nValue = Average(nutrition); //Calories consumed 
                    if( nValue < 1000){
                        return [3,"A more vibrant and balanced diet can help your body to recover better during sleep"]
                    }
                    else if (nValue > 3000){
                        return [1,"More moderate calorie consumption can help decrease sleep deprivation and increase sleep quality"]
                    } else return [7,"Good Job, your Sleep patterns indicate greatness"]
                
            }
            else if (performance){
                let pValue = Average(performance); //Calories burned 
                    if( pValue < 500){
                        return [0,"Adding more moderate-vigorous activity during the day can greatly imprve sleep quality. Try taking a walk in the sun!"]
                    }
                    else if (pValue > 2000){
                        return [5,"Allow your body to rest and recover regularly, especially after vigorous exercise, and your sleep and overall health will improve"]
                    } else return [7,"Good Job, your Sleep patterns indicate greatness"]
                
            }
            else{
                if(health == false){return "No Suggestion"}
                else if(Average(health) > 11){
                    return [4,"Moderate Alchohol and Medication consumption can help rebalance sleep quantity"]
                }
                else if (Average(health) < 5){
                    return [6,"Meditation can reduce stress and anxiety levels and help increase sleep quantity and quality"]
                }
                else{
                    for (let hValue of health){ //Calories Burned 
                        if( hValue < 6){
                            return [5,"You're Sleep indicators are pretty good. Make sure you're sleeping at the right time and amount each day"]
                        }
                        else if (hValue > 11){
                            return [5,"You're Sleep indicators are pretty good. Make sure you are controlling your alcohol consumption and eating healthy"]
                        } else return [7,"Good Job, your Sleep quantity indicates greatness"]
                    }
                }

            }

        case 'Nutrition': // Calories Consumed 
        // Portion Control : 0
        // Healthy Eating : 1
        // Vice Balance : 2 
        // Anxiety Balance : 3
        // Outdoor Sun : 4
        // Sleep : 5
        // Eat more : 6
        // Target : 7
            if(health && performance){
                let hValue = Average(health); //Sleep 
                    let pValue = Average(performance);//Calories Burned
                        if (hValue < 4 && pValue > 1500 ){
                            return [3,"Lower Anxiety Levels could help reduce over eating. Try meditation"]
                        } else if (hValue > 11 && pValue < 300 ){
                            return [4,"More hours awake and active could help increase your apetite"]
                        } else return [7,"Good Job, your nutrition levels indicate greatness"]
                    
            }
            else if (health){
                let hValue = Average(health); //Sleep 
                    if( hValue < 4){
                        return [5,"More Sleep can help decrease Fatigue which will help increase your apetite"]
                    }
                    else if (hValue > 11){
                        return [5,"Excessive Sleep can cause a spike in hunger, try gettig up earlier"]
                    } else return [7,"Good Job, your nutrition levels indicate greatness"]
                
            }
            else if (performance){
                let pValue = Average(performance); //Calories Burned 
                    if( pValue < 300){
                        return [4,"Try being more Active and Take longer walks, this can help increase your apetite"]
                    }
                    else if (pValue > 1700){
                        return [5,"Wow, you're Active. A couple more rest days could be beneficial for your body"]
                    } else return [7,"Good Job, your nutrition levels indicate greatness"]
                
            }
            else{
                if(nutrition == false){return "No Suggestion"}
                else if(Average(nutrition) > 3000){
                    return [0,"You're consuming alot of calories! Make sure your diet and lifestyle are balancing out."]
                }
                else if (Average(nutrition) < 1000){
                    return [6,"More Calories may be beneficial for your gut and heart, and overall health!"]
                }
                else{
                    for (let nValue of nutrition){ //Calories Burned 
                        if( nValue < 1000){
                            return [6,"You're nutrition levels are pretty good. Make sure you are eating enough every day"]
                        }
                        else if (nValue > 1700){
                            return [0,"You're nutrition levels are pretty good. Keep wary of your nutrition limits daily"]
                        } else return [7,"Good Job, your nutrition levels indicate greatness"]
                    }
                }

            }
        default: // Performance
        // Rest : 0
        // Meditation : 1
        // Anxiety Balance : 2 
        // Eat more : 3
        // Sleep : 4
        // healthy : 5
        // Portion Control : 6
        // Target : 7
            if(health && nutrition){
                let hValue = Average(health); //Sleep 
                    let nValue = Average(nutrition); //Calories consumed
                        if (hValue < 4 && nValue < 1300 ){
                            return [3,"Remember : Refeuling and Resting your body allows you to perform better the next day "]
                        } else if (hValue > 11 && nValue < 1300 ){
                            return [1,"Relax and focus. Attack your daily goals and naturally your body will consume and hence perform better"]
                        } else if (hValue < 4 && nValue > 3200 ){
                            return [1,"Meditation and Planned Schedules can help refocus your day, and help you get more active"]
                        } else return [7,"Good Job, your Activity levels indicate greatness"]
                    
            }
            else if (health){
                let hValue = Average(health); //Sleep 
                    if( hValue < 4){
                        return [4,"Try and get more focues and prolonged sleep, to recharge and hit your activity goals"]
                    }
                    else if (hValue > 11){
                        return [4,"Excessive Sleep can cause larthagy and laziness, try gettig up earlier"]
                    } else return [7,"Good Job, your Activity levels indicate greatness"]
                
            }
            else if (nutrition){
                let nValue = Average(nutrition); //Calories Consumed 
                    if( nValue < 300){
                        return [3,"Eat more to Do more. You got this"]
                    }
                    else if (nValue > 1700){
                        return [5,"You may need to rethink your daily nutrition, maybe replace some carbs with fruit and veg"]
                    } else return [7,"Good Job, your Activity levels indicate greatness"]
                
            }
            else{
                if(performance == false){return "No Suggestion"}
                else if(Average(performance) > 3000){
                    return [6,"You're consuming alot of calories! Make sure your diet and lifestyle are balancing out."]
                }
                else if (Average(performance) < 1000){
                    return [3,"More Calories may be beneficial for your gut and heart, and overall health!"]
                }
                else{
                    for (let pValue of performance){ //Calories Burned 
                        if( pValue < 1000){
                            return [5,"You're nutrition levels are pretty good. Make sure you are eating enough every day"]
                        }
                        else if (pValue > 1700){
                            return [5,"You're nutrition levels are pretty good. Keep wary of your nutrition limits daily"]
                        } else return [7,"Good Job, your nutrition levels indicate greatness"]
                    }
                }
            }
    }
}
};