const express =  require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const tasks = await loadTasksCollection();
    res.send(await tasks.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete post
router.delete('/:id', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://Maneth:123@maneth-cloud-db.adgqj.mongodb.net/my_tasklist?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('my_tasklist').collection('mytasks');
}

module.exports = router;