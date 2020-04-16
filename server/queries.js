mongoose = require('mongoose');
config = require('./config/config.js');
User = require('./models/User.js');
thread = require('./models/Threads.js');

// This file is for testing saving dummy users and dummy forum posts to database
mongoose.connect(config.db.uri, {useNewUrlParser: true});

var alex = new User({
    username: "@Alex",
    email : "alex3214@gmail.com",
    password : "animal",
    method : "Email"
});

var joe = new User({
    username: "@JoeB321",
    email : "JoeBerner@yahoo.com",
    password : "werewolf",
    method : "Google"
})

var Adrian = new User ({
    username : "@AdCh21",
    email : "Adrianchase@gmail.com",
    password : "mocity713",
    method : "Google"
})

var Chelsea = new User ({
    username : "@Chelsters349",
    email : "chelsealion@hotmail.com",
    password : "warofroses",
    method : "Facebook"
})

var post = new thread({
    title: "New Recipe",
    user_id: Chelsea._id,
    user  : Chelsea.username,
    body : "Hi y'all! I'm looking for some recommendations on recipes for treating back rashes.",
    likes : 344,
    tags : [
        { tag : "Back" },
        {tag : "Rash" },
        {tag : "Recipe"}
    ],
    replies: [{
        text: "I'd definitely say try using aloe vera and tea tree oil.",
        likes : 40,
        user: Adrian.username
    }, {
        text: "Thanks so much, I'll try that right away!",
        likes : 15,
        user: Chelsea.username
    }]
})

var post_two = new thread ({
        title: "Life Update",
        user_id: joe._id,
        user : joe.username,
        body : "Hello everyone, just wanted to say always remember that every day alive is a new day to accomplish a goal so never waste it!",
        likes : 540,
        tags : [
            { tag : "Life" },
            { tag : "Positivity" },
            { tag : "Goals" }
        ],
        replies: [{
            text: "Love the positivity!",
            likes : 20,
            user: alex.username
        }, {
            text: "Thanks bro",
            likes : 10,
            user: joe.username
        }]
})

var post_three = new thread ({
    title: "Books for Herbs and Medicine",
    user_id: joe._id,
    user : joe.username,
    body : "Anyone know any great books for herbs and medicine?",
    likes : 60,
    tags : [
        { tag : "Herbs" },
        { tag : "Medicine" }
    ],
    replies: [{
        text: "I would recommend the 'Herbal Medicine for Beginners: Your Guide to Healing Common Ailments with 35 Medicinal Herbs' by Katja Swift and Ryn Midura",
        likes : 37,
        user: Adrian.username
    }]
})

var post_four = new thread ({
    title: "Recipe for Lower Back Pains",
    user_id: alex._id,
    user : alex.username,
    body : "Hi everyone, I just wanted to inform you about this new recipe that I discovered that does wonders for aches and pains in your lower back. Here's the link",
    likes : 540,
    tags : [
        { tag : "Lower Back" },
        { tag : "Aches" },
        { tag : "Pain relief" }
    ]
})

/*post_two.save(function(error) {
    if (!error) {
        thread.find({})
            .populate('user')
            .populate('replies.user')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            })
    }
}); */

/* post_three.save(function(error) {
    if (!error) {
        thread.find({})
            .populate('user')
            .populate('replies.user')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            })
    }
}); */

post_four.save(function(error) {
    if (!error) {
        thread.find({})
            .populate('user')
            .populate('replies.user')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            })
    }
});

//Adrian.save();
//Chelsea.save();