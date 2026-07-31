import { useState } from "react";
import { useParams } from "react-router-dom";


function ComplaintDetails() {
  const { id } = useParams();

  const complaints = [
    {
      id: 1,
      student: "Naveen",
      title: "WiFi Not Working",
      category: "WiFi",
      location: "Block A",
      priority: "High",
      status: "Pending",
      description: "College WiFi is not working properly in the classroom.",
    },
    {
      id: 2,
      student: "Rahul",
      title: "Water Leakage",
      category: "Hostel",
      location: "Hostel Block B",
      priority: "Medium",
      status: "In Progress",
      description: "Water leakage near Hostel Room 203.",
    },
    {
      id: 3,
      student: "Priya",
      title: "Fan Not Working",
      category: "Classroom",
      location: "Room 105",
      priority: "Low",
      status: "Resolved",
      description: "Ceiling fan is not working.",
    },
  ];

  const complaint = complaints.find(
    (item) => item.id === parseInt(id)
  );

  const [remarks, setRemarks] = useState("");
  const [savedRemarks, setSavedRemarks] = useState("");

  const handleSave = () => {
    setSavedRemarks(remarks);
  };

  if (!complaint) {
    return <h2>Complaint Not Found</h2>;
  }

  return (
    <div className="complaint-details">
      <h1>Complaint Details</h1>

      <div className="details-card">
        <p><strong>Student:</strong> {complaint.student}</p>
        <p><strong>Title:</strong> {complaint.title}</p>
        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Location:</strong> {complaint.location}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>
        <p><strong>Status:</strong> {complaint.status}</p>

        <h3>Description</h3>
        <p>{complaint.description}</p>

        <h3>Admin Remarks</h3>

        <textarea
          rows="4"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter remarks here..."
        ></textarea>

        <br />
        <br />

        <button onClick={handleSave}>
          Save Remarks
        </button>

        {savedRemarks && (
          <>
            <h3>Saved Remarks</h3>
            <p>{savedRemarks}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ComplaintDetails;