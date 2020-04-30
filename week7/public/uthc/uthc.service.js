/**
 * @class UTHC
 *
 * Creates a list of articles and updates a list
 */

class UTHC {
    articles = [];
    articlesService;
  
    constructor(articlesService) {
      this.articlesService = articlesService;
    }
  
    init() {
      this.render();
    }
  
    /**
     * DOM renderer for building the list row item.
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
    _renderListRowItem = (article) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `article-${article.article_id}`;
      listGroupItem.className = 'list-group-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.id = 'delete-btn';
      deleteBtn.className = 'btn btn-secondary';
      deleteBtn.addEventListener('click', this._deleteEventHandler(article.article_id));
      deleteBtn.appendChild(deleteBtnTxt);
  
      const articleNameSpan = document.createElement('span');
      const articleName = document.createTextNode(article.article_name);
      articleNameSpan.appendChild(articleName);
  
      const articleAuthorSpan = document.createElement('span');
      const articleAuthor = document.createTextNode(article.author);
      articleAuthorSpan.append(articleAuthor);
  
      // add list item's details
      listGroupItem.append(deleteBtn);
      listGroupItem.append(articleNameSpan);
      listGroupItem.append(articleAuthorSpan);
  
      return listGroupItem;
    };
  
    /**
     * DOM renderer for assembling the list items then mounting them to a parent node.
     */
    _renderList = () => {
      // get the "Loading..." text node from parent element
      const articlesDiv = document.getElementById('articles');
      const loadingDiv = articlesDiv.childNodes[0];
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'articles-list';
      ul.className = 'list-group list-group-flush checked-list-box';
  
      this.articles.map((article) => {
        const listGroupRowItem = this._renderListRowItem(article);
  
        // add entire list item
        ul.appendChild(listGroupRowItem);
      });
  
      fragment.appendChild(ul);
      articlesDiv.replaceChild(fragment, loadingDiv);
    };
  
    /**
     * DOM renderer for displaying a default message when a user has an empty list.
     */
    _renderMsg = () => {
      const articlesDiv = document.getElementById('articles');
      const loadingDiv = articlesDiv.childNodes[0];
      const listParent = document.getElementById('articles-list');
      const msgDiv = this._createMsgElement('Create some new articles!');
  
      if (articlesDiv) {
        articlesDiv.replaceChild(msgDiv, loadingDiv);
      } else {
        articlesDiv.replaceChild(msgDiv, listParent);
      }
    };
  
    /**
     * Pure function for adding a article.
     *
     * @param {Object} newArticle - form's values as an object
     */
    addArticle = async (newArticle) => {
      try {
        const { article_name, author } = newArticle;
        await this.articlesService.addArticle({ article_name, author }); // we just want the name and author
        this.articles.push(newArticle); // push article with all it parts
      } catch (err) {
        console.log(err);
        alert('Unable to add article. Please try again later.');
      }
    };
  
    /**
     * DOM Event handler helper for adding a article to the DOM.
     *
     * @param {number} articleId - id of the article to delete
     */
    _addArticleEventHandler = () => {
      const articleInput = document.getElementById('formInputArticleName');
      const article_name = articleInput.value;
  
      const authorInput = document.getElementById('formInputAuthor');
      const author = authorInput.value;
  
      // validation checks
      if (!article_name) {
        alert('Please enter a article name.');
        return;
      }

      if (!author) {
        alert('Please enter an author\'s name.');
        return;
      }
  
      const article = { article_name, author }; // assemble the new article parts
      const { newArticle, newArticleEl } = this._createNewArticleEl(article); // add article to list
  
      this.addArticle(newArticle);
  
      const listParent = document.getElementById('articles-list');
  
      if (listParent) {
        listParent.appendChild(newArticleEl);
      } else {
        this._renderList();
      }
      articleInput.value = ''; // clear form text input
    };
  
    /**
     * Create the DOM element for the new article with all its parts.
     *
     * @param {Object} article - { article_name, author } partial object
     */
    _createNewArticleEl = (article) => {
      const article_id = this.articles.length;
      const newArticle = { ...article, article_id };
      const newArticleEl = this._renderListRowItem(newArticle);
  
      return { newArticle, newArticleEl };
    };
  
    /**
     * Pure function for deleting a article.
     *
     * @param {number} articleId - id for the article to be deleted
     */
    deleteArticle = async (articleId) => {
      try {
        const res = await this.articlesService.deleteArticle(articleId);
        this.articles = this.articles.filter((article) => article.article_id !== articleId);
  
        if (res !== null) {
          alert('Article deleted successfully!');
        }
        return res;
      } catch (err) {
        alert('Unable to delete article. Please try again later.');
      }
    };
  
    /**
     * DOM Event handler helper for deleting a article from the DOM.
     * This relies on a pre-existing in the list of articles.
     *
     * @param {number} articleId - id of the article to delete
     */
    _deleteEventHandler = (articleId) => () => {
      const article = document.getElementById(`article-${articleId}`);
      article.remove();
  
      this.deleteArticle(articleId).then(() => {
        if (!this.articles.length) {
          this._renderMsg();
        }
      });
    };
  
    /**
     * Creates a message div block.
     *
     * @param {string} msg - custom message to display
     */
    _createMsgElement = (msg) => {
      const msgDiv = document.createElement('div');
      const text = document.createTextNode(msg);
      msgDiv.id = 'user-message';
      msgDiv.className = 'center';
      msgDiv.appendChild(text);
  
      return msgDiv;
    };
  
    render = async () => {
      const articles = await this.articlesService.getArticles();
  
      try {
        if (articles.length) {
          this.articles = articles;
          this._renderList();
        } else {
          this._renderMsg();
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };
  }