// components/ContactForm.js

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{width:"85%"}}>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nombre"
          className="focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "8px",
            marginBottom: "20px",
            width:"100%"
            
          }}
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo electronico"
          value={formData.email}
          onChange={handleChange}
          required
          className="focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "8px",
            marginBottom: "20px",
          }}
        />
      </div>
      <div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          placeholder="Mensaje"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "8px",
            marginBottom: "20px",
          }}
        />
      </div>
      <button
        type="submit"
        className="  rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0575E6] text-white hover:text-slate-100 hover:bg-[#021B79] active:bg-[#021B79] active:text-blue-100 focus-visible:outline-[#021B79]"
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "8px",
        }}
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
