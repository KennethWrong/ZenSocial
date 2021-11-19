
const get_time_difference = (date) => {
    let current_date = new Date()

    if (current_date < date) {
        current_date.setDate(current_date.getDate() + 1);
    }
    
    var diff = current_date - date;
    
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);  
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    var diff2 =(current_date.getTime() - date.getTime()) / 1000;
    diff2 /= (60 * 60 * 24);
    let years = Math.abs(Math.round(diff2/365.25));

    if(years > 0){
        return `${years.toString() + 'y ago'}`
    }if(hh >0){
        return `${hh.toString()+' hours ago'}`
    }if(mm > 30){
        return `${'30 mins ago'}`
    }if(ss >0){
        return `${'just now'}`
    }

}

export {get_time_difference};