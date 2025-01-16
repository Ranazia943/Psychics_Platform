import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import Psy_messageRoutes from "./routes/psy_message.routes.js";
import userRoutes from "./routes/user.routes.js";
import psyauthRoutes from "./routes/psyauth.routes.js";
import psychicsRoutes from "./routes/psychics.routes.js"
import psyprofile from  "./routes/Psychics/profile.routes.js"
import proposalRoutes from "./routes/proposal.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import requestRoutes from './routes/proposal.routes.js';

////pages routes 
import psypageRoutes from './routes/Pages/PsyPage.routes.js'
import crystalRoutes from './routes/Pages/Crystal.routes.js'
import AuraRoutes from './routes/Pages/Aura.routes.js'
import PetRoutes from './routes/Pages/Pet.routes.js'
import MediumRoutes from './routes/Pages/Medium.routes.js'
import horoscopes from './routes/Horoscopes/horoscope.routes.js'
import Capricorn from './routes/Horoscopes/Capricorn.routes.js'
import Saturn from './routes/Horoscopes/Saturn.routes.js'
import Practical from './routes/Horoscopes/Practical.routes.js'
import Ambition from './routes/Horoscopes/Ambition.routes.js'
import Earth from "./routes/Horoscopes/Earth.routes.js";
import Discipline from "./routes/Horoscopes/Discipline.routes.js";
import Relationship from './routes/Horoscopes/Relation.routes.js'
import Financial from './routes/Horoscopes/Financial.routes.js'
import Astro from './routes/Horoscopes/Astro.routes.js'
import Goal_analysis from './routes/Horoscopes/Goal.routes.js'
import MoneyPage from './routes/Pages/Money.routes.js'
import Pastlife from './routes/Pages/Pastlife.routes.js'
import MissPerson from './routes/Pages/MissPerson.routes.js'
import Astrology from './routes/Pages/Astrology.routes.js'
import Numerology from "./routes/Pages/Numerology.routes.js";
import Career from './routes/Pages/Career.routes.js'
import RunePage from "./routes/Pages/Rune.routes.js";

///love pages
import LovePage from './routes/Love_Pages/Love.routes.js'
import BreakPage from './routes/Love_Pages/Break.routes.js'
import Cheating from './routes/Love_Pages/Cheating.routes.js'
import Clairvoyant from './routes/Love_Pages/Clarivoyant.routes.js'
import Dream_Page from './routes/Love_Pages/Dream.routes.js'
import Empath_Page from './routes/Love_Pages/Empath.routes.js'
import Family from './routes/Love_Pages/Family.routes.js'
import Martial from './routes/Love_Pages/Martial.routes.js'
import Medium from './routes/Love_Pages/Medium.routes.js'
import Parent from './routes/Love_Pages/Parent.routes.js'
import clair_sentient from './routes/Love_Pages/Clairsentient.routes.js'

// blog post 
import BlogPost from './routes/Blogs/Blog.routes.js'
import About from './routes/AboutPages/About.routes.js'
import How_work from './routes/AboutPages/Howwork.routes.js'
import help from './routes/AboutPages/Help.routes.js'
import Pricing from './routes/AboutPages/Pricing.routes.js'
import Faq from './routes/AboutPages/FAQ.routes.js'
import paypal from './routes/Psychics/Paypal.routes.js'
import { app, server } from "./socket/socket.js";
import timer from './routes/Psychics/Timer.routes.js'
import wallet from './routes/Psychics/Wallet.routes.js'
import paidtimer from './routes/Psychics/Paidtimer.routes.js'
import useragent from 'express-useragent'; // This is necessary for the useragent middleware
import visitors from './routes/visitor.routes.js'
import logVisitor from "./middleware/logvisitors.js";
import mail from "./routes/Mail.routes.js"
import request from "./routes/Request.routes.js";
import social from './routes/social.routes.js'
import blogcomment from './routes/Blogs/Blogcomment.routes.js'
import rating from './routes/Psychics/Rating.routes.js'
import monthly from './routes/Psychics/Monthly.routes.js'
import profilestep2 from './routes/Psychics/Profilestep2.routes.js'
import profilestep3 from './routes/Psychics/Profilestep3.routes.js'
import profilestep4 from './routes/Psychics/Profilestep4.routes.js';
import profilestep5 from './routes/Psychics/Profilestep5.routes.js'
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use(useragent.express()); // Attach useragent middleware to express

// Log visitors on the homepage
app.get('/', logVisitor, (req, res) => {
  res.send('Welcome to the website!');
});
app.use("/api/profilestep2", profilestep2)
app.use("/api/profilestep3", profilestep3)
app.use("/api/profilestep4", profilestep4)
app.use("/api/profilestep5", profilestep5)

app.use("/api/rating", rating)
app.use("/api/monthly", monthly)
app.use("/api/visitors", visitors)
app.use("/api/mail",mail)
app.use("/api/freetimer", timer)
app.use("/api/paidtimer", paidtimer)
app.use("/api/paypal", paypal)
app.use("/api/wallet", wallet)
app.use("/api/auth", authRoutes);
app.use("/api/psychics", psychicsRoutes)
app.use("/api/messages", messageRoutes);
app.use("/api/PsyMessage", Psy_messageRoutes);
app.use("/api/users", userRoutes);
app.use ("/api/psychics/data", psyprofile)
app.use("/api/psychics", psyauthRoutes);
app.use ("/api/proposals", proposalRoutes);
app.use('/api/request', requestRoutes);
app.use("/api/requestcontact", request)
app.use("/api/social", social)
///pages update api's
app.use("/api/comment", blogcomment)
app.use ('/api/', crystalRoutes)
app.use ('/api/', psypageRoutes);
app.use ('/api/',AuraRoutes)
app.use ('/api/',PetRoutes)
app.use ('/api/', MediumRoutes)
app.use ('/api/', horoscopes)
app.use ('/api/', Capricorn)
app.use('/api/', Saturn)
app.use('/api/', Practical)
app.use("/api/", Ambition);
app.use('/api/',Earth)
app.use("/api/", Discipline);
app.use('/api/', Relationship)
app.use('/api/', Financial)
app.use('/api/', Astro)
app.use('/api/', Goal_analysis)
app.use('/api/', MoneyPage)
app.use('/api',Pastlife)
app.use('/api/', MissPerson)
app.use('/api/', Astrology)
app.use ('/api/', Numerology)
app.use('/api/', Career)
app.use('/api/',RunePage)
///love pages 
app.use ('/api/', LovePage)
app.use ('/api/', BreakPage)
app.use('/api/', Cheating)
app.use('/api/', Clairvoyant)
app.use("/api/", Dream_Page);
app.use('/api/',Empath_Page);
app.use ('/api/', Family)
app.use('/api/', Martial)
app.use('/api/', Medium)
app.use('/api/', Parent)
app.use("/api/", clair_sentient);
/// blog post 

app.use('/api/', BlogPost)
app.use('/api/', About)
app.use('/api/', How_work)
app.use('/api/', help)
app.use('/api/', Pricing)
app.use('/api/', Faq)
// app.use(express.static(path.join(__dirname, "frontend")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist"));
// });

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
