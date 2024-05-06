
export default function findDescription (weatherCode) {

    let description;
    switch(weatherCode) {
        case 0:
            description = 'Ciel dégagé'
        break;
        case 1:
            description = 'Ciel presque dégagé'
        break;
        case 2:
            description = 'Temps partiellement nuageux'
        break;
        case 3:
            description = 'Temps couvert'
        break;
        case 61:
            description = 'Pluie fine'
        break; 
        case 63:
            description = 'Pluie modérée'
        break;
        case 65:
            description = 'Fortes pluies'
        break; 
        case 51:
            description = 'Légère bruine'
        break;
        case 53: 
            description = 'Bruine modérée'
        break;
        case 55:
            description = 'Bruine dense'
        break; 
        case 56: 
            description = 'Bruine verglaçante légère'
        break; 
        case 57:
            description = 'Bruine verglaçante dense'
        break; 
        case 80: 
        case 81:
            description = 'Averses de pluie'
        break; 
        case 82:
            description = 'Averses de pluie violentes'
        break;
        case 66: 
        case 67:
            description = 'Pluie verglaçante'
        break;
        case 95: 
        case 96: 
        case 99:
            description = 'Risque d\'orage'
        break;
        case 71:
            description = 'Quelques flocons'
        break;
        case 73:
        case 85:
            description = 'Chute de neige modérée'
        break; 
        case 75:
        case 86:
            description = 'Chute de neige dense'
        break; 
        case 77:
            description = 'Grain de neige'
        break; 
        case 45: 
        case 48:
            description = 'Brouillard'
        break;
        }

        return description;

}