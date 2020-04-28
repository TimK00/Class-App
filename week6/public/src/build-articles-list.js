/**
 * @class ArticleList
 *
 * Creates a list of articles and updates a list
 */

class ArticleList {
  articles = [];

  constructor() {}

  /**
   * Build article list parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createArticleListParent = () => {
    const ul = document.createElement('ul');
    ul.id = 'articles-list';
    ul.className = 'list-group list-group-flush checked-list-box';
    return ul;
  };

  _deleteEventHandler = (articleId) => async () => {
    if (articleId) {
      const res = await deleteArticle(articleId);

      if (res !== null) {
        this.articles = this.articles.filter((article) => article.article_id !== articleId);
        const article = document.getElementById(`article-${articleId}`);
        article.remove();

        if (!this.articles.length) {
          const div = document.getElementById('articles');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('Create some new articles!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  /**
   * Builds the list item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteArticle(e, index)">X</button>
   *   <span>Article name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  buildArticleListRowItem = (article) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `article-${article.article_id}`; // article-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(article.article_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const articleNameSpan = document.createElement('span');
    const articleName = document.createTextNode(article.article_name);
    articleNameSpan.appendChild(articleName);

    const articleAuthorSpan = document.createElement('span');
    const articleAuthor = document.createTextNode(article.author);
    articleAuthorSpan.appendChild(articleAuthor);


    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(articleNameSpan);
    listGroupItem.append(articleAuthorSpan);

    return listGroupItem;
  };

  /**
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildArticlesList = (mount, articles) =>
    articles.map((article) => {
      const listGroupRowItem = this.buildArticleListRowItem(article);

      // add entire list item
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateArticles = async () => {
    const res = await getArticles();
    const div = document.getElementById('articles');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.articles = res;
      const articlesDiv = this.createArticleListParent();
      this.buildArticlesList(articlesDiv, res);
      div.replaceChild(articlesDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new ArticleList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateArticles();
})();
