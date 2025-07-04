"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersRequest } from '../redux/user/userSlice';
import { fetchPostsRequest } from '../redux/post/postSlice';
import PostList from './PostList';

const getColor = (str) => {
  // Basit bir renk seçici (şirket adına göre)
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-pink-100 text-pink-700',
    'bg-yellow-100 text-yellow-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-teal-100 text-teal-700',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i);
  return colors[hash % colors.length];
};

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleExpand = (user) => {
    if (expandedUserId === user.id) {
      setExpandedUserId(null);
      setExpandedUser(null);
    } else {
      setExpandedUserId(user.id);
      setExpandedUser(user);
      dispatch(fetchPostsRequest(user.id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center py-8 text-lg">Loading users...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <input
        type="text"
        placeholder="Search by name or username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white dark:bg-zinc-900 text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Avatar</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Name</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Username</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Email</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Company</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">City</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Phone</th>
              <th className="py-3 px-4 text-left font-semibold text-zinc-500">Website</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-zinc-500">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <tr
                    className={`border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer ${expandedUserId === user.id ? 'bg-blue-50 dark:bg-zinc-800' : ''}`}
                    onClick={() => handleExpand(user)}
                  >
                    <td className="py-3 px-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow ${getColor(user.name)}`}>
                        {user.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-100">{user.name}</td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">@{user.username}</td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getColor(user.company?.name || '')}`}>{user.company?.name}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">{user.address?.city}</td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">{user.phone}</td>
                    <td className="py-3 px-4 text-blue-600 dark:text-blue-400 underline">{user.website}</td>
                  </tr>
                  {expandedUserId === user.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-blue-50 dark:bg-zinc-900 relative">
                        <div className="absolute top-4 right-20 z-20">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition text-xl font-bold shadow"
                            onClick={e => {
                              e.stopPropagation();
                              setExpandedUserId(null);
                              setExpandedUser(null);
                            }}
                            aria-label="Close posts"
                          >
                            ×
                          </button>
                        </div>
                        <PostList user={expandedUser} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
