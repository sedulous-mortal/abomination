
var lastClicked = "HOME";

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
    let lis = document.querySelectorAll("#seed-nav li");
    for (let index = 0; index < lis.length; ++index) {
        lis[index].addEventListener('click', e => {
            console.log("Index is: " + index);
        });
    }
}

function  addPlantsToPages(plant){
    console.log("adding " + plant.Name + " to page")
    // if ($('#seed-nav')){
    //     console.log("putting the " + plant.Name + " in my seed-nav id div")
    //     $('#seed-nav').append(
    //         $('<li>', {text: plant.Name}));
    // } else console.log('where is my seed-nav id div')
    async function getJSON(path, callback) {
        return callback(await fetch(path).then(r => r.json()));
    }
    // here is Nicholas Hazel's self-instantiating anonymous function
    (async function () {
        // this line makes sure with await that we are getting ALL the seeds at once
        seeds = await getJSON('./data.json', data => data);
        // TIL that $ helps us denote seedList will be a dom node/element. THX Nicholas
        const $seedList = document.getElementById('seed-nav');
        for (let seed of seeds) {
            if(seed && seed.Name){
               $seedList.insertAdjacentHTML(
                   'beforeend',
                   `<li class="seed-name" onclick="showSeed(event)">${seed.Name}</li>`
               )
            } else if (seed) {
               $seedList.insertAdjacentHTML(
                   'beforeend',
                   `<li class="seed-name" onclick="showSeed(event)">Unidentified Seed</li>`
               )
            }
        }
        // renderHome has to happen in here, otherwise seeds is empty when it gets called because of async issues
        renderHome();
    })();

    // TODO: build garden
    // here we will need to map over the keys in the plant for garden view
    //  add plant to the garden html file 
    // add plant to the plants list html file
    // add plant and its dates to the timeline html file
}

let showPlants = () => {
    lastClicked = "PLANTS"
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
    lastClicked = "GARDEN"
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
    lastClicked = "TIMELINE"
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

let showNutrition = () => {
    lastClicked = "NUTRITION"
    fetch('nutrition.html')
    .then(function(response){
        return response.text()
    })
    .then(function(html) {
        document.getElementsByClassName("main-content")[0].innerHTML = html
    })
    .catch(function(err) {
        console.log("Failed to fetch page: ", err)
    })
}