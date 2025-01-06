// client code
const escape = function (str) {
  let div = document.createElement("div")
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  const timeAgo = timeago.format(tweet.created_at);
  const safeName = escape(tweet.user.name);
  const safeHandle = escape(tweet.user.handle);
  const safeContent = escape(tweet.content.text);

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
        <p>${$("<div>").text(tweet.content.text).html()}</p> <!-- Escaping user input for safety -->
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
    if (newTweet) {}
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet); 
    return;
  }
};


const loadTweets = function () {
  $.ajax({
  url: "/tweets", 
  method: "GET", 
  dataType: "json", 
  })
    .done(function (tweets) {
      $tweetsContainer.empty(); 
      renderTweets(tweets); 
    })
    .fail(function (error) {
      console.error("Error loading tweets:", error); 
    });
};

$(document).ready(function () {
  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop(); 

    if (scrollTop > 100) {
      $(".scroll-top-btn").fadeIn(); 
      $(".compose-btn").fadeOut(); 
    } else {
      $(".scroll-top-btn").fadeOut(); 
      $(".compose-btn").fadeIn(); 
    }
  });

  $(".scroll-top-btn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow", function () {
      const $newTweetSection = $(".new-tweet");
      $newTweetSection.slideDown(() => {
        $("#tweet-text").focus(); 
      });
    });
  });
});
  loadTweets(); 

  
  $("#new-tweet-form").on("submit", function (event) {
  event.preventDefault(); 

    const $form = $(this);
    const tweetText = $form.find("textarea").val().trim(); 

    if (!tweetText) {
      $(".error-message")
      .text("Error: Tweet cannot be empty!")
      .slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $(".error-message")
      .text("Error: Tweet cannot exceed 140 characters!")
      .slideDown();
      return;
    }

    $(".error-message").slideUp();

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

