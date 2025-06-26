import { useState } from "react";
import React from "react";

export default function Homepage() {

    const [formData, setFormData] = useState({
        companyname: '',
        address: '',
        city: '',
        state: '',
        GSTNumber: ''
    });
    
    const [contactData, setContactData] = useState([]);
    const [currentContact, setCurrentContact] = useState({
        personName: '',
        email: '',
        phoneNumber: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleContactInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentContact(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const addContact = () => {
        if (currentContact.personName && currentContact.email && currentContact.phoneNumber) {
            if (editingIndex >= 0) {
                // Update existing contact
                const updatedContacts = [...contactData];
                updatedContacts[editingIndex] = currentContact;
                setContactData(updatedContacts);
                setEditingIndex(-1);
            } else {
                // Add new contact
                setContactData([...contactData, currentContact]);
            }
            
            // Reset form
            setCurrentContact({
                personName: '',
                email: '',
                phoneNumber: '',
                date: new Date().toISOString().split('T')[0]
            });
        } else {
            alert('Please fill all contact fields');
        }
    }

    const editContact = (index) => {
        setCurrentContact(contactData[index]);
        setEditingIndex(index);
    }

    const deleteContact = (index) => {
        const updatedContacts = contactData.filter((_, i) => i !== index);
        setContactData(updatedContacts);
    }

    const cancelEdit = () => {
        setCurrentContact({
            personName: '',
            email: '',
            phoneNumber: '',
            date: new Date().toISOString().split('T')[0]
        });
        setEditingIndex(-1);
    }

    const states = [
        'Select State',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ]

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-semibold text-gray-800">Company Details</h1>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <input
                                    type="text"
                                    name="companyname"
                                    placeholder="Company Name"
                                    value={formData.companyname}
                                    onChange={handleInputchange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Company Address"
                                    value={formData.address}
                                    onChange={handleInputchange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleInputchange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="GSTNumber"
                                    placeholder="GST Number"
                                    value={formData.GSTNumber}
                                    onChange={handleInputchange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <select name="state" value={formData.state} onChange={handleInputchange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                >
                                    {states.map((state, index) => (
                                        <option key={index} value={state === "Select State" ? "" : state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="border-b border-gray-200 pb-2 mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Contact Person</h2>
                            </div>
                            
                            {/* Contact Input Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div>
                                    <input
                                        type="text"
                                        name="personName"
                                        placeholder="Person Name"
                                        value={currentContact.personName}
                                        onChange={handleContactInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={currentContact.email}
                                        onChange={handleContactInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={currentContact.phoneNumber}
                                        onChange={handleContactInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        name="date"
                                        value={currentContact.date}
                                        onChange={handleContactInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-6">
                                <button 
                                    type="button" 
                                    onClick={addContact}
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                                >
                                    {editingIndex >= 0 ? 'Update Contact' : 'Add Contact'}
                                </button>
                                {editingIndex >= 0 && (
                                    <button 
                                        type="button" 
                                        onClick={cancelEdit}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                            {/* Contact Table */}
                            {contactData.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">S.No</th>
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Person Name</th>
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Phone Number</th>
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactData.map((contact, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-3">{contact.personName}</td>
                                                    <td className="border border-gray-300 px-4 py-3">{contact.email}</td>
                                                    <td className="border border-gray-300 px-4 py-3">{contact.phoneNumber}</td>
                                                    <td className="border border-gray-300 px-4 py-3">{contact.date}</td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => editContact(index)}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => deleteContact(index)}
                                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
                                >
                                    Save Company Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}