// import React, {useState} from "react";
import React from 'react'

function About() {
    return (
      <div className="container mt-5">
        <h2>About iNoteBook</h2>
        <p>
        Welcome to iNoteBook, your digital notebook for organizing and managing your notes effortlessly.
      </p>
        <div className="accordion" id="accordionPanelsStayOpenExample">
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <strong>Our Mission</strong>
        </button>
      </h2>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
        <div className="accordion-body">
        Our mission is to provide a user-friendly platform that empowers you to create, store, and access your notes
        anytime, anywhere. Whether you're a student, professional, or someone who loves jotting down thoughts, iNoteBook
        is here to enhance your note-taking experience.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        <strong>Key Features</strong>
        </button>
      </h2>
      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
        <div className="accordion-body">
        <ul>
        <li>Secure User Authentication: Safeguard your notes with our robust authentication system.</li>
        <li>Note Creation and Management: Easily create, edit, and delete notes as needed.</li>
        <li>Responsive Design: Access your notes from various devices, ensuring a seamless experience.</li>
        <li>User-Friendly Interface: Intuitive UI for a smooth and hassle-free note-taking process.</li>
      </ul>
        </div>
      </div>
    </div>
  </div>
      </div>
    );
}

export default About
