// // DATABASE=========================================================
// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac"
//     },
//     content: {
//       text:
//         "If I have seen further it is by standing on the shoulders of giants"
//     },
//     created_at: 1461116232227
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd"
//     },
//     content: {
//       text: "Je pense , donc je suis"
//     },
//     created_at: 1461113959088
//   }
// ];

// const tweetData = {
//   user: {
//     name: "Newton",
//     avatars: "https://i.imgur.com/73hZDYK.png",
//     handle: "@SirIsaac"
//   },
//   content: {
//     text: "If I have seen further it is by standing on the shoulders of giants"
//   },
//   created_at: 1461116232227
// };

//FUNCTIONS========================================================
$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    // include jQuery previous request
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweets").prepend($tweet);
      // });
    }
  };

  $("#compose").click(function() {
    $(".new-tweet")
      .slideToggle(500)
      .focus();
  });

  //function below uses jQuery to add the article and database information to the HTML doc, do not use id
  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="tweetContainer">
  <header>
    <div>
      <img src=${tweet.user.avatars}>
      <p>${tweet.user.name}</p>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <div class="textAreaTweet">${tweet.content.text}</div>
  <footer>
    <div>${moment(tweet["created_at"]).fromNow()}</div>
  </footer>
</article>`).addClass("tweet");

    return $tweet;
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // renderTweets(data);

  //POST============================================================
  //if text is empty, null or more than 140 characters
  $("form").submit(function(event) {
    let data = $(this).serialize();
    let textArea = $("#textArea").val().length;
    event.preventDefault();
    if (textArea < 1 || textArea === null) {
      alert("Too Short");
    }
    if (textArea > 140) {
      alert("Too Long");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: data,
        success: function() {
          loadTweets();
        }
      });
    }
  });

  //GET=================================================================
  // Function to load tweets
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/tweets"
    }).then(function(result) {
      renderTweets(result);
    });
  };
  loadTweets();
});
