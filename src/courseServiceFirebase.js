import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";

const coursesRef = collection(db, "courses");

// Add new course
export const addCourse = async (courseData) => {
  return await addDoc(coursesRef, {
    title: courseData.title,
    description: courseData.description,
    category: courseData.category,
    tag: courseData.tag,
    price: courseData.price || 0, 
    imageUrl: courseData.imageUrl || "",
    videoUrl: courseData.videoUrl || "",
    createdAt: serverTimestamp(),
  });
};

// Get courses
export const getCourses = async (pageSize = 5, lastDoc = null) => {
  let q = query(coursesRef, orderBy("createdAt", "desc"), limit(pageSize));

  if (lastDoc) {
    q = query(
      coursesRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }

  return await getDocs(q);
};

// Update course
export const updateCourse = async (id, newData) => {
  const courseDoc = doc(db, "courses", id);
  return await updateDoc(courseDoc, {
    ...newData,
    updatedAt: serverTimestamp(),
  });
};

// Delete course
export const deleteCourse = async (id) => {
  const courseDoc = doc(db, "courses", id);
  return await deleteDoc(courseDoc);
};
