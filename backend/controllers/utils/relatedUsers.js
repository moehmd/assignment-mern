export default function relatedUsers(response) {
    let relativesCount = {};
    let countedLastNames = [];
  
    for(let i = 0; i < response.length; i++) {
      let lastName = response[i]["lastName"];
      let count = (relativesCount[lastName] || 0) + 1;
      relativesCount[lastName] = count;
    };
  
    for(let key in relativesCount) {
      if(relativesCount.hasOwnProperty(key)) {
        if(relativesCount[key] > 1) {
          countedLastNames.push({
            lastName:key, count:relativesCount[key]
          }); 
        };
      };
    };
    return countedLastNames;
};