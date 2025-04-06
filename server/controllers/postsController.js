const {
    getPostById, 
    getAllPosts, 
    createNewPost, 
    deletePostById, 
    updatePostById,
    countAllPosts
} = require('../models/Post')

const getPosts = async (req, res)=>{
    try {
        const sort = req.query.sort || 'time'
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const search = req.query.search || null
        let tsQuery = null;
        if (search !== null) {
            const decodedSearch = decodeURIComponent(search);
            tsQuery = decodedSearch
                .split(/\s+/)
                .filter(term => term.length > 0)
                .join(' & ');
        }
        const offset = (page) * limit
        const posts = await getAllPosts(tsQuery, limit, sort, offset)
        const totalPosts = posts.length > 0 ? parseInt(posts[0].total_count) : 0;
        const totalPages = Math.ceil(totalPosts / limit)
        res.json({
            posts,
            totalPages
        })
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({err:error.message})
    }
}

const createPost = async(req, res)=> {
    try {
        const {title, content, media_url} = req.body
        const newPost = await createNewPost(title, content, media_url)
        res.json(newPost)
    } catch (err) {
        console.error('Ошибка SQL:', err); 
        res.status(500).json({ error: err.message });
      }
}

const deletePost = async(req, res)=>{
    try {
        await deletePostById(req.params.id)
        res.status(204).end()
    } catch (error) {
        console.log('Delete error: ', error)
        res.status(500).json({error:error.message})
    }
}

const getPost = async(req, res)=>{
    try {
        const post = await getPostById(req.params.id)
        res.json(post)
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({err:error.message})
    }
}

const updatePost = async(req, res)=>{
    try {
        // 1. Валидация входящих данных
        const { title, content, media_url } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // 2. Обновление и возврат полной записи
        const updatedPost = await updatePostById(
            req.params.id,
            title,
            content,
            media_url || null // Обработка отсутствия media_url
        );

        // 3. Проверка существования поста
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // 4. Форматирование ответа
        res.json({
            post_id: updatedPost.post_id,
            title: updatedPost.title,
            content: updatedPost.content,
            media_url: updatedPost.media_url,
            updated_at: updatedPost.updated_at
        });
        
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPosts, getPost, deletePost, createPost, updatePost
}