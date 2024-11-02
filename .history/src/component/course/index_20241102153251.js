import React, { useState } from 'react';

const TodoCourse: React.FC = () => {
    // Create state `count` with initial value of 0
    const[course,setCourse]= useState(0);

    // Function to increase the count
    const handleIncrement = () => setCourse(course + 1);

    // Function resets count to 0
    const handleReset = () => setCourse(0);

    return (
        <div className="p-5">
            <h1 className="mb-3">Số lần nhấp : {course}</h1>
            <button  onClick={handleIncrement} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Button</button>
            <button
            onClick={handleReset}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Đặt lại
            </button>
        </div>
    )
}
export default TodoCourse;