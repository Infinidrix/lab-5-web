// UI Vars 
const postDiv3 = document.getElementById('thePosts');

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
            if (tagName === 'i') result.push(element);
        });
        return result;
    }
    
    function clockUpdate() {
        var now = new Date();
        clockElements[0].style.transform = 'rotate(' + (
            now.getHours() * 30 + (Math.floor(now.getMinutes() / 12) * 6)
        ) + 'deg)';
        clockElements[1].style.transform = 'rotate(' + (
            ((now.getSeconds / 60) + now.getMinutes()) * 6
        ) + 'deg)';
        clockElements[2].style.transform = 'rotate(' + (
            (now.getSeconds() + (now.getMilliseconds() / 1000)) * 6
        ) + 'deg)';
    }
    clockUpdate();
    setInterval(clockUpdate, 100);
    setTimeout(loadDataNew, 5000);
});


//load a single customer function 
function load_fromPlaceHolder() {

    //open the request 
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(res) {
            return res.json(); //return the JSON Promise
        })
        .then(function(posts) {
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
        })
        .catch(function(err) {
            console.log(err);
        });



}

async function load_fromPlaceHolder_new() {

    //open the request 
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    let data = await response.json();

    return data;

}

function loadDataNew() {
    load_fromPlaceHolder_new().then(function(posts) {
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
        })
        .catch(function(err) {
            console.log(err);
        });

}