'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(false);

  const handleSearchChange = (event) => {
    const userSearch = event.target.value;
    setSearchText(userSearch);
    setFilterTerm(userSearch);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // console.log(posts);

    const filteredPosts = posts.filter((post) =>
      post.prompt.includes(searchText)
    );

    const filteredTags = posts.filter((post) => post.tag.includes(searchText));

    setSearchText('');
    const filteredTagsAndPosts = new Set([...filteredPosts, ...filteredTags]);

    setPosts([...filteredTagsAndPosts]);
    setFilteredPosts(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   console.log('posts have changed!');
  // }, [posts]);

  return (
    <section className="feed">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex-center"
      >
        <div className="w-full block">
          <input
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
          {filteredPosts && (
            <button className="filter_btn">Clear filter: {filterTerm}</button>
          )}
        </div>
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
