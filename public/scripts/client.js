//FUNCTIONS========================================================
//All functions are wrapped in the jQuerry doc ready function

$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    // include jQuery previous request
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweets").prepend($tweet);
    }
  };

  //Set Toggle
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
    <div><i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i></div>
  </footer>
</article>`).addClass("tweet");

    return $tweet;
  };

  //Cross-Site Scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //POST============================================================
  //if text is empty, null or more than 140 characters produce the errors bellow, if not post the tweet
  $("form").submit(function(event) {
    $(".error").slideUp(300);
    let data = $(this).serialize();
    let textArea = $("#textArea").val().length;
    event.preventDefault();
    if (textArea < 1 || textArea === null) {
      $(".error")
        .text(
          " !!! ERROR: Life is short, and so is your post. Add more text to proceed. "
        )
        .slideDown(300);
    }
    if (textArea > 140) {
      $(".error")
        .text(
          " !!! ERROR: Are you writing a novel? Max character length is 140."
        )
        .slideDown(300);
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
