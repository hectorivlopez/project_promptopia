'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";



const UserProfile = ({params}) => {
	const searchParams = useSearchParams();
	const username = searchParams.get('user');
	
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/prompt`);
			const data = await response.json();

			setPosts(data);
		}

		fetchPosts();
	}, []);

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username} profile page`}
			data={posts}
	
		/>
	)
}

export default UserProfile