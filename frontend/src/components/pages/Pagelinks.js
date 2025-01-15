import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Psychics from "./Psychics";
import Navbar from "./Navbar";
import Love from "./Love";
import Psychics_profile from "./Psychics_profile";
import Psychicvop from "./Psychicvop";
import Footer from "./Web_Footer";
import Pricing from "./Pricing";
import Blogs from "../pages/Blogs_Pages/Blogs";
import Blogdetails from "../pages/Blogs_Pages//Blogdetails";
import Howitwork from "../pages/AboutPages/Howitwork";
import About from "../pages/AboutPages/About";
import Contact from "./Contact";
import Chatform from "./Chatform";
import Cheating from "../pages/Love_Pages/Cheating";
import Login from "../users/Login";
import UserRegister from "../users/UserRegister";
import Profile from "../users/Profile";
import UpdateProfile from "../users/UpdateProfile";
import Reading from "./Reading";
import AuraReading from "./AuraReading";
import Crystal_reading from "./Crystal_reading";
import Pet_psychics from "./Pet_psychics";
import Break_up from "../pages/Love_Pages/Break_up";
import Marriage_life from "../pages/Love_Pages/Marriage_life";
import Parent_children from "../pages/Love_Pages/Parent_children";
import Profile2 from "../users/Profile2";
import Howhelp from "../pages/AboutPages/Howhelp";
import Psychics_medium from "./Psychics_medium";
import Reading_topics from "./Reading_topics";
import Love_psychics from "./Love_psychics";
import Star_horoscopes from "./Star_horoscopes";
import Couple_psychics from "./Couple_psychics";
import Family_psychics from "../pages/Love_Pages/Family_psychics";
import Study_blogs from "../pages/Blogs_Pages/Study_blogs";
import Nature_blog from "../pages/Blogs_Pages/Nature_blog";
import Life_blog from "../pages/Blogs_Pages/Life_blog";
import DemoChat from "./DemoChat";
import Capricorn from "./Capricorn";
import Saturn from "./Saturn";
import { useAuthContext } from "../../context/AuthContext";
import Practical from "./Practical";
import Ambitions from "./Ambitions";
import Earth_Sign from "./Earth_Sign";
import Discipline from "./Discipline";
import Relationship from "./Relationship";
import blog_astrology from "../pages/Blogs_Pages/Blog_astrology";
import Financial from "./Financial";
import Astro_blueprint from "./Astro_blueprint";
import Goal_anaylsis from "./Goal_anaylsis";
import Money_Psychics from "./Money_Psychics";
import Pastlife from "./Pastlife";
import Missing_Person from "../pages/Psychics_Pages/Missing_Person";
import Astrology from "../pages/Psychics_Pages/Astrology";
import Numerology from "../pages/Psychics_Pages/Numerology";
import Career_Advice from "./Psychics_Pages/Career_Advice";
import Runes from "./Psychics_Pages/Runes";
import Empath_Psychics from "../pages/Love_Pages/Empath_Psychics";
import Medium_Psychics from "../pages/Love_Pages/Medium_Psychics";
import Dream_analysis from "../pages/Love_Pages/Dream_analysis";
import Clarivoyant from "../pages/Love_Pages/Clairvoyant";
import Clairsentient from "../pages/Love_Pages/Clairsentient";
import Blog_tarot from "../pages/Blogs_Pages/Blog_tarot";
import Blog_spirtual from "../pages/Blogs_Pages/Blog_spirtual";
import Blog_horocope from "../pages/Blogs_Pages/Blog_horoscope";
import Blog_realtionship from "../pages/Blogs_Pages/Blog_relationship";
import Blog_couple from "../pages/Blogs_Pages/Blog_couple";
import Blog_soulmate from "../pages/Blogs_Pages/Blog_soulmate";
import Blog_mind from "../pages/Blogs_Pages/Blog_mind";
import Blog_career from "../pages/Blogs_Pages/Blog_career";
import Checkout from "./Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { TimerProvider } from "../../context/TimerContext";
import Customer_review from "./AboutPages/Customer_review";

const initialOptions = {
  "client-id":
    "AUF5g32Q05oaYRWyJykmi9uS5CRMcqyYTgeikpeVdQU_7-yKjl66aIPe0uhWT12fj-_owkhQeQUl974q",
  currency: "USD",
  intent: "capture",
};

