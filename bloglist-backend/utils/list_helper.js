const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0)
		return {}

	const maxLikes = Math.max(...blogs.map(blog => blog.likes))
	const blog = blogs.find(blog => blog.likes === maxLikes)

	return {
		title: blog.title,
		author: blog.author,
		likes: blog.likes,
	}
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
