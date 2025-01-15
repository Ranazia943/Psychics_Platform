// Linkedpages.js

import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Sidenav2 from "./Sidenav2";
import Footer from "./Footer";
import Psychics_Userlist from "./Psychics_Userlist";
import Psychics_profile_details from "./Psychics_profile_details";
import Users from "./Users";
import User_profile from "./User_profile";
import Mail from "./Mail";
import Read_mail from "./Read_mail";
import Pages from "./Pages";
import News from "./Update_Blogs/News";
import Blog_list from "./Update_Blogs/Blog_list";
import Pricing_details from "./Pricing_details";
import Pricing_section from "./Pricing_section";
import Comments from "./Comments";
import Testimonials from "./testimonials";
import page_details from "./page_details";
import Faq from "./Faq";
import Visitors from "./Visitors";
import payment_gateways from "./Payment_gateways";
import accepted_payment from "./accepted_payment";
import accounts from "./accounts";
import Psyform from "./Update_Pages/Psyform";
import Petform from "./Update_Pages/Petform";
import Auraform from "./Update_Pages/Auraform";
import Crystalform from "./Update_Pages/Crystalform";
import horoscopes_pages from "./horoscopes_pages";
import horoscopeform from "./Update_Pages/horoscopeform";
import Capricornform from "./Update_Pages/Capricornform";
import Saturnform from "./Update_Pages/Sturnform";
import Practicalform from "./Update_Pages/Practicalform";
import Ambitionform from "./Update_Pages/Ambitionform";
import Earthform from "./Update_Pages/Earthform";
import Disciplineform from "./Update_Pages/Disciplineform";
import Relationform from "./Update_Pages/Relationform";
import Financialform from "./Update_Pages/Financialform";
import Astroform from "./Update_Pages/Astroform";
import Goal_anaylsisform from "./Update_Pages/Goal_anaylsisform";
import Moneyform from "./Update_Pages/Moneyform";
import Pastlifeform from "./Update_Pages/Pastlifeform";
import Personform from "./Update_Pages/Personform";
import Astrologyform from "./Update_Pages/Astrologyform";
import Numerologyform from "./Update_Pages/Numerologyform";
import Love_Psychics from "./Love_Psychics";
import Blogs_pages from "./Blogs_pages";
import Careerform from "./Update_Pages/Careerform";
import Runeform from "./Update_Pages/Runeform";
import LoveForm from "./Update_Love/Loveform";
import Breakupform from "./Update_Love/Breakupform";
import Cheatingform from "./Update_Love/Cheatingform";
import Clairvoyantform from "./Update_Love/Clarivoyantform";
import Dreamform from "./Update_Love/Dreamform";
import Empathform from "./Update_Love/Empathform";
import Familyform from "./Update_Love/Familyform";
import Martialform from "./Update_Love/Martialform";
import Mediumform from "./Update_Love/Mediumform";
import Parentform from "./Update_Love/Parentform";
import Clarisentientform from "./Update_Love/Clarisentientform";
import Blogform from "./Update_Blogs/Blogform";
import Love_blog from "./Update_Blogs/Love_blog";
import Astrology_blog from "./Update_Blogs/Astrology_blog";
import Career_blog from "./Update_Blogs/Career_blog";
import Horoscope_blog from "./Update_Blogs/Horoscope_blog";
import Mind_blog from "./Update_Blogs/Mind_blog";
import Nature_blog from "./Update_Blogs/Nature_blog";
import Relationship_blog from "./Update_Blogs/Relationship_blog";
import Soulmate_blog from "./Update_Blogs/Soulmate_blog";
import Spirituality_blog from "./Update_Blogs/Spirituality_blog";
import Study_blog from "./Update_Blogs/Study_blog";
import Tarot_blog from "./Update_Blogs/Tarot_blog";
import Multipages from "./Update_AboutPages/Multipages";
import Aboutform from "./Update_AboutPages/Aboutform";
import Workform from "./Update_AboutPages/Workform";
import Helpform from "./Update_AboutPages/Helpform";
import PricingForm from "./Update_AboutPages/Pricingform";
import Psychicsform from "./Update_Pages/Psychicsform";
import FAQForm from "./Update_AboutPages/Faqform";
import Psychics_detail from "./Psychics_detail";
import Useradd from './Useradd'
import Psychics_add from './Psychics_add'
import People_contact from './People_contact'
import blog_comment from './blog_comment'
import Update_comment from "./Update_comment";
import Psychics_review from './Psychics_review'
import AdminLogin from "./AdminLogin";
import { useAdminAuthContext } from "../../context/AdminAuthContext"; // Import the Admin Auth context

