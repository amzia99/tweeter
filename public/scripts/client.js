// client code
const createTweetElement = function (tweet) {
  const timeAgo = new Date(tweet.created_at).toLocaleString(); 
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user">
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <span class="name">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="content">
        <p>${$("<div>").text(tweet.content.text).html()}</p> <!-- Escaping user input -->
      </div>
      <footer>
        <span class="time-ago">${timeAgo}</span>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

const renderTweets = function (tweets) {
  const $tweetsContainer = $("#tweets-container");
  $tweetsContainer.empty(); 
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet); 
  }
};

const loadTweets = function () {
  $.ajax({
    url: "/tweets", 
    method: "GET", 
    dataType: "json", 
  })
  .done(function (tweets) {
    renderTweets(tweets); 
    })
    .fail(function (error) {
      console.error("Error loading tweets:", error);
    });
};

$(document).ready(function () {

  loadTweets();

$("#new-tweet-form").on("submit", function (event) {
  event.preventDefault(); 

  const $form = $(this);
  const tweetText = $form.find("textarea").val().trim(); 

if (!tweetText) {
  alert("Tweet cannot be empty!");
     return;
    }
    if (tweetText.length > 140) {
      alert("Tweet cannot exceed 140 characters!");
      return;
    }

const formData = $form.serialize();

  $.ajax({
  url: "/tweets", 
  method: "POST", 
data: formData, 
    })
      .done(function () {
        console.log("Tweet submitted successfully!");
        $form.find("textarea").val(""); 
        loadTweets(); 
      })
      .fail(function (error) {
        console.error("Error submitting tweet:", error);
      });
  });
});