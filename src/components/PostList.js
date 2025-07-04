"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPostRequest, deletePostRequest, updatePostRequest } from '../redux/post/postSlice';

const PostList = ({ user }) => {
  const { posts, loading, error, adding, addError } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  if (!user) return null;
  if (loading) return <div className="text-center py-8 text-lg">Loading posts...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    dispatch(addPostRequest({ userId: user.id, title, body }));
    setTitle("");
    setBody("");
  };

  const handleDelete = (postId) => {
    dispatch(deletePostRequest(postId));
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editBody.trim()) return;
    dispatch(updatePostRequest({ id: editId, title: editTitle, body: editBody }));
    setEditId(null);
    setEditTitle("");
    setEditBody("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditBody("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h3 className="text-xl font-bold mb-4 text-center">Posts by {user.name}</h3>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
        <button
          type="submit"
          disabled={adding}
          className="self-end px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {adding ? "Adding..." : "Add Post"}
        </button>
        {addError && <div className="text-red-500 text-sm mt-1">{addError}</div>}
      </form>
      {posts.length === 0 ? (
        <div className="text-center text-zinc-500">No posts found for this user.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition relative"
            >
              <button
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition text-lg font-bold shadow"
                onClick={() => handleDelete(post.id)}
                aria-label="Delete post"
              >
                🗑
              </button>
              <button
                className="absolute top-3 right-14 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-blue-500 hover:text-white transition text-lg font-bold shadow"
                onClick={() => handleEdit(post)}
                aria-label="Edit post"
              >
                ✏️
              </button>
              {editId === post.id ? (
                <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      type="submit"
                      className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-1 rounded bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="font-semibold text-lg text-zinc-800 dark:text-zinc-100 mb-2">{post.title}</div>
                  <div className="text-zinc-600 dark:text-zinc-300 text-sm">{post.body}</div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList; 