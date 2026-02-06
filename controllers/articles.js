const ArticleModel = require('../models/article');

class ArticleController {
    constructor() {
        this.model = ArticleModel;
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleBySlug = this.getArticleBySlug.bind(this);
    }
    
    async getAllArticles(req, res) {
        try {
            const articles = await this.model.findAll();
            res.render('index', { articles: articles });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
    
    async getArticleBySlug(req, res) {
        try {
            const slug = req.params.slug;
            const article = await this.model.findBySlug(slug);
            
            if (!article) {
                return res.status(404).send('Artiklit ei leitud');
            }
            
            res.render('article', { article: article });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ArticleController();