const Pagelinks = () => {
  const { authUser } = useAuthContext();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container container-fluid">
          <Switch>
            {/* Home Page Logic */}
            <Route exact path="/">
              {authUser ? <Chatform /> : <Redirect to="/Psychologist" />}
            </Route>

            {/* Login and Signup Routes */}
            <Route path="/login">
              {authUser ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/signup">
              {authUser ? <Redirect to="/" /> : <UserRegister />}
            </Route>

            {/* Other Routes */}
            <Route path="/demo" component={DemoChat} />
            <Route path="/checkout">
              <PayPalScriptProvider options={initialOptions}>
                <Checkout />
              </PayPalScriptProvider>
            </Route>
            <Route path="/Love" component={Love} />
            <Route path="/life" component={Life_blog} />
            <Route path="/study" component={Study_blogs} />
            <Route path="/nature" component={Nature_blog} />
            <Route path="/help" component={Howhelp} />
            <Route path="/profile" component={Profile} />
            <Route path="/family" component={Family_psychics} />
            <Route path="/reading" component={Reading_topics} />
            <Route path="/couple_psychics" component={Couple_psychics} />
            <Route path="/psychics_love" component={Love_psychics} />
            <Route path="/psychics_medium" component={Psychics_medium} />
            <Route path="/AuraReading" component={AuraReading} />
            <Route path="/UpdateProfile" component={UpdateProfile} exact />
            <Route path="/Psychicsprofile/:id" component={Psychics_profile} />
            <Route path="/Psychicvop" component={Psychicvop} />
            <Route path="/Pricing" component={Pricing} />
            <Route path="/Reading" component={Reading} />
            <Route path="/Blogs" component={Blogs} />
            <Route path="/Blogdetails/:id" component={Blogdetails} />
            <Route path="/blog_mind" component={Blog_mind} />
            <Route path="/blog_career" component={Blog_career} />
            <Route path="/blog_astrology" component={blog_astrology} />
            <Route path="/blog_tarot" component={Blog_tarot} />
            <Route path="/blog_spirtual" component={Blog_spirtual} />
            <Route path="/blog_horoscope" component={Blog_horocope} />
            <Route path="/blog_relationship" component={Blog_realtionship} />
            <Route path="/blog_couple" component={Blog_couple} />
            <Route path="/blog_soulmate" component={Blog_soulmate} />
            <Route path="/Howitworks" component={Howitwork} />
            <Route path="/About" component={About} />
            <Route path="/maritial_life" component={Marriage_life} />
            <Route path="/contact" component={Contact} />
            <Route path="/pet_psychics" component={Pet_psychics} />
            <Route path="/break_up" component={Break_up} />
            <Route path="/cheating" component={Cheating} />
            <Route path="/parent_children" component={Parent_children} />
            <Route path="/profile2" component={Profile2} />
            <Route path="/crystal_reading" component={Crystal_reading} />
            <Route path="/Psychologist" component={Psychics} exact />
            <Route path="/horoscope/capricorn" component={Capricorn} />
            <Route path="/horoscope/saturn" component={Saturn} />
            <Route path="/horoscope/wisdom" component={Practical} />
            <Route path="/horoscope/ambition" component={Ambitions} />
            <Route path="/horoscope/earth_sign" component={Earth_Sign} />
            <Route path="/horoscope/life" component={Discipline} />
            <Route path="/horoscope/relationship" component={Relationship} />
            <Route path="/horoscope/financial" component={Financial} />
            <Route path="/horoscope/astro" component={Astro_blueprint} />
            <Route path="/horoscope/goal_analysis" component={Goal_anaylsis} />
            <Route path="/money-psychics" component={Money_Psychics} />
            <Route path="/past_life" component={Pastlife} />
            <Route path="/miss_person" component={Missing_Person} />
            <Route path="/astrology" component={Astrology} />
            <Route path="/numerology" component={Numerology} />
            <Route path="/career_advice" component={Career_Advice} />
            <Route path="/runes_psychics" component={Runes} />
            <Route path="/empath_psychics" component={Empath_Psychics} />
            <Route path="/medium_psychics" component={Medium_Psychics} />
            <Route path="/dream_analysis" component={Dream_analysis} />
            <Route path="/clarivoyant_psychics" component={Clarivoyant} />
            <Route path="/reviews" component={Customer_review}/>
            <Route path="/clair_sentient_psychics" component={Clairsentient} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Pagelinks;