var reset, searchData, dataDisplay, removeResults;

reset = function() {
  $('.results').empty();
  $('#inputField').val("");
};
searchData = function() {
  var newSearch, url;
  newSearch = document.getElementById("inputField").value;
  url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + newSearch + "&format=json&callback=?";
  $.getJSON(url, function(data) {
    dataDisplay(data);
  });
};
dataDisplay = function(data) {
  var searchVal, populateUI;
    $('.results').empty();
    searchVal = data.query.search;
    for (var i in searchVal) {
      populateUI = "<h3 class='queryTitle'><a href='https://en.wikipedia.org/wiki/" + searchVal[i].title + "'>" + searchVal[i].title + "</a></h3><p class='querySnippet'>" + searchVal[i].snippet + "...</p>";
      $('.results').append(populateUI);
  }
};

$(document).ready(function() {
  $("#searchBtn").on("click", function() {
    searchData();
  });
  $(".randomBtn").on("click", function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });
  $('#inputField').keyup(function(e) {
    var key = e.keyCode || e.which;
    if (key === 13) searchData();
  });
  $(".resetBtn").on("click", function() {
    reset();
  });
  $('#inputField').keyup(function() {
    var searchText = $(this).val();
    if (searchText.length > 0) {
      searchData();
    } //else {
      //setTimeout(reset, 3000);
    //}
  });
});