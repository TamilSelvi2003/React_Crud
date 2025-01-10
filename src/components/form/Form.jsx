import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, editStudent } from '../../redux/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './form.css';


const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    image:'',
    email: '',
    contact: '',
    city: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    if (id) {
      const student = students.find((student) => student.id === parseInt(id));
      if (student) {
        setFormData(student);
      } else {
        navigate('/');
      }
    }
  }, [id, students, navigate]);


  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Valid 10-digit contact number is required';
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors.');
      return;
    }
  
    const student = {
      id: id ? parseInt(id) : Date.now(),
      ...formData,
      image: file ? URL.createObjectURL(file) : '', // Convert file to a URL
    };
  
    if (id) {
      dispatch(editStudent(student));
      toast.success('Student updated successfully!');
    } else {
      dispatch(addStudent(student));
      toast.success('Student added successfully!');
    }
  
    navigate('/');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'application/pdf'];
  if (selectedFile && allowedTypes.includes(selectedFile.type)) {
    setFile(selectedFile);
  } else {
    toast.error('Invalid file format. Only PDF, PNG, JPG, SVG, JPEG are allowed.');
  }
};


  return (
    <div className='for'>
      <h2 className='addstd'>{id ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <button onClick={() => navigate('/')}>X</button>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />
        <br />
        <input
          type="file"
           name="image"
          accept=".pdf, .png, .jpg, .svg, .jpeg"
          onChange={handleFileChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        <br />
       
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
        />
        {errors.contact && <span style={{ color: 'red' }}>{errors.contact}</span>}
        <br />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default Form;


