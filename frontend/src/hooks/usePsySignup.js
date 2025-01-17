import { useState } from "react";
import { toast } from "react-toastify";
import { PsyuseAuthContext } from "../context/PsyAuthContext";

const usePsySignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthPsychics } = PsyuseAuthContext();

  const signup = async ({
    email,
    phoneno,
    username,
    profilePic,
    password,
    gender,
    birthDate,
    category,
    primarySkills,
    allSkills,
    language,
    chargesPerMin,
    videoChargesPerMin,
    reportCharges,
    experienceYears,
    dailyHours,
    referredBy,
    workingOnOtherPlatform,
    businessSource,
    qualification,
    degreeDiploma,
    collegeName,
    learnedAstrologyFrom,
    instagramProfile,
    facebookProfile,
    linkedInProfile,
    youtubeProfile,
    websiteProfile,
    minEarningExpectation,
    maxEarningExpectation,
    countriesTraveled,
    currentJobStatus,
    longBio,
    qualitiesOfPsychic,
    biggestChallenge,
    repeatedQuestionHandling,
    availability // Step 5 data
  }) => {
    const success = handleInputErrors({
      email,
      username,
      phoneno,
      password,
      profilePic,
      gender,
      birthDate,
      category,
      allSkills,
      primarySkills,
      language,
      chargesPerMin,
      videoChargesPerMin,
      reportCharges,
      experienceYears,
      dailyHours,
      businessSource,
      qualification,
      degreeDiploma,
      collegeName,
      learnedAstrologyFrom,
      instagramProfile,
      facebookProfile,
      linkedInProfile,
      youtubeProfile,
      websiteProfile,
      minEarningExpectation,
      maxEarningExpectation,
      countriesTraveled,
      currentJobStatus,
      longBio,
      qualitiesOfPsychic,
      biggestChallenge,
      repeatedQuestionHandling,
      availability // Include availability in validation
    });

    if (!success) return;

    setLoading(true);

    try {
      // Step 1: Call the signup API
      const signupRes = await fetch("/api/psychics/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          phoneno,
          profilePic,
          password,
          gender,
        }),
      });

      const signupData = await signupRes.json();
      if (signupRes.status !== 201) {
        throw new Error(signupData.error || "Signup failed");
      }

    
      // Step 2: Call the addProfileStep2 API with the psychicId
      const profileStep2Res = await fetch("/api/profilestep2/addProfileStep2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          psychicId: signupData._id,
          birthDate,
          category,
          primarySkills,
          allSkills,
          language,
          chargesPerMin,
          videoChargesPerMin,
          reportCharges,
          experienceYears,
          dailyHours,
          referredBy,
          workingOnOtherPlatform,
        }),
      });

      const profileStep2Data = await profileStep2Res.json();
      if (profileStep2Res.status !== 201) {
        throw new Error(profileStep2Data.error || "Profile Step 2 failed");
      }

      // Step 3: Call the addProfileStep3 API with additional data
      const profileStep3Res = await fetch("/api/profilestep3/addProfileStep3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          psychicId: signupData._id,
          businessSource,
          qualification,
          degreeDiploma,
          collegeName,
          learnedAstrologyFrom,
          instagramProfile,
          facebookProfile,
          linkedInProfile,
          youtubeProfile,
          websiteProfile,
        }),
      });

      const profileStep3Data = await profileStep3Res.json();
      if (profileStep3Res.status !== 201) {
        throw new Error(profileStep3Data.error || "Profile Step 3 failed");
      }

      // Step 4: Call the addProfileStep4 API with additional data
      const profileStep4Res = await fetch("/api/profilestep4/addProfileStep4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          psychicId: signupData._id,
          minEarningExpectation,
          maxEarningExpectation,
          countriesTraveled,
          currentJobStatus,
          longBio,
          qualitiesOfPsychic,
          biggestChallenge,
          repeatedQuestionHandling,
        }),
      });

      const profileStep4Data = await profileStep4Res.json();
      if (profileStep4Res.status !== 201) {
        throw new Error(profileStep4Data.error || "Profile Step 4 failed");
      }

      // Step 5: Call the addProfileStep5 API with availability data
      
      const profileStep5Res = await fetch("/api/profilestep5/addProfileStep5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          psychicId: signupData._id,
          availability, // Availability data here
        }),
      });

      const profileStep5Data = await profileStep5Res.json();
      if (profileStep5Res.status !== 201) {
        throw new Error(profileStep5Data.error || "Profile Step 5 failed");
      }

      toast.success("Signup and profile setup completed successfully! You can Login after verify your account");
      return true; // Return true if all steps are successful
    } catch (error) {
      toast.error(error.message);
      return false; // Return false if any step fails
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default usePsySignup;

function handleInputErrors({
  email,
  username,
  phoneno,
  password,
  profilePic,
  gender,
  birthDate,
  category,
  primarySkills,
  allSkills,
  language,
  chargesPerMin,
  videoChargesPerMin,
  reportCharges,
  experienceYears,
  dailyHours,
  businessSource,
  qualification,
  degreeDiploma,
  collegeName,
  learnedAstrologyFrom,
  instagramProfile,
  facebookProfile,
  linkedInProfile,
  youtubeProfile,
  websiteProfile,
  minEarningExpectation,
  maxEarningExpectation,
  countriesTraveled,
  currentJobStatus,
  longBio,
  qualitiesOfPsychic, 
  biggestChallenge,
  repeatedQuestionHandling,
  availability // Add availability to validation
}) {
  if (
    !email ||
    !username ||
    !password ||
    !profilePic ||
    !gender ||
    !phoneno ||
    !birthDate ||
    !category.length ||
    !primarySkills.length ||
    !allSkills.length ||
    !language.length ||
    !chargesPerMin ||
    !videoChargesPerMin ||
    !reportCharges ||
    !experienceYears ||
    !dailyHours ||
    !businessSource ||
    !qualification ||
    !degreeDiploma ||
    !collegeName ||
    !learnedAstrologyFrom ||
    !instagramProfile ||
    !facebookProfile ||
    !linkedInProfile ||
    !youtubeProfile ||
    !websiteProfile ||
    !minEarningExpectation ||
    !maxEarningExpectation ||
    !countriesTraveled ||
    !currentJobStatus ||
    !longBio ||
    !qualitiesOfPsychic ||
    !biggestChallenge ||
    !repeatedQuestionHandling ||
    !availability    
  ) {
    toast.error("Please fill in all fields and provide availability");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
