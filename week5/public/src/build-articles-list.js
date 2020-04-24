/**
 * html structure
 *
 * @example
 * <ul class="articles-list">
 *  <li class="article-item">
 *    <div class="article-item-block">
 *      <span class="article-checkbox"><input type="checkbox"></span>
 *      <span class="article-name">Article name</span>
 *      <span class="article-status">pending</span>
 *      <span class="article-date">date create</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
(async () => {
    const articles = await getArticles();
    
    if (articles.length) {
      const div = document.getElementById('articles');
      const loadingDiv = div.childNodes[1];
  
      const ul = document.createElement('ul');
  
      // replace 'loading...' with list
      div.replaceChild(ul, loadingDiv); // <- order is important here!
  
      // create the list
      articles.map((article) => {
        // building blocks
        const li = document.createElement('li');
        li.className = 'article-item';
        const block = document.createElement('div');
        block.className = 'article-item-block';
  
        //   content
        const checkboxSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'article-checkbox';
        checkboxSpan.appendChild(checkbox);
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'article-name';
        nameSpan.innerText = article.article_name;
  
        const statusSpan = document.createElement('span');
        statusSpan.className = 'article-author';
        statusSpan.innerText = article.author;
  
        // const dateSpan = document.createElement('span');
        // dateSpan.className = 'article-date';
        // dateSpan.innerText = article.created_date;
  
        // add list item
        block.appendChild(checkboxSpan);
        block.appendChild(nameSpan);
        block.appendChild(statusSpan);
        
        li.appendChild(block);
        ul.appendChild(li);
      });
    }
  })();
  