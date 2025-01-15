// Linkedpages.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import update_comment from "./Update_comment";
import Psychics_review from './Psychics_review'
const Linkedpages = () => {


  return (
    <Router>
      <div className="App">
        <Header />
        <Sidenav2 />
        <Switch>
          <Route
            path="/admin/pages/Psychics_profile_details"
            component={Psychics_profile_details}
          />
          <Route path="/admin/pages/Home" component={Home} />
          <Route
            path="/admin/pages/Psychics_list"
            component={Psychics_Userlist}
          />
         <Route path="/admin/pages/update_comment" component={update_comment}/>
          <Route path="/admin/pages/reviews" component={Psychics_review}/>
          <Route path="/admin/pages/blog_comment" component={blog_comment}/>
          <Route path="/admin/pages/request" component={People_contact}/>
          <Route path="/admin/pages/add_psychics" component={Psychics_add}/>
          <Route path="/admin/pages/psychic_profile/:id" component={Psychics_profile_details}/>
          <Route path="/admin/pages/faq/update" component={FAQForm} />
          <Route path="/admin/pages/Psychics_update" component={Psychicsform} />
          <Route path="/admin/pages/pricing_update" component={PricingForm} />
          <Route path="/admin/pages/multi_pages" component={Multipages} />
          <Route path="/admin/pages/how_work_update" component={Workform} />
          <Route path="/admin/pages/how_help_update" component={Helpform} />
          <Route path="/admin/pages/about_update" component={Aboutform} />
          <Route path="/admin/pages/Users" component={Users} />
          <Route path="/admin/pages/User_profile" component={User_profile} />
          <Route path="/admin/pages/Mail" component={Mail} />
          <Route path="/admin/pages/Read_mail" component={Read_mail} />
          <Route path="/admin/pages/Pages/" component={Pages} />
          <Route path="/admin/pages/News" component={News} />
          <Route path="/admin/pages/blog_list" component={Blog_list} />
          <Route path="/admin/pages/love_blog" component={Love_blog} />
          <Route
            path="/admin/pages/astrology_blog"
            component={Astrology_blog}
          />
          <Route path="/admin/pages/career_blog" component={Career_blog} />
          <Route
            path="/admin/pages/horoscope_blog"
            component={Horoscope_blog}
          />
          <Route path="/admin/pages/mind_blog" component={Mind_blog} />
          <Route path="/admin/pages/nature_blog" component={Nature_blog} />
          <Route
            path="/admin/pages/realtionship_blog"
            component={Relationship_blog}
          />
          <Route path="/admin/pages/soulmate_blog" component={Soulmate_blog} />
          <Route
            path="/admin/pages/spirituality_blog"
            component={Spirituality_blog}
          />
          <Route path="/admin/pages/study_blog" component={Study_blog} />
          <Route path="/admin/pages/tarot_blog" component={Tarot_blog} />

          <Route
            path="/admin/pages/Pricing_details"
            component={Pricing_details}
          />
          <Route
            path="/admin/pages/Pricing_section"
            component={Pricing_section}
          />
          <Route path="/admin/pages/Comments" component={Comments} />
          <Route path="/admin/pages/testimonials" component={Testimonials} />
          <Route path="/admin/pages/page_details" component={page_details} />
          <Route path="/admin/pages/Faq" component={Faq} />
          <Route path="/admin/pages/Visitors" component={Visitors} />
          <Route path="/admin/pages/Psychics" component={Psychics_detail}/>
          <Route
            path="/admin/pages/payment_gateways"
            component={payment_gateways}
          />
          <Route path="/admin/pages/adduser" component={Useradd}/>
          <Route
            path="/admin/pages/accepted_payment"
            component={accepted_payment}
          />
          <Route
            path="/admin/pages/anaylsis_update"
            component={Goal_anaylsisform}
          />
          <Route path="/admin/pages/love_psychics" component={Love_Psychics} />
          <Route path="/admin/pages/astro_update" component={Astroform} />
          <Route
            path="/admin/pages/financial_update"
            component={Financialform}
          />
          <Route
            path="/admin/pages/life_dis_update"
            component={Disciplineform}
          />
          <Route path="/admin/pages/earthsign_update" component={Earthform} />
          <Route path="/admin/pages/ambition_update" component={Ambitionform} />
          <Route path="/admin/pages/horoscopes" component={horoscopes_pages} />
          <Route path="/admin/pages/accounts" component={accounts} />
          <Route path="/admin/pages/updatePsy" component={Psyform} />
          <Route path="/admin/pages/petpage" component={Petform} />
          <Route path="/admin/pages/updateAura" component={Auraform} />
          <Route path="/admin/pages/update_crystal" component={Crystalform} />
          <Route path="/admin/pages/medium_update" component={Mediumform} />
          <Route
            path="/admin/pages/update_horoscope"
            component={horoscopeform}
          />
          <Route path="/admin/pages/capricorn" component={Capricornform} />
          <Route path="/admin/pages/saturn_update" component={Saturnform} />
          <Route
            path="/admin/pages/update_practical"
            component={Practicalform}
          />
          <Route
            path="/admin/pages/relation_ship_update"
            component={Relationform}
          />
          <Route path="/admin/pages/money_update" component={Moneyform} />
          <Route
            path="/admin/pages/past_life_update"
            component={Pastlifeform}
          />
          <Route path="/admin/pages/person_update" component={Personform} />
          <Route
            path="/admin/pages/astrology_update"
            component={Astrologyform}
          />
          <Route
            path="/admin/pages/numerology_update"
            component={Numerologyform}
          />
          <Route path="/admin/pages/career_update" component={Careerform} />
          <Route path="/admin/pages/rune_update" component={Runeform} />

          {/* love pages  */}
          <Route path="/admin/pages/love_update" component={LoveForm} />
          <Route path="/admin/pages/update_break_up" component={Breakupform} />
          <Route
            path="/admin/pages/update_cheating_page"
            component={Cheatingform}
          />
          <Route
            path="/admin/pages/clariyont_update"
            component={Clairvoyantform}
          />
          <Route path="/admin/pages/dream_update" component={Dreamform} />
          <Route path="/admin/pages/empath_update" component={Empathform} />
          <Route path="/admin/pages/family_update" component={Familyform} />
          <Route path="/admin/pages/martial_update" component={Martialform} />
          <Route path="/admin/pages/medium_update" component={Mediumform} />
          <Route path="/admin/pages/parent_update" component={Parentform} />
          <Route
            path="/admin/pages/clarisentient_update"
            component={Clarisentientform}
          />

          {/* Blogs pages here  */}

          <Route path="/admin/pages/Blogs" component={Blogs_pages} />
          <Route path="/admin/pages/add_blog" component={Blogform} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Linkedpages;
