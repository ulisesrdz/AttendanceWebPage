import businessURL from './businessURL';

export default function getCourseURL(operation){
    let result = '';

    switch(operation){
        case 'get':
            result = businessURL + "/Course.php";
            break;
        case 'post':
            result = businessURL + "/Course.php";
            break;
        case 'put':
            result = businessURL + "/Course.php?id=";
            break;
        case 'delete':
                result = businessURL + "/Course.php?id=";
                break;
        default:
            result = 'Invalid Operation';
            break;
    }
    

return result;
}