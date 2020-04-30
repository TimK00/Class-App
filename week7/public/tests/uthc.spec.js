const articlesService = new ArticlesService();
const uthc = new UTHC(articlesService);

describe('UTHC App', () => {
  it('should initialize some HTML', () => {
    spyOn(uthc, 'init');
    uthc.init();

    expect(uthc.init).toHaveBeenCalled();
  });

  it('should add a article', async () => {
    const newArticle = {
      article_id: 0,
      article_name: 'Third article',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const addArticleServiceSpy = spyOn(articlesService, 'addArticle');

    expect(uthc.articles.length).toBe(0);

    await uthc.addArticle(newArticle);

    expect(addArticleServiceSpy).toHaveBeenCalled();
    expect(uthc.articles.length).toBe(1);
  });

  it('should delete a article', async () => {
    const existingArticle = {
      article_id: 0,
      article_name: 'Third article',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const deleteArticleServiceSpy = spyOn(articlesService, 'deleteArticle');

    expect(uthc.articles.length).toBe(1);

    await uthc.deleteArticle(existingArticle.article_id);

    expect(deleteArticleServiceSpy).toHaveBeenCalled();
    expect(uthc.articles.length).toBe(0);
  });

  xit('should update an individual article', () => {
    // ..
  });
});