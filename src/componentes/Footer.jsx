import React from "react";
import "./testing.css";

export default function footer() {

  return (
    <div className='footer'>
      <div className='contact-me'>
          <h1> تم انشاء الموقع </h1>
          <p> اشكر كل من علمنى و ساندنى بخبرته و معلوماته و شاركنى اياها بشكل مجانى لكى استطيع المضى قدما فى البحث عن غاياتى و اهدافى , اسأل الله التوفيق لى و لكم  </p>
      </div>
      <div className='contact-me'>
          <div>
              <h2> أ / محمد عبد الغنى </h2>
              <h3> تليفون و واتس : 01023853105 </h3>
          </div>
          <ul className='links' >
              <li className='link'><i className="bi bi-facebook"></i></li>
              <li className='link'><i className="bi bi-linkedin"></i></li>
              <li className='link'><i className="bi bi-github"></i></li>
              <li className='link'><i className="bi bi-whatsapp"></i></li>
          </ul>
      </div>
    </div>
  );
}
