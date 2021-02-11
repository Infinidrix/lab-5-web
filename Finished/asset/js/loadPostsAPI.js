// State vars 
let allPosts = [{title: ""}];

// UI Vars 
const postDiv3 = document.getElementById('thePosts');
document.querySelector("#search-field").addEventListener("input", (e) => {
    document.querySelector("#loading-search").classList.add("loading");
    setTimeout(() => {postDiv3.innerHTML = ""
    let query = e.target.value;
    postResults(allPosts.filter((post) => post.title.includes(query)))
    document.querySelector("#loading-search").classList.remove("loading");
    }, 1200);
})
document.querySelector("#desc").addEventListener("click", (e) => {e.preventDefault();sortArticles(1);} );
document.querySelector("#ascd").addEventListener("click", (e) => {e.preventDefault();sortArticles(-1)} );
function sortArticles(mult) {

    postResults(allPosts.sort((a, b) => {
        if(a.title < b.title) { return -1 * mult; }
        if(a.title > b.title) { return 1 * mult; }
        return 0;
    }));

}
//Load Every thing ....
document.addEventListener("DOMContentLoaded", () => {
    //load_fromPlaceHolder();
    var clockElements = makeClockElements(
        'i', 'i', 'i'
    );
    
    function makeClockElements(...tags) {
        var clock = document.getElementById('clock'),
        result = [];
        tags.forEach( (tagName) => {
            var element = clock.appendChild(document.createElement(tagName));
            result.push(element);
        });
        return result;
    }
    
    function clockUpdate() {
        var now = new Date();
        clockElements[0].style.transform = 'rotate(' + (
            now.getHours() * 30 + (Math.floor(now.getMinutes() / 12) * 6)
        ) + 'deg)';
        clockElements[1].style.transform = 'rotate(' + (
            ((now.getSeconds() / 60) + now.getMinutes()) * 6
        ) + 'deg)';
        clockElements[2].style.transform = 'rotate(' + (
            (now.getSeconds() + (now.getMilliseconds() / 1000)) * 6
        ) + 'deg)';
    }
    clockUpdate();
    setInterval(clockUpdate, 100);
    setTimeout(loadDataNew, 3000);
});

refresh()
function refresh(){
    let imageNode = document.querySelector("#photo-booth");
    fetch( "https://picsum.photos/400" ) 
    .then( r => r.arrayBuffer() ) 
    .then( ab => URL.createObjectURL( new Blob( [ ab ], { type: 'image/jpeg' } ) ) ) 
    .then( src => imageNode.src = src ) 
    .catch( console.error );
}

//load a single customer function 
function load_fromPlaceHolder() {

    //open the request 
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(res) {
            return res.json(); //return the JSON Promise
        })
        .then(posts => {
            allPosts = posts; 
            postResults(posts); 
        })
        .catch(function(err) {
            console.log(err);
        });



}
function postResults(posts){
        //iterate over each post [100 posts]
        let output = '';

        posts.forEach(function(post) {
            output += `
    
            <div class="item">
            <div class="image">
                <img src="https://picsum.photos/200">
            </div>
            <div class="content">
                <a class="header" href="#" id="bTitle">
                ${post.title.toUpperCase()}
                </a>
                <div class="description">
                    <p id="bDesc">
                    ${post.body}
                    </p>
                </div>
                <div class="extra">
                    <a class="ui floated basic violet button" href="#">Read Mores</a>
                </div>
            </div>
        </div>
    
    `;
        });
        postDiv3.innerHTML = output;
}
async function load_fromPlaceHolder_new() {

    //open the request 
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    let data = await response.json();

    return data;

}

function loadDataNew() {
    load_fromPlaceHolder_new().then(posts => {
        allPosts = posts; 
        // console.log(allPosts);
        // console.log("HIIII")
        postResults(posts); 
    })
        .catch(function(err) {
            console.log(err);
        });

}