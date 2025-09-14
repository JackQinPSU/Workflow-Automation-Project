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
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/upload/", {
                method: "POST",
                body: formData,
        });

        const data = await response.json();
        setResult(data.text || "No text found");
        } catch (err) {
            console.error("Upload failed:", err);
            setResult("Upload failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className="navbar">
                <div className="logo">BookMatch</div>
                <div className="menu">
                    <a href="/dashboard">Home</a>
                    <a href="">Library</a>
                    <a href="">Profile</a>
                </div>
            </div>

            <div className="upload-section">
                <p className="upload-picture ">Upload a picture!</p>

                {/* File picker */}
                <input type="file" onChange={handleFileChange} />

                {/*Upload Button*/}
                <button className="upload-button" onClick={handleUpload} disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                </button>

                {/* Result display */}
                {result && (
                    <div className="ocr-result">
                        <h3>Extracted Text:</h3>
                        <p>{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;