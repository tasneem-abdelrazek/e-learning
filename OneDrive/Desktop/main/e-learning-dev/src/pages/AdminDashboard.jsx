import React, { useEffect, useState } from "react";
import {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../courseServiceFirebase";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Programming",
    price: "",
    tag: "Free",
    instructor: "",
    bio: "",
    email: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);

  const categories = ["Programming", "Design", "Business", "Marketing"];
  const tags = ["Free", "Paid"];

  // Fetch courses
  const fetchCourses = async (reset = false) => {
    setLoading(true);
    try {
      const snapshot = await getCourses(5, reset ? null : lastDoc);
      const newCourses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (reset) {
        setCourses(newCourses);
      } else {
        setCourses((prev) => [...prev, ...newCourses]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses(true);
  }, []);

  // Add or update a course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCourse(editingId, form);
        console.log("Course updated successfully");
      } else {
        await addCourse(form);
        console.log("Course added successfully");
      }
      setForm({
        title: "",
        description: "",
        category: "Programming",
        tag: "Free",
        price: "",
        instructor: "",
        bio: "",
        email: "",
        imageUrl: "",
        videoUrl: "",
      });
      setEditingId(null);
      fetchCourses(true);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        console.log("Course deleted");
        fetchCourses(true);
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  // Edit course
  const handleEdit = (course) => {
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      tag: course.tag,
      price: course.price || "",
      instructor: course.instructor,
      bio: course.bio,
      email: course.email,
      imageUrl: course.imageUrl || "",
      videoUrl: course.videoUrl || "",
    });
    setEditingId(course.id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Admin Dashboard
      </h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 mb-8"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Course" : "Add New Course"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Tag</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          >
            {tags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        {/* Instructor */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Instructor</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            className="w-full border rounded px-3 py-2"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        {/* Video URL */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Video URL</label>
          <input
            type="url"
            className="w-full border rounded px-3 py-2"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Courses Table */}
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">All Courses</h2>
        {courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Tag</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Instructor</th>
                <th className="p-2 border">Bio</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Video</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{course.title}</td>
                  <td className="p-2 border">{course.description}</td>
                  <td className="p-2 border">{course.category}</td>
                  <td className="p-2 border">{course.tag}</td>
                  <td className="p-2 border">${course.price}</td>
                  <td className="p-2 border">{course.instructor}</td>
                  <td className="p-2 border">{course.bio}</td>
                  <td className="p-2 border">{course.email}</td>
                  <td className="p-2 border">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-2 border">
                    {course.videoUrl ? (
                      <img
                        src={course.videoUrl}
                        alt={course.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 mb-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {lastDoc && (
          <div className="text-center mt-4">
            <button
              onClick={() => fetchCourses()}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
