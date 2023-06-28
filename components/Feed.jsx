'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map(post => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);
	const [feedPosts, setFeedPosts] = useState([]);
	const [usernames, setUsernames] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt/all');
			const data = await response.json();

			setPosts(data);
			setFeedPosts(data)
			console.log('Primer useEffect: ', data)
		}

		fetchPosts();
	}, []);

	useEffect(() => {
		const getUsernames = () => {
			let postsUsernames = []
			for (let post of posts) {
				if (!postsUsernames.includes(post.creator.username)) {
					postsUsernames.push(post.creator.username);
				}
			}
			setUsernames(postsUsernames);
		}
		getUsernames();

		const getTags = () => {
			let postsTags = []
			for (let post of posts) {
				if (!postsTags.includes(post.tag)) {
					postsTags.push(post.tag);
				}
			}
			setTags(postsTags);
		}
		getTags();

		console.log('Segundo useEffect: ', posts)
	}, [posts])

	const searchPosts = (target) => {
		if (target === '') {
			setFeedPosts(posts);
			return
		}

		if (usernames.includes(target)) {
			const filteredPosts = posts.filter(post => post.creator.username === target)
			setFeedPosts(filteredPosts);
			return
		}

		if (tags.includes(target)) {
			const filteredPosts = posts.filter(post => post.tag === target)
			setFeedPosts(filteredPosts);
			return
		}

		const filteredPosts = posts.filter(post => post.prompt.includes(target));
		setFeedPosts(filteredPosts)
	}

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
		searchPosts(e.target.value);
	}

	const handleTagClick = (tag) => {
		setSearchText(tag);
		searchPosts(tag)
	}


	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList
				data={feedPosts}
				handleTagClick={handleTagClick}
			/> 
		</section>
	)
}

export default Feed