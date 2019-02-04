
const Utils = function(){
    this.interval_ID;
    this.startTime;
    this.endTime;    
    this.timeCollection = {timeList: []};
}

Utils.prototype.startTimer = function(display){
    this.startTime = new Date();
    let hours = 0, minutes = 0, seconds = 0, totalSeconds = 0;
    this.interval_ID = setInterval(function () {
        hours = parseInt(totalSeconds / 3600, 10);
        minutes = parseInt((totalSeconds / 60) % 60, 10)
        seconds = parseInt(totalSeconds % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;
            
        totalSeconds++;           
    }, 1000);
}

Utils.prototype.getInterval_ID = function(){
    return this.interval_ID;
}

Utils.prototype.stopTimer = function(){
    this.endTime = new Date();
    clearInterval(this.interval_ID);
}

Utils.prototype.getTotalTime = function(){    
    let timeDiff = this.endTime - this.startTime;    
    return timeDiff;
}
    
Utils.prototype.createProfile = function(obj){
    let serialObj = JSON.stringify(obj);
    localStorage.setItem("profile", serialObj);
};

Utils.prototype.getUserName = function(){
    let profileObj = JSON.parse(localStorage.getItem("profile"));         
    return profileObj.firstName;
}

// ТОP10 of records - min time for game, stored in localStorage
Utils.prototype.updateTimeCollection = function(duration){
    if("results" in localStorage){
        let resultsObj = JSON.parse(localStorage.getItem("results"));
        
        if(resultsObj.timeList.length == 10){            
            let min = Math.min(...(resultsObj.timeList));
            if(duration < min ){
                let index = resultsObj.timeList.indexOf(min); 
                if(index !== -1){
                    resultsObj.timeList[index] = duration;                    
                }
            }
        } 
        else if(resultsObj.timeList.length < 10) {
            resultsObj.timeList.push(duration);           
        }
        localStorage.setItem("results", JSON.stringify(resultsObj));

    } else {
        this.timeCollection.timeList.push(duration);
        localStorage.setItem("results", JSON.stringify(this.timeCollection));
    }
}
