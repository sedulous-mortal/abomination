
// let JSONfile;

// listen for changes to document.readyState - onreadystatechange is
// fired when readyState value is changed
// SRC: https://www.jamesbaum.co.uk/blether/document-ready-alternative-in-vanilla-javascript/
document.onreadystatechange = function () {
    // check the value - if it's 'interactive' then the DOM has loaded, 
    // if it's "complete" then  everything has finished loading
    // (equivalent to $(window).load())
    if (document.readyState === "interactive") {
        
        // load the data
        $.ajax({
            url: './data.json',
            dataType: 'json',
            error: function (error) {
                console.log(error)
            },
            success: function (plants) {
                loadPlantsSuccessFunction(plants)
            },    
        })
    }
}

// we make this async to  ensure things load in the correct order across all pages
async function loadPlantsSuccessFunction(plantsData) {
    console.log(plantsData, "in async")
     for (const plant of plantsData) {
         console.log(plant, "PLANT")
        await addPlantsToPages(plant);
      }
    let divs = document.querySelectorAll("div");
    for (let index = 0; index < divs.length; ++index) {
        divs[index].addEventListener('click', e => {
            console.log("Index is: " + index);
        });
    }
}

// does this need to  be a Promise because of the await on line 25?
function  addPlantsToPages(plant){
    console.log("adding " + plant.Name + " to page ")
    $('.main-content').append($('<div>', {
        text: plant.Name
    }));
    // here we will need to map over the keys in the plant
    //  add plant to the garden html file 
    // add plant to the plants list html file
    // add plant and its dates to the timeline html file
}

let showPlants = () => {
    console.log('showing plants')
    // I adapted this local-file fetch syntax from
    //  https://stackoverflow.com/a/50812705
    fetch('plants.html')
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        // routing: set the main content to be overwritten
        // by the html module we want
        document.getElementsByClassName("main-content")[0].innerHTML = html
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}

let showGarden = () =>  {
    console.log('showing garden')
    fetch('garden.html')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        document.getElementsByClassName("main-content")[0].innerHTML = html
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}

let showTimeline = () =>  {
    console.log('showing timeline')
    fetch('timeline.html')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        document.getElementsByClassName("main-content")[0].innerHTML = html
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}