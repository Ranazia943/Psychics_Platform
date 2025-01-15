import React, { useState } from "react";
import usePsySignup from "../../hooks/usePsySignup";
import { Redirect } from "react-router-dom"; // Import Redirect

const PsyRegister = () => {
  const { signup, loading } = usePsySignup();
  const [currentForm, setCurrentForm] = useState(1);
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false); // State to track successful signup

  const [formData, setFormData] = useState({
    phoneno: "",
    email: "",
    username: "",
    password: "",
    profileImage:"",
    gender: "",
    birthDate: "",
    category: "",
    primarySkills: "",
    allSkills: [],
    language: "",
    chargesPerMin: "",
    videoChargesPerMin: "",
    reportCharges: "",
    experienceYears: "",
    dailyHours: "",
    referredBy: "",
    workingOnOtherPlatform: false,
    businessSource :[],
      qualification:[],
      degreeDiploma:[],
      collegeName:"",
      learnedAstrologyFrom:"",
      instagramProfile:"",
      facebookProfile:"",
      linkedInProfile:"",
      youtubeProfile:"",
      websiteProfile:"",
      minEarningExpectation :"",
      maxEarningExpectation:"",
      countriesTraveled:[],
      currentJobStatus: [],
      longBio:"",
      qualitiesOfPsychic:"",
      biggestChallenge:"",
      repeatedQuestionHandling:"",
      availability:""
  });

  const handleImageUpload = async (e) => {
    const Image = e.target.files[0];
    if (!Image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", Image);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqqejge0d/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, profileImage: data.secure_url }));
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during the image upload.");
    }
  };

  const validateForm = () => {
    if (currentForm === 1) {
      return (
        formData.username &&
        formData.email &&
        formData.password &&
        formData.phoneno &&
        formData.gender &&
        formData.profileImage
      );
    } else if (currentForm === 2) {
      return (
        formData.birthDate &&
        formData.category &&
        formData.primarySkills &&
        formData.allSkills &&
        formData.chargesPerMin &&
        formData.language &&
        formData.videoChargesPerMin &&
        formData.reportCharges &&
        formData.experienceYears &&
        formData.dailyHours &&
        formData.referredBy &&
        formData.workingOnOtherPlatform
      );
    }
    else if (currentForm === 3) {
      return (
        formData.businessSource &&
        formData.qualification &&
        formData.degreeDiploma &&
        formData.collegeName &&
        formData.learnedAstrologyFrom &&
        formData.instagramProfile &&
        formData.facebookProfile &&
        formData.linkedInProfile &&
        formData.youtubeProfile &&
        formData.websiteProfile
      );
    }
    else if (currentForm === 4) {
      return (
        formData.minEarningExpectation &&
        formData.maxEarningExpectation &&
        formData.countriesTraveled &&
        formData.currentJobStatus &&
        formData.longBio &&
        formData.qualitiesOfPsychic &&
        formData.biggestChallenge &&
        formData.repeatedQuestionHandling
      );
    }
    else if (currentForm === 5) {
      const availabilityFields = [
        "sundayAvailability", "mondayAvailability", "tuesdayAvailability",
        "wednesdayAvailability", "thursdayAvailability", "fridayAvailability", "saturdayAvailability"
      ];
  
      for (let day of availabilityFields) {
        if (formData[day]) {
          // Only check start and end time if the day is available (checkbox is checked)
          if (!formData[`${day}StartTime`] || !formData[`${day}EndTime`]) {
            console.log(`${day} start or end time is missing.`);
            return false; // Validation fails if start or end time is missing
          }
      }
    }
      return true; // If all fields are correct
    }
    
    return true;
  }   

  const availability = [
    { day: 'Sunday', fromTime: formData.sundayStartTime, toTime: formData.sundayEndTime },
    { day: 'Monday', fromTime: formData.mondayStartTime, toTime: formData.mondayEndTime },
 { day: 'Tuesday', fromTime: formData.tuesdayStartTime, toTime: formData.tuesdayEndTime },
{day:'Wednesday', fromTime: formData.wednesdayStartTime,
   toTime: formData.wednesdayEndTime },
{ day: 'Thursday', fromTime: formData.thursdayStartTime,
   toTime: formData.thursdayEndTime },
{ day: 'Friday', fromTime: formData.fridayStartTime,
   toTime: formData.fridayEndTime },
{ day: 'Saturday', fromTime: formData.saturdayStartTime,
  toTime: formData.saturdayEndTime },

  ];

          


  const handleNext = () => {
    if (validateForm()) {
      console.log("Navigating to next form...");
      setCurrentForm(currentForm + 1);
    } else {
      alert("Please fill all required fields in this form.");
    }
  };

  

  const handlePrevious = () => {
    setCurrentForm(currentForm - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log("Updating field:", name, "to:", newValue);
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the form is valid before submission
    const formWithAvailability = { ...formData, availability };

    try {
      if (validateForm()) {
        console.log("Submitting form data:", formWithAvailability);
        const success = await signup(formWithAvailability); // Submit form data including availability
        if (success) {
          setIsSignupSuccessful(true); // Set state to trigger redirection
        }
      } else {
        alert("Please complete all required fields.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during submission. Please try again.");
    }
  };

  // Redirect to login page if signup is successful
  if (isSignupSuccessful) {
    return <Redirect to="/psychics/login" />;
  }

  
  console.log("Initial form data:", formData);

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <div className="form">
            <h2>Psychic Sign-Up - Personal Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Phone no *</label>
                <input
                  type="number"
                  id="phoneno"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
            <div className="form-group">
  <label htmlFor="gender">Gender *</label>
  <select
    id="gender"
    name="gender"
    value={formData.gender}
    onChange={handleInputChange}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>

<div className="form-group">
                <label htmlFor="profileImage">Profile Image *</label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {formData.profileImage && (
                <div className="image-preview">
                  <img src={formData.profileImage} alt="Profile Preview" style={{ width: "100px", height: "100px" }} />
                </div>
              )}
            </div>

</div>
        );
      case 2:
        return (
         <form className="form">
          <h2>Psychic Sign-Up - Complete Information</h2>
        
          {/* Birth Date */}
          <div className="form-row">
          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>
        
          <div className="form-group">
  <label htmlFor="allSkills">allSkills *</label>
  <select
    id="allSkills"
    name="allSkills"
    value={formData.allSkills}
    onChange={handleInputChange}
  >
    <option value="">Select allSkills</option>
    <option value="Medium">Medium</option>
    <option value="Aura Reading">Aura Reading</option>
    <option value="Crystal Reading">Crystal Reading</option>
    <option value="Pet Psychics">Pet Psychics</option>
    <option value="Money Psychics">Money Psychics</option>
    <option value="Past Life">Past Life</option>
    <option value="Missing Person">Missing Person</option>
    <option value="Astrologer">Astrologer</option>
    <option value="Tarot Reader">Tarot Reader</option>
    <option value="Numerologist">Numerologist</option>
    <option value="Career Advice">Career Advice</option>
    <option value="Runes Psychics">Runes Psychics</option>
    <option value="Love Psychics">Love Psychics</option>
    <option value="Breakup Psychics">Breakup Psychics</option>
    <option value="Cheating Affairs">Cheating Affairs</option>
    <option value="Family Affairs">Family Affairs</option>
    <option value="Maritial">Maritial</option>
    <option value="Parents Children">Parents Children</option>
    <option value="Empath Psychics">Empath Psychics</option>
    <option value="Dream Analysis">Dream Analysis</option>
    <option value="Clairvoyant">Clairvoyant</option>
    <option value="Clarisentient">Clarisentient</option>
  </select>
</div>

         
          </div>
       
          <div className="form-row">
  <div className="form-group">
    <label htmlFor="category">Category *</label>
    <select
      id="category"
      name="category"
      value={formData.category}
      onChange={handleInputChange}
    >
      <option value="">Select Category</option>
      <option value="Medium">Medium</option>
      <option value="Aura Reading">Aura Reading</option>
      <option value="Crystal Reading">Crystal Reading</option>
      <option value="Pet Psychics">Pet Psychics</option>
      <option value="Money Psychics">Money Psychics</option>
      <option value="Past Life">Past Life</option>
      <option value="Missing Person">Missing Person</option>
      <option value="Astrologer">Astrologer</option>
      <option value="Tarot Reader">Tarot Reader</option>
      <option value="Numerologist">Numerologist</option>
      <option value="Career Advice">Career Advice</option>
      <option value="Runes Psychics">Runes Psychics</option>
      <option value="Love Psychics">Love Psychics</option>
      <option value="Breakup Psychics">Breakup Psychics</option>
      <option value="Cheating Affairs">Cheating Affairs</option>
      <option value="Family Affairs">Family Affairs</option>
      <option value="Maritial">Maritial</option>
      <option value="Parents Children">Parents Children</option>
      <option value="Empath Psychics">Empath Psychics</option>
      <option value="Dream Analysis">Dream Analysis</option>
      <option value="Clairvoyant">Clairvoyant</option>
      <option value="Clarisentient">Clarisentient</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="primarySkills">Primary Skills *</label>
    <select
      id="primarySkills"
      name="primarySkills"
      value={formData.primarySkills}
      onChange={handleInputChange}
    >
      <option value="">Select Primary Skills</option>
      <option value="Medium">Medium</option>
      <option value="Aura Reading">Aura Reading</option>
      <option value="Crystal Reading">Crystal Reading</option>
      <option value="Pet Psychics">Pet Psychics</option>
      <option value="Money Psychics">Money Psychics</option>
      <option value="Past Life">Past Life</option>
      <option value="Missing Person">Missing Person</option>
      <option value="Astrologer">Astrologer</option>
      <option value="Tarot Reader">Tarot Reader</option>
      <option value="Numerologist">Numerologist</option>
      <option value="Career Advice">Career Advice</option>
      <option value="Runes Psychics">Runes Psychics</option>
      <option value="Love Psychics">Love Psychics</option>
      <option value="Breakup Psychics">Breakup Psychics</option>
      <option value="Cheating Affairs">Cheating Affairs</option>
      <option value="Family Affairs">Family Affairs</option>
      <option value="Maritial">Maritial</option>
      <option value="Parents Children">Parents Children</option>
      <option value="Empath Psychics">Empath Psychics</option>
      <option value="Dream Analysis">Dream Analysis</option>
      <option value="Clairvoyant">Clairvoyant</option>
      <option value="Clarisentient">Clarisentient</option>
    </select>
  </div>
</div>

<div className="form-row">
  <div className="form-group">
    <label htmlFor="language">Language *</label>
    <select
      id="language"
      name="language"
      value={formData.language}
      onChange={handleInputChange}
    >
      <option value="">Select Language</option>
      <option value="English">English</option>
      <option value="Spanish">Spanish</option>
      <option value="Mandarin">Mandarin</option>
      <option value="Hindi">Hindi</option>
      <option value="French">French</option>
      <option value="Arabic">Arabic</option>
      <option value="Bengali">Bengali</option>
      <option value="Russian">Russian</option>
      <option value="Portuguese">Portuguese</option>
      <option value="Urdu">Urdu</option>
      <option value="German">German</option>
      <option value="Japanese">Japanese</option>
      <option value="Swahili">Swahili</option>
      <option value="Marathi">Marathi</option>
      <option value="Telugu">Telugu</option>
      <option value="Turkish">Turkish</option>
      <option value="Tamil">Tamil</option>
      <option value="Italian">Italian</option>
      <option value="Korean">Korean</option>
      <option value="Vietnamese">Vietnamese</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="chargesPerMin">Charges Per Minute *</label>
    <input
      type="number"
      id="chargesPerMin"
      name="chargesPerMin"
      value={formData.chargesPerMin}
      onChange={handleInputChange}
    />
  </div>
</div>
        
          {/* Charges */}
          <div className="form-row">
          
            <div className="form-group">
              <label htmlFor="videoChargesPerMin">Video Charges per Minute</label>
              <input
                type="number"
                id="videoChargesPerMin"
                name="videoChargesPerMin"
                value={formData.videoChargesPerMin}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reportCharges">Report Charges</label>
              <input
                type="number"
                id="reportCharges"
                name="reportCharges"
                value={formData.reportCharges}
                onChange={handleInputChange}
              />
            </div>
          </div>
        
          {/* Experience and Hours */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experienceYears">Years of Experience</label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dailyHours">Daily Working Hours</label>
              <input
                type="number"
                id="dailyHours"
                name="dailyHours"
                value={formData.dailyHours}
                onChange={handleInputChange}
              />
            </div>
          </div>
        <div className="form-row">
          {/* Referred By */}
          <div className="form-group">
            <label htmlFor="referredBy">Referred By</label>
            <input
              type="text"
              id="referredBy"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleInputChange}
            />
          </div>
        
          {/* Working on Other Platform */}
          <div className="form-group">
            <label htmlFor="workingOnOtherPlatform">Working on Other Platform</label>
            <select
  id="workingOnOtherPlatform"
  name="workingOnOtherPlatform"
  value={formData.workingOnOtherPlatform || ""}
  onChange={handleInputChange}
>
  <option value="">Select Option</option>
  <option value="true">Yes</option>
  <option value="false">No</option>
</select>

          </div>
          </div>
          
        </form> 
        
        );
        case 3: return (
          <form className="form">
          <h2>Psychic Sign-Up  Step3- </h2>
        
          {/* Birth Date */}
          <div className="form-row">
          <div className="form-group">
  <label htmlFor="allSkills">Business Source *</label>
  <select
    id="allSkills"
    name="businessSource"
    value={formData.businessSource}
    onChange={handleInputChange}
  >
    <option value="">Select allSkills</option>
    <option value="Own Business">Own Business</option>
    <option value="Private Job">Private Job</option>
    <option value="Government Job">Government Job</option>
    <option value="Studying in College">Studying in College</option>
    <option value="None of the Above"> None of the Above </option>


  </select>
</div>
        
          <div className="form-group">
  <label htmlFor="allSkills">qualification *</label>
  <select
    id="qualification"
    name="qualification"
    value={formData.qualification}
    onChange={handleInputChange}
  >
    <option value="">Select Study</option>
    <option value="Diploma">Diploma</option>
    <option value="10th">10th</option>
    <option value="12th">12th</option>
    <option value="Graduated">Graduated</option>
    <option value="Post Graduated">Post Graduated</option>
    <option value="PhD">PhD</option>
    <option value="Others">Others</option>
   
   
  </select>
</div>
   
          </div>
       
          <div className="form-row">
  <div className="form-group">
    <label htmlFor="category">
      DegreeDiploma *</label>
    <select
      id="degreeDiploma"
      name="degreeDiploma"
      value={formData.degreeDiploma}
      onChange={handleInputChange}
    >
      <option value="">Select one</option>
      <option value="B.Tech">B.Tech</option>
    <option value="B.Sc">B.Sc</option>
    <option value="B.A">B.A</option>
    <option value="B.E">B.E</option>
    <option value="B.Com">B.Com</option>
    <option value="B.Pharma">B.Pharma</option>
    <option value="M.A">M.A</option>
    <option value="M.Sc">M.Sc</option>
    <option value="MBBS">MBBS</option>
    <option value="Others">Others</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="chargesPerMin"> College Name *</label>
    <input
      type="text"
      id="collegeName"
      name="collegeName"
      value={formData.collegeName}
      onChange={handleInputChange}
    />
  </div>
  
</div>

<div className="form-row">
<div className="form-group">
    <label htmlFor="chargesPerMin">LearnedAstrologyFrom *</label>
    <input
      type="text"
      id="learnedAstrologyFrom"
      name="learnedAstrologyFrom"
      value={formData.learnedAstrologyFrom}
      onChange={handleInputChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="chargesPerMin">instagramProfile *</label>
    <input
      type="text"
      id="instagramProfile"
      name="instagramProfile"
      value={formData.instagramProfile}
      onChange={handleInputChange}
    />
  </div>
</div>
        
<div className="form-row">
<div className="form-group">
    <label htmlFor="chargesPerMin">facebookProfile *</label>
    <input
      type="text"
      id="facebookProfile"
      name="facebookProfile"
      value={formData.facebookProfile}
      onChange={handleInputChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="chargesPerMin">linkedInProfile *</label>
    <input
      type="text"
      id="linkedInProfile"
      name="linkedInProfile"
      value={formData.linkedInProfile}
      onChange={handleInputChange}
    />
  </div>
</div>
<div className="form-row">
<div className="form-group">
    <label htmlFor="chargesPerMin">youtubeProfile *</label>
    <input
      type="text"
      id="youtubeProfile"
      name="youtubeProfile"
      value={formData.youtubeProfile}
      onChange={handleInputChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="chargesPerMin">websiteProfile *</label>
    <input
      type="text"
      id="websiteProfile"
      name="websiteProfile"
      value={formData.websiteProfile}
      onChange={handleInputChange}
    />
  </div>
</div>  
      
         
        </form> 
        );
        case 4: return (
          <form className="form">
          <h2>Psychic Sign-Up  Step4- </h2>
        
          {/* Birth Date */}
          <div className="form-row">
        
        
          <div className="form-group">
    <label htmlFor="chargesPerMin">minEarningExpectation *</label>
    <input
      type="text"
      id="minEarningExpectation"
      name="minEarningExpectation"
      value={formData.minEarningExpectation}
      onChange={handleInputChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="chargesPerMin">MaxEarning Expectation *</label>
    <input
      type="text"
      id="maxEarningExpectation"
      name="maxEarningExpectation"
      value={formData.maxEarningExpectation}
      onChange={handleInputChange}
    />
  </div>
          </div>
       
        

<div className="form-row">
<div className="form-group">
  <label htmlFor="allSkills"> countriesTraveled *</label>
  <select
    id="allSkills"
    name="countriesTraveled"
    value={formData.countriesTraveled}
    onChange={handleInputChange}
  >
    <option value="">Select one</option>
    <option value="0">0</option>
    <option value="1-2">1-2</option>
    <option value="3-5">3-5</option>
    <option value="+6"> +6</option>


  </select>
</div>
        

<div className="form-group">
  <label htmlFor="allSkills"> currentJobStatus *</label>
  <select
    id="allSkills"
    name="currentJobStatus"
    value={formData.currentJobStatus}
    onChange={handleInputChange}
  >
    <option value="">Select one</option>
    <option value="No, I am working as part timer or freelancer0">No, I am working as part timer or freelancer</option>
    <option value="Yes, I am working somewhere as full time">Yes, I am working somewhere as full time</option>
    <option value="No, I am not working somewhere else">No, I am not working somewhere else</option>
    <option value="I own a business">I own a business</option>


  </select>
</div>
</div>
        
<div className="form-row">
<div className="form-group">
    <label htmlFor="chargesPerMin">longBio *</label>
    <input
      type="text"
      id="longBio"
      name="longBio"
      value={formData.longBio}
      onChange={handleInputChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="chargesPerMin">qualitiesOfPsychic *</label>
    <input
      type="text"
      id="qualitiesOfPsychic"
      name="qualitiesOfPsychic"
      value={formData.qualitiesOfPsychic}
      onChange={handleInputChange}
    />
  </div>
</div>
<div className="form-row">
<div className="form-group">
    <label htmlFor="chargesPerMin">biggestChallenge *</label>
    <input
      type="text"
      id="biggestChallenge"
      name="biggestChallenge"
      value={formData.biggestChallenge}
      onChange={handleInputChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="chargesPerMin">repeatedQuestionHandling *</label>
    <input
      type="text"
      id="repeatedQuestionHandling"
      name="repeatedQuestionHandling"
      value={formData.repeatedQuestionHandling}
      onChange={handleInputChange}
    />
  </div>
</div>  
      
         
        </form> 
        );


       
              case 5:
                return (
                  <div className="form">
                  <h2>Psychic Sign-Up - Availability</h2>
                
                  <div className="form-row">
                    <div className="form-group">
                      <label>Sunday</label>
                      <input
                        type="time"
                        name="sundayStartTime"
                        value={formData.sundayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="sundayEndTime"
                        value={formData.sundayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                
                    <div className="form-group">
                      <label>Monday</label>
                      <input
                        type="time"
                        name="mondayStartTime"
                        value={formData.mondayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="mondayEndTime"
                        value={formData.mondayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                
                    <div className="form-group">
                      <label>Tuesday</label>
                      <input
                        type="time"
                        name="tuesdayStartTime"
                        value={formData.tuesdayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="tuesdayEndTime"
                        value={formData.tuesdayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                
                    <div className="form-group">
                      <label>Wednesday</label>
                      <input
                        type="time"
                        name="wednesdayStartTime"
                        value={formData.wednesdayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="wednesdayEndTime"
                        value={formData.wednesdayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                
                    <div className="form-group">
                      <label>Thursday</label>
                      <input
                        type="time"
                        name="thursdayStartTime"
                        value={formData.thursdayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="thursdayEndTime"
                        value={formData.thursdayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                
                    <div className="form-group">
                      <label>Friday</label>
                      <input
                        type="time"
                        name="fridayStartTime"
                        value={formData.fridayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="fridayEndTime"
                        value={formData.fridayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                
                    <div className="form-group">
                      <label>Saturday</label>
                      <input
                        type="time"
                        name="saturdayStartTime"
                        value={formData.saturdayStartTime || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="time"
                        name="saturdayEndTime"
                        value={formData.saturdayEndTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                
                 
                </div>
                
                
     
          
        )
      default:
        return null;
    }
  };

  return (
    <div>
  
  <style>
    {`
body {
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
background: #f3f4f6;
color: #333;
}

.container {
display: flex;
flex-wrap: wrap;
gap: 20px;
padding: 20px;
}

.content {
flex: 2;
padding: 20px;
}

h1, h2 {
font-size: 1.2rem; /* Reduced heading size for a smaller, professional look */
color: #222;
margin-bottom: 10px;
}

p {
font-size: 0.9rem; /* Subtle and neat font size */
line-height: 1.5;
color: #555;
}

.form-container {
flex: 1;
padding: 20px;
border: 1px solid #f95f2e;
border-radius: 8px;
background: #fff;
}

.form-group {
margin-bottom: 15px;
}
.form-row {
display: flex;
gap: 20px; /* Adjust spacing between fields */
}

.form-group {
flex: 1; /* Makes each input take up equal space */
}

input {
width: 100%;
padding: 8px;
font-size: 0.9rem;
border: 1px solid #ccc;
border-radius: 6px;

}

label {
display: block;
margin-bottom: 5px;
font-size: 0.85rem;
font-weight: bold;
color: #444;
}


input,
select {
width: 100%;
padding: 7px; /* Adjusted padding for a compact look */
font-size: 0.9rem; /* Slightly smaller input font size */
border: 1px solid #ccc;
border-radius: 6px;

transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
select:focus {
border-color: #f95f2e;
box-shadow: 0 0 4px rgb(246, 128, 59);
background-color: #fff;
outline: none;
}

button {
padding: 8px 16px; /* Compact button padding */
border: none;
background: #f95f2e;
color: white;
border-radius: 6px;
cursor: pointer;
font-size: 0.9rem; /* Consistent button font size */
font-weight: bold;
transition: background-color 0.3s ease;
}

button:hover {
background-color: #e8561e;
}

button:disabled {
background: #ddd;
cursor: not-allowed;
}

.form-navigation {
display: flex;
justify-content: space-between;
margin-top: 15px;
}

.image-preview img {
max-width: 100%;
max-height: 120px;
border-radius: 6px;
}

    `}
  </style>
  <div className="container">
  <div className="content">
    <h1>BECOME "<em>honestseers</em> VERIFIED" Psychic: JOIN NOW!</h1>
    <p>
      Are you passionate about helping others and ready to offer your skills as a Psychic Advisor? Join our community of <em>honesseers</em> and take the first step towards a rewarding journey! At <em>honestseers</em>, we provide a platform for talented psychics to connect with seekers worldwide. Whether you specialize in tarot readings, astrology, or spiritual guidance, we welcome you to showcase your expertise and grow your practice.
    </p>

    {/* Boxes for 24/7 Availability and Verified Psychics */}
    <div className="boxes">
      <div className="box">
        <h3>24/7 Availability</h3>
        <p>
          Our platform ensures that you can connect with seekers anytime, anywhere. Whether it's day or night, your skills are just a click away.
        </p>
      </div>
      <div className="box">
        <h3>Verified Psychics</h3>
        <p>
          We rigorously verify every psychic on our platform to ensure authenticity and trust. Join a community of trusted and skilled professionals.
        </p>
      </div>
    </div>
  </div>

  <div className="form-container">
    {renderForm()}

    <div className="form-navigation">
      <button onClick={handlePrevious} disabled={currentForm === 1}>
        Previous
      </button>

      {currentForm === 5 ? (
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      ) : (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default PsyRegister;
