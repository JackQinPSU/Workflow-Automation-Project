import React, { useState } from "react";
import './Dashboard.css';

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    //Picking a file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    //upload to backend
    


    return (
        <div>
            <div className="navbar">
                <div className="logo">BookMatch</div>
                <div className="menu">
                    <a href="">Home</a>
                    <a href="">Library</a>
                    <a href="">Profile</a>
                </div>
            </div>

            <div className="upload-section">
                <p className="upload-picture ">Upload a picture!</p>
                <button className="upload-button">Upload</button>
            </div>
        </div>
    );
}

export default Dashboard;