$(document).ready(function() {
    const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
    const searchForm = $('#searchForm');
    const searchTermInput = $('#searchTerm');
    const gifContainer = $('#gifContainer');
    const removeButton = $('#removeButton');
  
    searchForm.on('submit', function(event) {
      event.preventDefault();
      const searchTerm = searchTermInput.val();
      searchTermInput.val('');
  
      if (searchTerm.trim() !== '') {
        searchGif(searchTerm);
      }
    });
  
    removeButton.on('click', function() {
      gifContainer.empty();
    });
  
    function searchGif(searchTerm) {
      const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;
  
      axios.get(url)
        .then(function(response) {
          const gifData = response.data.data;
  
          if (gifData.length > 0) {
            const gif = gifData[0].images.original.url;
            appendGif(gif);
          } else {
            console.log('No GIFs found');
          }
        })
        .catch(function(error) {
          console.log('Error fetching GIF:', error);
        });
    }
  
    function appendGif(gifUrl) {
      const gifElement = $('<img>').addClass('gif').attr('src', gifUrl);
      gifContainer.append(gifElement);
    }
  });
  