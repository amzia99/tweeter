// client code
const createTweetElement = function(tweet) {
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
        <p>${tweet.content.text}</p>
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


const renderTweets = function(tweets) {
const $tweetsContainer = $('#tweets-container');
$tweetsContainer.empty(); 
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet); 
  }
};


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  renderTweets(data);
});
