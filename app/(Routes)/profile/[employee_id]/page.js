"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SideBar from "@/app/layouts/Sidebar";
import Titlebar from "@/app/layouts/Titlebar";
import Link from "next/link";
import { FaUserEdit, FaPhone, FaEnvelope, FaBuilding, FaUserCircle, FaHeartbeat, FaBriefcase } from "react-icons/fa";

const Profile = ({ params }) => {
    const employee_id = params.employee_id;
    const [personalInfo, setPersonalInfo] = useState(null);
    const [officialInfo, setOfficialInfo] = useState(null);
    const [dependents, setDependents] = useState(null);
    const [emergencyContacts, setEmergencyContacts] = useState(null);

    useEffect(() => {
        if (employee_id) {
            fetchPersonalInfo();
            fetchOfficialInfo();
            fetchDependents();
            fetchEmergencyContact();
        }
    }, [employee_id]);

    const fetchPersonalInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/personal`, { withCredentials: true });
            setPersonalInfo(response.data);
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    };

    const fetchOfficialInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/official`, { withCredentials: true });
            setOfficialInfo(response.data);
        } catch (error) {
            console.error("Error fetching official information:", error);
        }
    };

    const fetchDependents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/dependents`, { withCredentials: true });
            setDependents(response.data);
        } catch (error) {
            console.error("Error fetching dependents information:", error);
        }
    };

    const fetchEmergencyContact = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/emergency`, { withCredentials: true });
            setEmergencyContacts(response.data);
        } catch (error) {
            console.error("Error fetching emergency contact information:", error);
        }
    };

    if (!personalInfo || !officialInfo || !dependents || !emergencyContacts) {
        return <div className="text-center py-10 text-blue-400">Loading...</div>;
    }

    return (
        <div className="ml-56 bg-gray-700 text-white min-h-screen">
            <SideBar activePanel={2} />
            <div className="flex-1">
                <div className="container mx-auto p-6 ">
                    <Titlebar title="User Profile" />
                    <h1 className="text-4xl font-semibold my-6 text-center text-blue-400">User Profile</h1>

                    <div className="flex flex-wrap lg:flex-nowrap gap-6 ">
                        {/* Left Column - Profile Picture and General Information */}
                        <div className="w-full lg:w-1/2  p-6 ">
                            <Card className="h-full flex items-center justify-center">
                                <CardContent>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={personalInfo.profile_pic || "/default-profile.png"}
                                            className="rounded-full w-48 h-48 object-cover border-4 border-blue-400 shadow-md mb-4"
                                        />
                                        <CardTitle className="text-2xl font-bold text-center mb-2 text-blue-400">
                                            {`${personalInfo.first_name} ${personalInfo.last_name}`}
                                        </CardTitle>

                                        <div className="space-y-2 text-sm text-gray-300">
                                            <p><strong><FaBriefcase className="inline text-blue-400"/> Job Title ID:</strong> {officialInfo.job_title_id}</p>
                                            <p><strong><FaPhone className="inline text-blue-400" /> Mobile:</strong> {personalInfo.phone_numbers.join(", ")}</p>
                                            <p><strong><FaBuilding className="inline text-blue-400" /> Department:</strong> {officialInfo.department_name}</p>
                                            <p><strong><FaBuilding className="inline text-blue-400" /> Branch:</strong> {officialInfo.branch_name}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Detailed Information */}
                        <div className="flex-1 space-y-4">
                            {/* Personal Information Card */}
                            <Card className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                                    <CardTitle className="text-lg font-semibold text-blue-400"><FaUserCircle className="inline mr-2"/>Personal Information</CardTitle>
                                    <Link href={`${employee_id}/edit/personal-info`} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">
                                        <FaUserEdit className="inline mr-1"/> Edit
                                    </Link>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                                    <div>
                                        <p><strong>NIC Number:</strong> {personalInfo.NIC_number}</p>
                                        <p><strong>Date of Birth:</strong> {personalInfo.birth_date}</p>
                                        <p><strong>Marital Status:</strong> {personalInfo.marital_status}</p>
                                        <p><strong>Gender:</strong> {personalInfo.gender}</p>
                                    </div>
                                    <div>
                                        <p><strong>Address:</strong> {personalInfo.address}</p>
                                        {Object.entries(personalInfo.custom_attributes).map(([key, value], index) => (
                                            <p key={index}><strong>{key}:</strong> {value}</p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Office Information Card */}
                            <Card className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                                    <CardTitle className="text-lg font-semibold text-blue-400"><FaBuilding className="inline mr-2"/>Office Information</CardTitle>
                                    <Link href={`${employee_id}/edit/job-info`} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">
                                        <FaUserEdit className="inline mr-1"/> Edit
                                    </Link>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                                    <div>
                                        <p><strong>Job Title:</strong> {officialInfo.job_title_name}</p>
                                        <p><strong>Pay Grade:</strong> {officialInfo.pay_grade_name}</p>
                                        <p><strong>Status:</strong> {officialInfo.status}</p>
                                    </div>
                                    <div>
                                        <p><strong>Supervisor:</strong> {officialInfo.supervisor_name || "N/A"}</p>
                                        <p><strong>Department:</strong> {officialInfo.department_name}</p>
                                        <p><strong>Branch:</strong> {officialInfo.branch_name}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Dependents and Emergency Contact Cards Side by Side */}
                    <div className="flex gap-4 mt-4">
                        <Card className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                            <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                                <CardTitle className="text-lg font-semibold text-blue-400"><FaHeartbeat className="inline mr-2"/>Dependents Information</CardTitle>
                                <button className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">Edit</button>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-gray-300">
                                {dependents.length > 0 ? (
                                    dependents.map((dependent, index) => (
                                        <div key={index} className="border-b border-gray-600 pb-2">
                                            <p><strong>Name:</strong> {dependent.name}</p>
                                            <p><strong>Relationship:</strong> {dependent.relationship}</p>
                                            <p><strong>Gender:</strong> {dependent.gender}</p>
                                            <p><strong>Covered by Insurance:</strong> {dependent.is_covered_by_insurance ? "Yes" : "No"}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No dependents listed.</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                            <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                                <CardTitle className="text-lg font-semibold text-blue-400"><FaPhone className="inline mr-2"/>Emergency Contacts</CardTitle>
                                <button className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">Edit</button>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-gray-300">
                                {emergencyContacts.length > 0 ? (
                                    emergencyContacts.map((contact, index) => (
                                        <div key={index} className="border-b border-gray-600 pb-2">
                                            <p><strong>Name:</strong> {contact.name}</p>
                                            <p><strong>Relationship:</strong> {contact.relationship}</p>
                                            <p><strong>Phone Number:</strong> {contact.phone_number}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No emergency contacts listed.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
