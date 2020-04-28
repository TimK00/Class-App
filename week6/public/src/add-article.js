/**
 * AJAX add new articles to article list on save.
 */
const doAddArticle = async (e) => {
    e.preventDefault();
  
    const articleInput = document.getElementById('formInputArticleName');
    const article_name = articleInput.value;
    const authorSelect = document.getElementById('formInputAuthor');
    const author = authorSelect.value;
  
    if (!article_name) {
      alert('Please enter a article name.');
      return;
    }
  
    const res = await addArticle({ article_name, author });
  
    if (res !== null) {
      inst.generateArticles();
    }
    articleInput.value = '';
  };
  