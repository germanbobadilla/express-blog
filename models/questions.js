const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		snippet: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

// the name of the model should be in title of the collection name
// FE, 'Question' will look for 'questions' collection in the db
const Blog = mongoose.model('Question', blogSchema);
module.exports = Blog;
