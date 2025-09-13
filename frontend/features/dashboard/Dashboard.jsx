import React from "react";


const Dashboard = () => {
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
                <p className="upload Picture ">Upload a picture!</p>
                <button className="upload button">Upload</button>
            </div>
        </div>
    );
}

export default Dashboard;