const Linkedpages = () => {
  const { adminUser } = useAdminAuthContext(); // Get the authenticated admin user

  // Function to render protected routes
  const renderProtectedRoute = (Component, path) => {
    return adminUser ? <Component /> : <Redirect to="/admin/login" />;
  };

  return (
    <Router>
      <div className="App">
        {/* Conditionally render Header and Sidenav */}
        {adminUser && <Header />}
        {adminUser && <Sidenav2 />} {/* Show sidenav only if admin is logged in */}

        <Switch>
          <Route path="/admin/login" component={AdminLogin} />

          {/* Protected Routes */}
          <Route path="/admin/pages/Home" render={() => renderProtectedRoute(Home)} />
          <Route path="/admin/pages/Psychics_list" render={() => renderProtectedRoute(Psychics_Userlist)} />
          <Route path="/admin/pages/update_comment" render={() => renderProtectedRoute(Update_comment)} />
          <Route path="/admin/pages/Psychics_review" render={() => renderProtectedRoute(Psychics_review)} />
          <Route path="/admin/pages/update_comment" render={() => renderProtectedRoute(Update_comment)} />
          <Route path="/admin/pages/reviews" render={() => renderProtectedRoute(Psychics_review)} />
          <Route path="/admin/pages/blog_comment" render={() => renderProtectedRoute(blog_comment)} />
          <Route path="/admin/pages/request" render={() => renderProtectedRoute(People_contact)} />
          <Route path="/admin/pages/add_psychics" render={() => renderProtectedRoute(Psychics_add)} />
          <Route path="/admin/pages/psychic_profile/:id" render={() => renderProtectedRoute(Psychics_profile_details)} />
          <Route path="/admin/pages/faq/update" render={() => renderProtectedRoute(FAQForm)} />
          <Route path="/admin/pages/Psychics_update" render={() => renderProtectedRoute(Psychicsform)} />
          <Route path="/admin/pages/pricing_update" render={() => renderProtectedRoute(PricingForm)} />
          <Route path="/admin/pages/multi_pages" render={() => renderProtectedRoute(Multipages)} />
          <Route path="/admin/pages/how_work_update" render={() => renderProtectedRoute(Workform)} />
          <Route path="/admin/pages/how_help_update" render={() => renderProtectedRoute(Helpform)} />
          <Route path="/admin/pages/about_update" render={() => renderProtectedRoute(Aboutform)} />
          <Route path="/admin/pages/Users" render={() => renderProtectedRoute(Users)} />
          <Route path="/admin/pages/User_profile" render={() => renderProtectedRoute(User_profile)} />
          <Route path="/admin/pages/Mail" render={() => renderProtectedRoute(Mail)} />
          <Route path="/admin/pages/Read_mail" render={() => renderProtectedRoute(Read_mail)} />
          <Route path="/admin/pages/Pages/" render={() => renderProtectedRoute(Pages)} />
          <Route path="/admin/pages/News" render={() => renderProtectedRoute(News)} />
          <Route path="/admin/pages/blog_list" render={() => renderProtectedRoute(Blog_list)} />
          <Route path="/admin/pages/love_blog" render={() => renderProtectedRoute(Love_blog)} />
          <Route path="/admin/pages/astrology_blog" render={() => renderProtectedRoute(Astrology_blog)} />
          <Route path="/admin/pages/career_blog" render={() => renderProtectedRoute(Career_blog)} />
          <Route path="/admin/pages/horoscope_blog" render={() => renderProtectedRoute(Horoscope_blog)} />
          <Route path="/admin/pages/mind_blog" render={() => renderProtectedRoute(Mind_blog)} />
          <Route path="/admin/pages/nature_blog" render={() => renderProtectedRoute(Nature_blog)} />
          <Route path="/admin/pages/realtionship_blog" render={() => renderProtectedRoute(Relationship_blog)} />
          <Route path="/admin/pages/soulmate_blog" render={() => renderProtectedRoute(Soulmate_blog)} />
          <Route path="/admin/pages/spirituality_blog" render={() => renderProtectedRoute(Spirituality_blog)} />
          <Route path="/admin/pages/study_blog" render={() => renderProtectedRoute(Study_blog)} />
          <Route path="/admin/pages/tarot_blog" render={() => renderProtectedRoute(Tarot_blog)} />

          <Route path="/admin/pages/Pricing_details" render={() => renderProtectedRoute(Pricing_details)} />
          <Route path="/admin/pages/Pricing_section" render={() => renderProtectedRoute(Pricing_section)} />
          <Route path="/admin/pages/Comments" render={() => renderProtectedRoute(Comments)} />
          <Route path="/admin/pages/testimonials" render={() => renderProtectedRoute(Testimonials)} />
          <Route path="/admin/pages/page_details" render={() => renderProtectedRoute(page_details)} />
          <Route path="/admin/pages/Faq" render={() => renderProtectedRoute(Faq)} />
          <Route path="/admin/pages/Visitors" render={() => renderProtectedRoute(Visitors)} />
          <Route path="/admin/pages/Psychics" render={() => renderProtectedRoute(Psychics_detail)} />
          <Route path="/admin/pages/payment_gateways" render={() => renderProtectedRoute(payment_gateways)} />
          <Route path="/admin/pages/adduser" render={() => renderProtectedRoute(Useradd)} />
          <Route path="/admin/pages/accepted_payment" render={() => renderProtectedRoute(accepted_payment)} />
          <Route path="/admin/pages/anaylsis_update" render={() => renderProtectedRoute(Goal_anaylsisform)} />
          <Route path="/admin/pages/love_psychics" render={() => renderProtectedRoute(Love_Psychics)} />
          <Route path="/admin/pages/astro_update" render={() => renderProtectedRoute(Astroform)} />
          <Route path="/admin/pages/financial_update" render={() => renderProtectedRoute(Financialform)} />
          <Route path="/admin/pages/life_dis_update" render={() => renderProtectedRoute(Disciplineform)} />
          <Route path="/admin/pages/earthsign_update" render={() => renderProtectedRoute(Earthform)} />
          <Route path="/admin/pages/ambition_update" render={() => renderProtectedRoute(Ambitionform)} />
          <Route path="/admin/pages/horoscopes" render={() => renderProtectedRoute(horoscopes_pages)} />
          <Route path="/admin/pages/accounts" render={() => renderProtectedRoute(accounts)} />
          <Route path="/admin/pages/updatePsy" render={() => renderProtectedRoute(Psyform)} />
          <Route path="/admin/pages/petpage" render={() => renderProtectedRoute(Petform)} />
          <Route path="/admin/pages/updateAura" render={() => renderProtectedRoute(Auraform)} />
          <Route path="/admin/pages/update_crystal" render={() => renderProtectedRoute(Crystalform)} />
          <Route path="/admin/pages/medium_update" render={() => renderProtectedRoute(Mediumform)} />
          <Route path="/admin/pages/update_horoscope" render={() => renderProtectedRoute(horoscopeform)} />
          <Route path="/admin/pages/capricorn" render={() => renderProtectedRoute(Capricornform)} />
          <Route path="/admin/pages/saturn_update" render={() => renderProtectedRoute(Saturnform)} />
          <Route path="/admin/pages/update_practical" render={() => renderProtectedRoute(Practicalform)} />
          <Route path="/admin/pages/relation_ship_update" render={() => renderProtectedRoute(Relationform)} />
          <Route path="/admin/pages/money_update" render={() => renderProtectedRoute(Moneyform)} />
          <Route path="/admin/pages/past_life_update" render={() => renderProtectedRoute(Pastlifeform)} />
          <Route path="/admin/pages/person_update" render={() => renderProtectedRoute(Personform)} />
          <Route path="/admin/pages/astrology_update" render={() => renderProtectedRoute(Astrologyform)} />
          <Route path="/admin/pages/numerology_update" render={() => renderProtectedRoute(Numerologyform)} />
          <Route path="/admin/pages/career_update" render={() => renderProtectedRoute(Careerform)} />
          <Route path="/admin/pages/rune_update" render={() => renderProtectedRoute(Runeform)} />

          {/* love pages  */}
          <Route path="/admin/pages/love_update" render={() => renderProtectedRoute(LoveForm)} />
          <Route path="/admin/pages/update_break_up" render={() => renderProtectedRoute(Breakupform)} />
          <Route path="/admin/pages/update_cheating_page" render={() => renderProtectedRoute(Cheatingform)} />
          <Route path="/admin/pages/clariyont_update" render={() => renderProtectedRoute(Clairvoyantform)} />
          <Route path="/admin/pages/dream_update" render={() => renderProtectedRoute(Dreamform)} />
          <Route path="/admin/pages/empath_update" render={() => renderProtectedRoute(Empathform)} />
          <Route path="/admin/pages/family_update" render={() => renderProtectedRoute(Familyform)} />
          <Route path="/admin/pages/martial_update" render={() => renderProtectedRoute(Martialform)} />
          <Route path="/admin/pages/medium_update" render={() => renderProtectedRoute(Mediumform)} />
          <Route path="/admin/pages/parent_update" render={() => renderProtectedRoute(Parentform)} />
          <Route path="/admin/pages/clarisentient_update" render={() => renderProtectedRoute(Clarisentientform)} />
          <Route path="/admin/pages/Update_comment" render={() => renderProtectedRoute(Update_comment)} />
          {/* Blogs pages here  */}
          <Route path="/admin/pages/Blogs" render={() => renderProtectedRoute(Blogs_pages)} />
          <Route path="/admin/pages/add_blog" render={() => renderProtectedRoute(Blogform)} />

          {/* Redirect to login if trying to access any other page */}
        </Switch>
        {adminUser && <Footer />} {/* Show footer only if admin is logged in */}
      </div>
    </Router>
  );
};

export default Linkedpages;
