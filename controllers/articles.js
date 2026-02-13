const ArticleModel = require('../models/article');

class ArticleController {
    constructor() {
        this.model = ArticleModel;
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleBySlug = this.getArticleBySlug.bind(this);
        this.createArticle = this.createArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }
    
    async getAllArticles(req, res) {
        try {
            const articles = await this.model.findAll();
            
            res.render('index', { 
                articles: articles,
                user: req.session.user
            });
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
            
            res.render('article', { 
                article: article,
                user: req.session.user
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async createArticle(req, res) {
        try {
            const articleData = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                author_id: req.body.author_id,
                published: req.body.published || new Date()
            };
            
            const newArticleId = await this.model.create(articleData);
            
            if (!newArticleId) {
                return res.status(500).json({ error: 'Artikli loomine ebaõnnestus' });
            }
            
            res.status(201).json({ 
                message: 'Artikkel edukalt loodud',
                id: newArticleId 
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            
            const articleData = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                author_id: req.body.author_id
            };
            
            const affectedRows = await this.model.update(articleId, articleData);
            
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Artiklit ei leitud' });
            }
            
            res.status(200).json({ 
                message: 'Artikkel edukalt uuendatud',
                id: articleId 
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;
            
            const affectedRows = await this.model.delete(articleId);
            
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Artiklit ei leitud' });
            }
            
            res.status(200).json({ 
                message: 'Artikkel edukalt kustutatud',
                id: articleId 
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ArticleController();