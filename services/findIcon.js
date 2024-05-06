

export default function findIcon (weatherCode, daySwitch) {

    let icon;
    switch(weatherCode) {
    case 0:
      icon = '01'
    break;
    case 1:
      icon = '02'
    break;
    case 2:
      icon = '03'
    break;
    case 3:
      icon = '04'
    break;
    case 61: 
    case 63: 
    case 51: 
    case 53: 
    case 55: 
    case 56: 
    case 57: 
    case 80: 
    case 81: 
    case 82:
      icon = '09'
    break;
    case 65:
    case 66: 
    case 67:
      icon = '10'
    break;
    case 95: 
    case 96: 
    case 99:
      icon = '11'
    break;
    case 71:
    case 73: 
    case 75: 
    case 77: 
    case 85: 
    case 86:
      icon = '13'
    break;
    case 45: 
    case 48:
      icon = '50'
    break;
    }
    
    return icon + daySwitch;

}
