import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './user.css'

const Table = () => {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleSort = (field) => {
    setSortedField(field);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedStudents = sortedField
    ? [...filteredStudents].sort((a, b) =>
      a[sortedField].localeCompare(b[sortedField])
    )
    : filteredStudents;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <div>
      <h2>Student List</h2>
      <input
        type="text"
        placeholder="Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '50%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          margin: '10px 10px',
        }}
      />
      <Link to="/add">
        <button className='btn'>Add Student</button>
      </Link>


      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('gender')}>Gender</th>
            <th>DOB</th>
            <th>Email</th>
            <th>City</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length === 0 ? (
            <tr>
              <td colSpan="7">No students available</td>
            </tr>
          ) : (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.dob}</td>
                <td>{student.email}</td>
                <td>{student.city}</td>
                <td>{student.contact}</td>
                <td>
                  <Link to={`/add/${student.id}`}>
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(student.id)}>
                    <FaTrash />
                  </button>
                  <Link to={`/view/${student.id}`}>
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        {Array.from(
          { length: Math.ceil(filteredStudents.length / studentsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Table;