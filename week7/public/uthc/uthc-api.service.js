const ARTICLES_API = `${BASE_API_URL}/articles`; // http://localhost:3000/api/articles

class ArticlesService {
  getArticles = () => _get(ARTICLES_API, OPTIONS_WITH_AUTH);

  addArticle = (formData) => _post(ARTICLES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteArticle = (articleId) => _delete(`${ARTICLES_API}/${articleId}`, OPTIONS_WITH_AUTH);
}