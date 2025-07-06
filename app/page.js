"use client";
import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";


const Page = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [maintask, setMaintask] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to add:", { task, description });
      const docRef = await addDoc(collection(db, "tasks"), { Task: task, Description: description });
      console.log("Document written with ID: ", docRef.id);

      // Update UI immediately without re-fetching
      setMaintask([...maintask, { id: docRef.id, Task: task, Description: description }]);
      setTask("");
      setDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deletehandler = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setMaintask(maintask.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setMaintask(tasksArray);
    };
    fetchTasks();
  }, []);

  let rendertask = <h2 className="text-center text-xl text-gray-600">No Task Available</h2>;

  if (maintask.length > 0) {
    rendertask = maintask.map((t, i) => {
      return (
        <li
          key={t.id}
          className='flex flex-col md:flex-row items-center justify-between mb-4 p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow'
        >
          <div className='flex flex-col md:flex-row md:items-center justify-between w-full mb-2 md:mb-0'>
            <h5 className='text-lg font-semibold text-gray-800 md:mr-4'>{t.Task}</h5>
            <h6 className='text-base text-gray-600 mr-10'>{t.Description}</h6>
          </div>
          <button
            onClick={() => deletehandler(t.id)}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors mt-2 md:mt-0'
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 flex flex-col items-center">
      <h1 className='bg-black text-white text-4xl md:text-5xl font-bold text-center p-5 rounded-xl shadow-lg mb-6'>
        TODO LIST
      </h1>

      <form onSubmit={submit} className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-4 mb-8">
        <input
          type='text'
          className='text-lg border-gray-400 border-2 rounded-xl px-4 py-2 w-72 focus:outline-none focus:border-blue-500 transition-colors'
          placeholder='Enter Task here'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type='text'
          className='text-lg border-gray-400 border-2 rounded-xl px-4 py-2 w-72 focus:outline-none focus:border-blue-500 transition-colors'
          placeholder='Enter Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className='bg-black hover:bg-gray-800 text-white px-6 py-2 text-lg font-semibold rounded-xl transition-colors'
        >
          Add Task
        </button>
      </form>

      <hr className="w-full max-w-2xl border-gray-300 mb-8" />

      <div className='p-4 w-full max-w-2xl'>
        <ul className="space-y-4">
          {rendertask}
        </ul>
      </div>
    </div>
  );
};

export default Page;
