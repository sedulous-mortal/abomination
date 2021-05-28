
// let JSONfile;

// this acts as a placeholder for our globally-accessible plantsData, 
// which will be like a shared state across all pages
var plantsData = []

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
                plantsData = plants;
            },    
        })
    }
}

function loadPlantsSuccessFunction(plantsData) {
     for (const plant of plantsData) {
        addPlantsToPages(plant);
      }
    let divs = document.querySelectorAll("div");
    for (let index = 0; index < divs.length; ++index) {
        divs[index].addEventListener('click', e => {
            console.log("Index is: " + index);
        });
    }
}

function  addPlantsToPages(plant){
    console.log("adding " + plant.Name + " to page")
    if ($('#seed-nav')){
        console.log("putting the " + plant.Name + " in my seed-nav id div")
        $('#seed-nav').append(
            $('<li>', {text: plant.Name}));
    } else console.log('where is my seed-nav id div')
    // here we will need to map over the keys in the plant for garden view
    //  add plant to the garden html file 
    // add plant to the plants list html file
    // add plant and its dates to the timeline html file
}

let showPlants = () => {
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
    }).then(function(){
        // when user navigates to plants page, reload plants using global state
        loadPlantsSuccessFunction(plantsData)
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}

let showGarden = () =>  {
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