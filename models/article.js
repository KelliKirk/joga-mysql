const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }
    
    async findBySlug(slug) {
        const query = `SELECT * FROM ${this.tableName} WHERE slug = ?`;
        const results = await this.executeQuery(query, [slug]);
        return results[0];
    }

    async findMany(where, value) {
        return await super.findMany(where, value);
    }  
}

module.exports = new ArticleModel();