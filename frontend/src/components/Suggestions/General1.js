export default function General1({data},card){
    var health = data["Health"]; //Sleep currently
    var nutrition = data["Nutrition"];
    var performance = data["Performance"];
    switch (card) {
        case 'Health':
            if(nutrition && performance){

            }
            else if (nutrition){

            }
            else if (performance){

            }
            else{

            }

        case 'Nutrition':
            if(health && performance){

            }
            else if (health){

            }
            else if (performance){

            }
            else{

            }
        default:
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