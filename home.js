let apiKey=`AIzaSyB-am4BKr8ql4ZgW8z4X9AkGU8myCBYyXI`;
const baseUrl = `https://www.googleapis.com/youtube/v3`;

/** 
 * 
* @param {String} searchString
*/


const searchButton=document.getElementById("search");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => { 
    let searchString = searchInput.value.trim(); 
    if (searchString===""){
        return;
    }
getSearchResults(searchString);
})

async function getSearchResults(searchString){
    //make a call to search api and retuen results
    //data need to be sent: apikey, searchString
    let url=`${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`;
    const response=await fetch(url, {method:"GET"});
    const result=await response.json();
    displaySearchResults(result.items);
    console.log(result);
}

function displaySearchResults(searchResults) {
    const searchResultsContainer = document.getElementById("search-results-container");
    searchResultsContainer.innerHTML = ""; // Clear previous results

    // Iterate through the search results and create video cards to display them
    searchResults.forEach(item => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const channelTitle = item.snippet.channelTitle;
        const thumbnailUrl = item.snippet.thumbnails.high.url;

        // Create a new video card element for each search result
        const videoCard = document.createElement("div");
        videoCard.className = "video";
        videoCard.innerHTML = `
            <a href="https://youtube.com/watch?v=${videoId}">
                <img src="${thumbnailUrl}" class="thumbnail" alt="">
                <div class="content">
                    <h4 class="title">${videoTitle}</h4>
                    <p class="channel-name">${channelTitle}</p>
                </div>
            </a>
        `;

        // Append the video card to the search results container
        searchResultsContainer.appendChild(videoCard);
    });
}









const videoCardContainer = document.querySelector('.video-container');

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
fetch(video_http + new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}



// const searchIn = document.querySelector('#search-input');
// const searchBtn = document.querySelector('#search');
// let searchLink = "https://www.youtube.com/results?search_query=";

// searchBtn.addEventListener('click', () => {
//     if(searchInput.value.length){
//         location.href = searchLink + searchInput.value;
//     }
// });


