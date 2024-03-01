import React, { useState } from 'react';

function Poses() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const filterPoses = (poses) => {
    return poses.filter(pose => {
      return (selectedLevel === '' || pose.Level_En === selectedLevel) &&
             (selectedMuscle === '' || pose.Muscle_En === selectedMuscle);
    }).sort((a, b) => a.Pose_En.localeCompare(b.Pose_En))
      .map(pose => {
        const keyOrder = ['Pose_En', 'Sanskrit_Meaning_En', 'Spinal_En', 'Level_En', 'Description_En', 'Benefit_En'];
        const filteredPose = {};
        keyOrder.forEach(key => {
          if (pose[key] && pose[key] !== "N/A") {
            filteredPose[key] = pose[key];
          }
        });
        return {...filteredPose, Image_URL: pose.Image_URL, Sanskrit: pose.Sanskrit};
      });
  };

  const handleSearchClick = () => {
    let url = '';

    // Determine the URL based on dropdown selections
    if (!selectedLevel && !selectedMuscle) {
      url = 'https://o4v4fxhpi6.execute-api.us-east-2.amazonaws.com/test/backend?table=yoga_table';
    } else {
      url = 'https://o4v4fxhpi6.execute-api.us-east-2.amazonaws.com/test/backend2?table=yoga_table';
      if (selectedLevel) {
        url += `&Level_En=${encodeURIComponent(selectedLevel)}`;
      }
      if (selectedMuscle) {
        url += `&Muscle_En=${encodeURIComponent(selectedMuscle)}`;
      }
    }

    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        const data = responseData.body ? JSON.parse(responseData.body) : responseData;
        const processedPoses = filterPoses(data);
        setFilteredPoses(processedPoses);
        setHasSearched(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className="search-header">
        <div className="search-bar">
          <label htmlFor="levelSelect">Level</label>
          <select
            id="levelSelect"
            onChange={e => setSelectedLevel(e.target.value)}
            value={selectedLevel}
          >
            <option value="">All Levels</option>
            <option value="Beginning">Beginning</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label htmlFor="muscleSelect">Muscle</label>
          <select
            id="muscleSelect"
            onChange={e => setSelectedMuscle(e.target.value)}
            value={selectedMuscle}
          >
            <option value="">All Muscles</option>
            <option value="Lower body">Lower body</option>
            <option value="Whole body">Whole body</option>
            <option value="Upper body">Upper body</option>
          </select>

          <button onClick={handleSearchClick}>Search</button>
        </div>
        {!hasSearched && <p className="search-guide">Select options and click search to find poses</p>}
      </div>

      <div className="poses-container">
        {filteredPoses.map((pose, index) => (
          <div key={index} className="pose-card">
            <h2 className="sanskrit-name">{pose.Sanskrit}</h2>
            <img src={pose.Image_URL} alt={pose.Pose_En} className="pose-image" />
            <div className="pose-details">
              {Object.entries(pose).filter(([key,]) => key !== 'Image_URL' && key !== 'Sanskrit').map(([key, value]) => (
                <div key={key} className="pose-detail">
                  <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poses;
