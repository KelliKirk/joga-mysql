const ArticleModel = require('../models/article');

class ArticleController {
    constructor() {
        this.model = ArticleModel;
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleBySlug = this.getArticleBySlug.bind(this);
        this.createArticle = this.createArticle.bind(this);
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
}

module.exports = new ArticleController();