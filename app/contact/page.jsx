'use client'
import React, { useState } from 'react';


const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has been submitted!");
        setFormData({ name: '', email: '', message: '' }); // Reset form
    };

    return (
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">If you have any queries or need assistance, feel free to reach out.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Write your message..."
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900">
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default ContactSection;
