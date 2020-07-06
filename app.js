const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/questions');

// last vide https://youtu.be/bxsemcrY4gQ?t=1853

const app = express();

//connecting to database url
const dbURI =
	'mongodb+srv://germanbobadilla:M@ikol1106@pitingli.rpknx.mongodb.net/pitinglidb?retryWrites=true&w=majority';
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

app.set('view engine', 'ejs');

//static
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose
app.get('/add-blog', (req, res) => {
	const blog = new Blog({
		title: 'new blog 2',
		snippet: 'about my new blog',
		body: 'more abou my new blog'
	});
	blog
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// retrieve from mongodb
app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/single-blog', (req, res) => {
	Blog.findById()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/', (req, res) => {
	const blogs = [
		{ title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
		{ title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
		{ title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' }
	];
	res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create' });
});

app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
