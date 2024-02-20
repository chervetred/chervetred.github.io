(function() {
  document.charset = "utf-8";

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Есть ли результаты?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Перебираем результаты
        var item = store[results[i].ref];
        appendString += '<li class="border-bottom mb-4 pb-3"><h4><a class="text-dark" href="' + item.url + '">' + item.title + '</a></h4>';
        appendString +='<p>' + item.date + '</p>';
        appendString += '<p>' + item.content.substring(0, 245) + '...</p>';
        appendString += '<a href="' + item.url + '" class="btn btn-transparent pl-0">' + "Read More" + '</a></li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Инициализируем lunr с полями, по которым будет производиться поиск. Полю title
    // присвоен коэффициент 10, чтобы указать, что совпадения в этом поле более важны.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Добавляем данные в lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Выполняем поиск с помощью lunr
      displaySearchResults(results, window.store); // Этот код будет описан в следующем разделе
    }
  }
})();
