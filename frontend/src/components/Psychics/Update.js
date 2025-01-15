import React, { useEffect, useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PsyAuthContext } from "../../context/PsyAuthContext";
import axios from "axios";
import { toast } from 'react-toastify';

const Update = () => {
  const { authPsychics } = useContext(PsyAuthContext);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    birthDate: "",
    category: [],
    primarySkills: [],
    allSkills: [],
    language: [],
    chargesPerMin: "",
    videoChargesPerMin: "",
    reportCharges: "",
    experienceYears: "",
    dailyHours: "",
    referredBy: "",
    workingOnOtherPlatform: false,
    businessSource: "", // Initialize as a string
    qualification: "",  // Initialize as a string
    degreeDiploma: "",  // Initialize as a string
    collegeName: "",
    instagramProfile: "",
    facebookProfile: "",
    linkedInProfile: "",
    youtubeProfile: "",
    websiteProfile: "",
    minEarningExpectation: "",
    maxEarningExpectation: "",
    countriesTraveled: "",
    currentJobStatus: "",
    longBio: "",
    repeatedQuestionHandling: "",
    availability: [
      { day: "Sunday", fromTime: "", toTime: "" },
      { day: "Monday", fromTime: "", toTime: "" },
      { day: "Tuesday", fromTime: "", toTime: "" },
      { day: "Wednesday", fromTime: "", toTime: "" },
      { day: "Thursday", fromTime: "", toTime: "" },
      { day: "Friday", fromTime: "", toTime: "" },
      { day: "Saturday", fromTime: "", toTime: "" },
    ]
  });
  
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertTo24HourFormat = (time) => {
    const [hour, minute, modifier] = time.split(/[: ]/);
    let hours = parseInt(hour, 10);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minute}`;
  };

  // Helper function to convert 24-hour format (e.g., '22:49') to 12-hour format (e.g., '10:49 PM')
  const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(':');
    let modifier = 'AM';

    hours = parseInt(hours, 10);

    if (hours >= 12) {
      modifier = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${modifier}`;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!authPsychics || !authPsychics._id) {
        console.error("No psychic ID available.");
        return;
      }

      try {
        const response = await fetch(`/api/psychics/profile/${authPsychics._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: authPsychics._id,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfile({
          username: data.profile.username,
          email: data.profile.email,
          profileImage: data.profile.profileImage,
        });
        setImagePreview(data.profile.profileImage);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, [authPsychics]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profilestep2/profile/${authPsychics._id}`);
        if (response.data && response.data.profileStep2) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...response.data.profileStep2,
            primarySkills: response.data.profileStep2.primarySkills || [],
            allSkills: response.data.profileStep2.allSkills || [],
            language: response.data.profileStep2.language || [],
          }));
        }
      } catch (error) {
        setError("Error fetching profile data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (authPsychics._id) {
      fetchProfileData();
    }
  }, [authPsychics]);

  useEffect(() => {
    if (!authPsychics?._id) {
      return;
    }
  
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profilestep3/profile/${authPsychics._id}`);
        console.log("API Response:", response.data);
  
        if (response.data && response.data.psychicDetails) {
          const psychicDetails = response.data.psychicDetails;
  
          setProfile((prevProfile) => ({
            ...prevProfile,
            businessSource: psychicDetails.businessSource || "", // Ensure it's a string
            qualification: psychicDetails.qualification || "",  // Ensure it's a string
            degreeDiploma: psychicDetails.degreeDiploma || "",  // Ensure it's a string
            collegeName: psychicDetails.collegeName || "",
            instagramProfile: psychicDetails.instagramProfile || "",
            facebookProfile: psychicDetails.facebookProfile || "",
            linkedInProfile: psychicDetails.linkedInProfile || "",
            youtubeProfile: psychicDetails.youtubeProfile || "",
            websiteProfile: psychicDetails.websiteProfile || "",
          }));
          
          
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, [authPsychics]);
  
  useEffect(() => {
    if (!authPsychics?._id) return;
  
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profilestep4/profile/${authPsychics._id}`);
        console.log("API Response:", response.data); // Log to check the response structure
  
        if (response.data && response.data.profileStep4) {
          const { minEarningExpectation, maxEarningExpectation, countriesTraveled, currentJobStatus, longBio, repeatedQuestionHandling } = response.data.profileStep4;
          setProfile((prevProfile) => ({
            ...prevProfile,
            minEarningExpectation,
            maxEarningExpectation,
            countriesTraveled,
            currentJobStatus,
            longBio,
            repeatedQuestionHandling,
          }));
        }
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, [authPsychics]);
  
  useEffect(() => {
    if (!authPsychics?._id) return;

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profilestep5/profile/${authPsychics._id}`);
        if (response.data && response.data.profileStep5) {
          const availability = response.data.profileStep5.availability || [];
          setProfile((prevProfile) => ({
            ...prevProfile,
            availability
          }));
        }
      } catch (error) {
        console.error("Error fetching availability data:", error);
        setError("Error fetching availability data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [authPsychics]);
  const handleStep5Submit = async (e) => {
    e.preventDefault();

    const updatedProfile = { availability: profile.availability };

    try {
      const response = await axios.put(`/api/profilestep5/update/${authPsychics._id}`, updatedProfile);
      if (response.status === 200) {
        toast.success("Availability updated successfully!");
      }
    } catch (error) {
      console.error("Error updating availability:", error.response?.data || error.message);
      toast.error("Error updating availability: " + (error.response?.data || error.message));
    }
  };

  // Handle changes in availability time slots
  const handleAvailabilityChange = (e, index, type) => {
    const updatedAvailability = [...profile.availability];
    const newTime = e.target.value;
    
    // Convert the 24-hour time back to 12-hour format before updating the state
    updatedAvailability[index][type] = convertTo12HourFormat(newTime);
  
    setProfile((prevProfile) => ({
      ...prevProfile,
      availability: updatedAvailability
    }));
  };
  
  useEffect(() => {
    // Convert times to 24-hour format when setting the initial state
    const updatedAvailability = profile.availability.map((slot) => ({
      ...slot,
      fromTime: slot.fromTime ? convertTo24HourFormat(slot.fromTime) : "",
      toTime: slot.toTime ? convertTo24HourFormat(slot.toTime) : ""
    }));
  
    setProfile((prevProfile) => ({
      ...prevProfile,
      availability: updatedAvailability
    }));
  }, [authPsychics]);  // Ensure the effect runs whenever authPsychics changes
  


  const handleonSubmit = async (e) => {
    e.preventDefault();
  
    let updatedImage = profile.profileImage;
    if (image) {
      updatedImage = await uploadImageToCloudinary();
    }
  
    const updatedProfile = {
      ...profile, // Spread operator to include all fields from the profile state
      profileImage: updatedImage,
    };
  
    try {
      const response = await axios.put(`/api/profilestep3/update/${authPsychics._id}`, updatedProfile);
      
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Error updating profile: " + (error.response?.data || error.message));
    }
  };
  
 

  const handleon3Submit = async (e) => {
    e.preventDefault();
  
    let updatedImage = profile.profileImage;
    if (image) {
      updatedImage = await uploadImageToCloudinary();
    }
  
    const { _id, ...updateData } = profile; // Destructure to exclude _id
    const updatedProfile = {
      ...updateData,
      profileImage: updatedImage,
      businessSource: updateData.businessSource || "",
      qualification: updateData.qualification || "",
      degreeDiploma: updateData.degreeDiploma || "",
    };
  
    try {
      const response = await axios.put(`/api/profilestep3/update/${authPsychics._id}`, updatedProfile);
  
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Error updating profile: " + (error.response?.data || error.message));
    }
  };
  const handleon4Submit = async (e) => {
    e.preventDefault();
  
    let updatedImage = profile.profileImage;
    if (image) {
      updatedImage = await uploadImageToCloudinary();
    }
  
    const updatedProfile = {
      ...profile, // Spread operator to include all fields from the profile state
      profileImage: updatedImage,
    };
  
    try {
      const response = await axios.put(`/api/profilestep4/update/${authPsychics._id}`, updatedProfile);
      
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Error updating profile: " + (error.response?.data || error.message));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqqejge0d/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const handlePasswordToggle = () => setShowPassword((prev) => !prev);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedImage = profile.profileImage;
    if (image) {
      updatedImage = await uploadImageToCloudinary();
    }

    const updatedProfile = {
      email: profile.email,
      username: profile.username,
      phoneno: profile.phoneno,
      profileImage: updatedImage,
    };

    // Add password fields only if they are provided
    if (profile.password && profile.password === profile.confirmPassword) {
      updatedProfile.newPassword = profile.password;
      updatedProfile.confirmNewPassword = profile.confirmPassword;
    }

    try {
      const response = await axios.put(`/api/psychics/update/${authPsychics._id}`, updatedProfile);
      
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Error updating profile: " + (error.response?.data || error.message));
    }
  };
  return (
    
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            {/* Profile Image */}
          
           
          </div>
          {/* /.col */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                    >
                      Step 1
                    </a>
                  </li>
                  
                  <li className="nav-item">
                    <a className="nav-link" href="#notifications" data-toggle="tab">
                      Step 2
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#settings" data-toggle="tab">
                     Step 3
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step4" data-toggle="tab">
                      Step 4
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step5" data-toggle="tab">
                      Step 5
                    </a>
                  </li>
                 
                </ul>
              </div>
             
           
              {/* /.card-header */}
              <div className="card-body">
                <div className="tab-content">

                <div className="active tab-pane" id="activity">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={profile.password}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="confirmPassword" className="col-sm-4 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleConfirmPasswordToggle}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="d-block mb-2">Profile Photo</label>
          <div className="align-items-center">
            <img
              src={imagePreview || profile.profileImage || ""}
              alt="Profile Preview"
              className="border rounded"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <br />
            <div>
              <input
                type="file"
                className="form-control-file"
                style={{ width: "100px" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group row">
          <button type="submit" className="btn btn-danger">
            Update
          </button>
        </div>
      </form>
</div>
                 
<div className="tab-pane" id="notifications">
      <form className="form-horizontal" onSubmit={handleonSubmit}>
        

        <div className="form-group row">
          <label htmlFor="category" className="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              name="category"
              multiple
              value={profile.category}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  category: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
            >
              {["Medium", "Aura Reading", "Crystal Reading", "Pet Psychics", "Money Psychics", "Past Life", "Missing Person", "Astrologer", "Tarot Reader", "Numerologist", "Career Advice", "Runes Psychics", "Love Psychics", "Breakup Psychics", "Cheating Affairs", "Family Affairs", "Maritial", "Parents Children", "Empath Psychics", "Dream Analysis", "Clairvoyant", "Clarisentient"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row">
  <label htmlFor="primarySkills" className="col-sm-2 col-form-label">
    Primary Skills
  </label>
  <div className="col-sm-10">
    <select
      id="primarySkills"
      name="primarySkills"
      className="form-control"
      multiple
      value={profile.primarySkills || []}
      onChange={(e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setProfile({ ...profile, primarySkills: selectedOptions });
      }}
    >
      {[
        "Medium",
        "Aura Reading",
        "Crystal Reading",
        "Pet Psychics",
        "Money Psychics",
        "Past Life",
        "Missing Person",
        "Astrologer",
        "Tarot Reader",
        "Numerologist",
        "Career Advice",
        "Runes Psychics",
        "Love Psychics",
        "Breakup Psychics",
        "Cheating Affairs",
        "Family Affairs",
        "Maritial",
        "Parents Children",
        "Empath Psychics",
        "Dream Analysis",
        "Clairvoyant",
        "Clarisentient",
      ].map((skill) => (
        <option key={skill} value={skill}>
          {skill}
        </option>
      ))}
    </select>
  </div>
</div>


        <div className="form-group row">
  <label htmlFor="allSkills" className="col-sm-4 col-form-label">
    All Skills
  </label>
  <div className="col-sm-10">
    <select
      id="allSkills"
      name="allSkills"
      className="form-control"
      multiple
      value={profile.allSkills || []}
      onChange={(e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setProfile({ ...profile, allSkills: selectedOptions });
      }}
    >
      {[
        "Medium",
        "Aura Reading",
        "Crystal Reading",
        "Pet Psychics",
        "Money Psychics",
        "Past Life",
        "Missing Person",
        "Astrologer",
        "Tarot Reader",
        "Numerologist",
        "Career Advice",
        "Runes Psychics",
        "Love Psychics",
        "Breakup Psychics",
        "Cheating Affairs",
        "Family Affairs",
        "Maritial",
        "Parents Children",
        "Empath Psychics",
        "Dream Analysis",
        "Clairvoyant",
        "Clarisentient",
      ].map((skill) => (
        <option key={skill} value={skill}>
          {skill}
        </option>
      ))}
    </select>
  </div>
</div>


        <div className="form-group row">
  <label htmlFor="language" className="col-sm-4 col-form-label">
    Language
  </label>
  <div className="col-sm-10">
    <select
      id="language"
      name="language"
      className="form-control"
      multiple
      value={profile.language || []}
      onChange={(e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setProfile({ ...profile, language: selectedOptions });
      }}
    >
      {[
        "English",
        "Spanish",
        "Mandarin",
        "Hindi",
        "French",
        "Arabic",
        "Bengali",
        "Russian",
        "Portuguese",
        "Urdu",
        "German",
        "Japanese",
        "Swahili",
        "Marathi",
        "Telugu",
        "Turkish",
        "Tamil",
        "Italian",
        "Korean",
        "Vietnamese",
      ].map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  </div>
</div>


        <div className="form-group row">
          <label htmlFor="chargesPerMin" className="col-sm-4 col-form-label">
            Charges per Min
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              name="chargesPerMin"
              value={profile.chargesPerMin}
              onChange={(e) => setProfile({ ...profile, chargesPerMin: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="videoChargesPerMin" className="col-sm-4 col-form-label">
            Cross Rate
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              name="videoChargesPerMin"
              value={profile.videoChargesPerMin}
              onChange={(e) => setProfile({ ...profile, videoChargesPerMin: e.target.value })}
            />
          </div>
        </div>

       

      

        <div className="form-group row">
          <label htmlFor="dailyHours" className="col-sm-4 col-form-label">
            Daily Hours
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              name="dailyHours"
              value={profile.dailyHours}
              onChange={(e) => setProfile({ ...profile, dailyHours: e.target.value })}
            />
          </div>
        </div>

       

        <div className="form-group row">
          <button type="submit" className="btn btn-danger">
            Update
          </button>
        </div>
      </form>
    </div>
                 
                  <div className="tab-pane" id="settings">
                  <form className="form-horizontal" onSubmit={handleon3Submit}>
  
  {/* Business Source */}
  <div className="form-group row">
    <label htmlFor="businessSource" className="col-sm-2 col-form-label">
      Business Source
    </label>
    <div className="col-sm-10">
    <select
  className="form-control"
  name="businessSource"
  value={profile.businessSource}  // It should be a string
  onChange={(e) =>
    setProfile({
      ...profile,
      businessSource: e.target.value,  // Make sure it's a string value
    })
  }
>
  {["Own Business", "Private Job", "Government Job", "Studying in College", "None of the Above"].map((businessSource) => (
    <option key={businessSource} value={businessSource}>
      {businessSource}
    </option>
  ))}
</select>

    </div>
  </div>

  {/* Qualification */}
  <div className="form-group row">
    <label htmlFor="qualification" className="col-sm-2 col-form-label">
      Qualification
    </label>
    <div className="col-sm-10">
    <select
  id="qualification"
  name="qualification"
  className="form-control"
  value={profile.qualification}  // It should be a string
  onChange={(e) => {
    setProfile({ ...profile, qualification: e.target.value });  // Make sure it's a string value
  }}
>
  {["Diploma", "10th", "12th", "Graduated", "Post Graduated", "PhD", "Others"].map((qualification) => (
    <option key={qualification} value={qualification}>
      {qualification}
    </option>
  ))}
</select>

    </div>
  </div>

  {/* Degree/Diploma */}
  <div className="form-group row">
    <label htmlFor="degreeDiploma" className="col-sm-4 col-form-label">
      Degree/Diploma
    </label>
    <div className="col-sm-10">
    <select
  id="degreeDiploma"
  name="degreeDiploma"
  className="form-control"
  value={profile.degreeDiploma}  // It should be a string
  onChange={(e) => {
    setProfile({ ...profile, degreeDiploma: e.target.value });  // Make sure it's a string value
  }}
>
  {["B.Tech", "B.Sc", "B.A", "B.E", "B.Com", "B.Pharma", "M.A", "M.Sc", "MBBS", "Others"].map((degreeDiploma) => (
    <option key={degreeDiploma} value={degreeDiploma}>
      {degreeDiploma}
    </option>
  ))}
</select>
    </div>
  </div>

  {/* College Name */}
  <div className="form-group row">
    <label htmlFor="collegeName" className="col-sm-4 col-form-label">
      College Name
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="collegeName"
        value={profile.collegeName}
        onChange={(e) => setProfile({ ...profile, collegeName: e.target.value })}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="instagramProfile" className="col-sm-4 col-form-label">
      Instagram Profile
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="instagramProfile"
        value={profile.instagramProfile}
        onChange={(e) => setProfile({ ...profile, instagramProfile: e.target.value })}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="facebookProfile" className="col-sm-4 col-form-label">
    facebook Profile
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="facebookProfile"
        value={profile.facebookProfile}
        onChange={(e) => setProfile({ ...profile, facebookProfile: e.target.value })}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="facebookProfile" className="col-sm-4 col-form-label">
    youtube Profile
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="youtubeProfile"
        value={profile.youtubeProfile}
        onChange={(e) => setProfile({ ...profile, youtubeProfile: e.target.value })}
      />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="linkedInProfile" className="col-sm-4 col-form-label">
    linkedInProfile
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="linkedInProfile"
        value={profile.linkedInProfile}
        onChange={(e) => setProfile({ ...profile, linkedInProfile: e.target.value })}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="websiteProfile" className="col-sm-4 col-form-label">
    websiteProfile
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="websiteProfile"
        value={profile.websiteProfile}
        onChange={(e) => setProfile({ ...profile, websiteProfile: e.target.value })}
      />
    </div>
  </div>
  {/* Submit Button */}
  <div className="form-group row">
    <button type="submit" className="btn btn-danger">
      Update
    </button>
  </div>

</form>


                  </div>
                
                  <div className="tab-pane" id="step4">
                  <form className="form-horizontal" onSubmit={handleon4Submit}>
  
                  <div className="form-group row">
    <label htmlFor="minEarningExpectation" className="col-sm-4 col-form-label">
    MinEarningExpectation
    </label>
    <div className="col-sm-10">
    <input
  type="number"
  className="form-control"
  name="minEarningExpectation"
  value={profile.minEarningExpectation}
  onChange={(e) => {
    console.log("Input Change:", e.target.value);
    setProfile({ ...profile, minEarningExpectation: e.target.value });
  }}
/>


    </div>
  </div>
 
  <div className="form-group row">
    <label htmlFor="maxEarningExpectation" className="col-sm-4 col-form-label">
    maxEarningExpectation    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="maxEarningExpectation"
        value={profile.maxEarningExpectation}
        onChange={(e) => setProfile({ ...profile, maxEarningExpectation: e.target.value })}
      />
    </div>
  </div>


  <div className="form-group row">
    <label htmlFor="maxEarningExpectation" className="col-sm-4 col-form-label">
    longBio    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="longBio"
        value={profile.longBio}
        onChange={(e) => setProfile({ ...profile, longBio: e.target.value })}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="maxEarningExpectation" className="col-sm-4 col-form-label">
    Repeated Question Handling    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        name="repeatedQuestionHandling"
        value={profile.repeatedQuestionHandling}
        onChange={(e) => setProfile({ ...profile, repeatedQuestionHandling: e.target.value })}
      />
    </div>
  </div>
  {/* Qualification */}
  <div className="form-group row">
    <label htmlFor="qualification" className="col-sm-2 col-form-label">
    countriesTraveled
    </label>
    <div className="col-sm-10">
    <select
  id="qualification"
  name="countriesTraveled"
  className="form-control"
  value={profile.countriesTraveled}  // It should be a string
  onChange={(e) => {
    setProfile({ ...profile, countriesTraveled: e.target.value });  // Make sure it's a string value
  }}
>
  {["0", "1-2", "3-5", "6+"].map((countriesTraveled) => (
    <option key={countriesTraveled} value={countriesTraveled}>
      {countriesTraveled}
    </option>
  ))}
</select>

    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="currentJobStatus" className="col-sm-2 col-form-label">
    currentJobStatus
    </label>
    <div className="col-sm-10">
    <select
  id="currentJobStatus"
  name="currentJobStatus"
  className="form-control"
  value={profile.currentJobStatus}  // It should be a string
  onChange={(e) => {
    setProfile({ ...profile, currentJobStatus: e.target.value });  // Make sure it's a string value
  }}
>
  {["No, I am working as part timer or freelancer",
        "Yes, I am working somewhere as full time",
        "No, I am not working somewhere else",
        "I own a business"].map((currentJobStatus) => (
    <option key={currentJobStatus} value={currentJobStatus}>
      {currentJobStatus}
    </option>
  ))}
</select>

    </div>
  </div>
 
  {/* Submit Button */}
  <div className="form-group row">
    <button type="submit" className="btn btn-danger">
      Update
    </button>
  </div>

</form>


                  </div>
              
                  <div className="tab-pane" id="step5">
      <div className="form">
        <h2>Psychic Sign-Up - Availability</h2>

        <form onSubmit={handleStep5Submit}>
        <div className="form-row">
  {profile.availability && Array.isArray(profile.availability) && profile.availability.length > 0 ? (
    profile.availability.map((slot, index) => (
      <div key={index} className="form-group">
        <label>{slot.day}</label>
        <input
          type="time"
          name={`${slot.day}StartTime`}
          value={convertTo24HourFormat(slot.fromTime)}  // Convert to 24-hour format
          onChange={(e) => handleAvailabilityChange(e, index, "fromTime")}
        />
        <input
          type="time"
          name={`${slot.day}EndTime`}
          value={convertTo24HourFormat(slot.toTime)}  // Convert to 24-hour format
          onChange={(e) => handleAvailabilityChange(e, index, "toTime")}
        />
      </div>
    ))
  ) : (
    <p>No availability data available</p>
  )}
</div>




          <button type="submit" className="btn btn-primary">
            Save Availability
          </button>
        </form>
      </div>
      </div>
                </div>
              
              </div>
             
            </div>
           
          </div>
         
        </div>
       
      </div>
    </section>
  );
};

export default Update;
