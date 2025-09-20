/* eslint-disable no-unused-vars */
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

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  const categories = ["Programming", "Design", "Business", "Marketing"];
  const tags = ["Free", "Paid"];

  // Validation
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "title":
        if (!value.trim()) error = "Title is required";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        break;
      case "price":
        if (form.tag === "Paid") {
          if (!value.trim()) {
            error = "Price is required for paid courses";
          } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            error = "Price must be a valid number";
          } else if (parseFloat(value) <= 0) {
            error = "Price must be greater than 0 for paid courses";
          }
        }
        break;
      case "instructor":
        if (!value.trim()) error = "Instructor name is required";
        break;
      case "bio":
        if (!value.trim()) error = "Bio is required";
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "imageUrl":
        if (!value.trim()) {
          error = "Image URL is required";
        } else if (!/^https?:\/\/.+/i.test(value)) {
          error = "Image URL must start with https";
        }
        break;
      case "videoUrl":
        if (!value.trim()) {
          error = "Video URL is required";
        } else if (!/^https?:\/\/.+/i.test(value)) {
          error = "Video URL must start with https";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  // Reset price if Free
  useEffect(() => {
    if (form.tag === "Free") {
      setForm((prev) => ({ ...prev, price: "" }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.price;
        return newErrors;
      });
    }
  }, [form.tag]);

  // Fetch courses
  const fetchCourses = async (reset = false) => {
    setLoading(true);
    try {
      const snapshot = await getCourses(5, reset ? null : lastDoc);
      const newCourses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (reset) setCourses(newCourses);
      else setCourses((prev) => [...prev, ...newCourses]);

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (err) {
      setPopup({
        show: true,
        type: "error",
        message: "Error fetching courses. Please try again.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      if (editingId) {
        await updateCourse(editingId, form);
        setPopup({ show: true, type: "success", message: "Course updated successfully!" });
      } else {
        await addCourse(form);
        setPopup({ show: true, type: "success", message: "Course added successfully!" });
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
      setPopup({ show: true, type: "error", message: "Error saving course. Please try again." });
    }
  };

  const handleDelete = (id) => {
    setPopup({
      show: true,
      type: "confirm",
      message: "Do you really want to delete this course?",
      onConfirm: async () => {
        try {
          await deleteCourse(id);
          setPopup({ show: true, type: "success", message: "Course deleted successfully!" });
          fetchCourses(true);
        } catch (err) {
          setPopup({ show: true, type: "error", message: "Error deleting course. Please try again." });
        }
      },
    });
  };

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
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Admin Dashboard</h1>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Course" : "Add New Course"}</h2>

        {[
          { label: "Title", field: "title", type: "text" },
          { label: "Description", field: "description", type: "textarea" },
          { label: "Category", field: "category", type: "select", options: categories },
          { label: "Tag", field: "tag", type: "select", options: tags },
          { label: "Price", field: "price", type: "text", disabledIf: "Free" },
          { label: "Instructor", field: "instructor", type: "text" },
          { label: "Bio", field: "bio", type: "textarea" },
          { label: "Email", field: "email", type: "email" },
          { label: "Image URL", field: "imageUrl", type: "text" },
          { label: "Video URL", field: "videoUrl", type: "text" },
        ].map((item) => (
          <div key={item.field} className="mb-4">
            <label className="block mb-1 font-medium">{item.label}</label>
            {item.type === "textarea" ? (
              <textarea
                className="w-full border rounded px-3 py-2"
                value={form[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
              />
            ) : item.type === "select" ? (
              <select
                className="w-full border rounded px-3 py-2"
                value={form[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
              >
                {item.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={item.type}
                className="w-full border rounded px-3 py-2"
                value={form[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                disabled={item.disabledIf && form[item.field] === item.disabledIf}
              />
            )}
            {errors[item.field] && (
              <p className="text-red-500 text-sm">{errors[item.field]}</p>
            )}
          </div>
        ))}

        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
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
                {["Title", "Description", "Category", "Tag", "Price", "Instructor", "Bio", "Email", "Image", "Video", "Actions"].map((col) => (
                  <th key={col} className="p-2 border">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{course.title}</td>
                  <td className="p-2 border">{course.description}</td>
                  <td className="p-2 border">{course.category}</td>
                  <td className="p-2 border">{course.tag}</td>
                  <td className="p-2 border">{course.tag === "Paid" ? `$${course.price}` : "Free"}</td>
                  <td className="p-2 border">{course.instructor}</td>
                  <td className="p-2 border">{course.bio}</td>
                  <td className="p-2 border">{course.email}</td>
                  <td className="p-2 border">
                    {course.imageUrl ? <img src={course.imageUrl} alt={course.title} className="h-12 w-12 object-cover rounded" /> : "N/A"}
                  </td>
                  <td className="p-2 border">
                    {course.videoUrl ? <a href={course.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch Video</a> : "N/A"}
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(course.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className={`text-xl font-bold mb-4 ${popup.type === "success" ? "text-green-600" : popup.type === "error" ? "text-red-600" : "text-yellow-600"}`}>
              {popup.type === "confirm" ? "Are you sure?" : popup.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="mb-6">{popup.message}</p>
            <div className="flex justify-center gap-4">
              {popup.type === "confirm" ? (
                <>
                  <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setPopup({ ...popup, show: false })}>Cancel</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => { if (popup.onConfirm) popup.onConfirm(); setPopup({ ...popup, show: false }); }}>Delete</button>
                </>
              ) : (
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setPopup({ ...popup, show: false })}>OK</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
