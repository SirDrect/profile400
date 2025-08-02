// File: src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { Link } from "react-router-dom";

function Home() {
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const projectsRef = ref(db, "projects");
    const commentsRef = ref(db, "comments");

    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.values(data);
      setProjects(loaded);
    });

    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val,
      }));
      setComments(loaded);
    });
  }, []);

  const handleComment = () => {
    if (!commentName || !commentText) return;
    const commentRef = ref(db, `comments/${Date.now()}`);
    commentRef.set({ name: commentName, text: commentText });
    setCommentName("");
    setCommentText("");
  };

  const deleteComment = (id) => {
    const commentRef = ref(db, `comments/${id}`);
    remove(commentRef);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">👤 Cyber Froly Profile 🥷</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">🧠 Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded mb-2">
              <h3 className="text-xl">{p.name}</h3>
              <p>{p.comment}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">💬 Comments</h2>
          <div className="space-y-2 mb-4">
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-800 p-3 rounded flex justify-between">
                <div>
                  <strong>{c.name}</strong>: {c.text}
                </div>
                <button onClick={() => deleteComment(c.id)} className="text-red-500">🗑️</button>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded bg-gray-700 mr-2"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Comment"
            className="p-2 rounded bg-gray-700 mr-2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleComment} className="p-2 bg-green-600 rounded">Post</button>
        </div>

        <Link to="/add" className="text-blue-400 underline">➕ Add Project</Link>
      </div>
    </div>
  );
}

export default Home;
