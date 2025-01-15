import React, { useEffect, useState } from "react";
import "../assets/style.css";
import logo from "../Images/logo.png";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import Search from "./Search";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Navbar = () => {
  const { loading, logout } = useLogout();

  const { authUser } = useAuthContext();

  useEffect(() => {
    const addClickEventListeners = (elements, callback) => {
      elements.forEach((element, index) => {
        element.addEventListener("click", () => {
          callback(index);
        });
      });
    };

    const toggleActive = (elements, index) => {
      elements.forEach((element, i) => {
        const isClicked = i === index;
        element.classList.toggle("active", isClicked);
      });
    };

    // Modal variables and event listeners
    const modal = document.querySelector("[data-modal]");
    const modalCloseOverlay = document.querySelector("[data-modal-overlay]");
    const modalCloseBtn = document.querySelector("[data-modal-close]");

    if (modalCloseOverlay) {
      modalCloseOverlay.addEventListener("click", () => {
        if (modal) {
          modal.classList.add("closed");
        }
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => {
        if (modal) {
          modal.classList.add("closed");
        }
      });
    }

    // Notification toast variables and event listeners
    const notificationToast = document.querySelector("[data-toast]");
    const toastCloseBtn = document.querySelector("[data-toast-close]");

    if (toastCloseBtn) {
      toastCloseBtn.addEventListener("click", () => {
        if (notificationToast) {
          notificationToast.classList.add("closed");
        }
      });
    }

    // Mobile menu variables and event listeners
    const mobileMenuOpenBtns = document.querySelectorAll(
      "[data-mobile-menu-open-btn]"
    );
    const mobileMenus = document.querySelectorAll("[data-mobile-menu]");

    addClickEventListeners(mobileMenuOpenBtns, (index) => {
      toggleActive(mobileMenus, index);
    });

    const mobileMenuCloseBtns = document.querySelectorAll(
      "[data-mobile-menu-close-btn]"
    );
    const overlay = document.querySelector("[data-overlay]");

    addClickEventListeners(mobileMenuCloseBtns, () => {
      mobileMenus.forEach((menu) => {
        menu.classList.remove("active");
      });

      if (overlay) {
        overlay.classList.remove("active");
      }
    });

    const accordionBtns = document.querySelectorAll("[data-accordion-btn]");
    const submenus = document.querySelectorAll("[data-accordion]");

    addClickEventListeners(accordionBtns, (index) => {
      submenus.forEach((submenu, i) => {
        const clicked = i === index;
        submenu.classList.toggle("active", clicked);
        accordionBtns[i].classList.toggle("active", clicked);
      });

      // Add logic to close the submenu when clicking the remove icon
      const removeIcons = accordionBtns[index].querySelectorAll(".remove-icon");
      removeIcons.forEach((removeIcon) => {
        removeIcon.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent the click event from propagating to the accordion button
          // Define 'submenu' here
          const submenu = submenus[index];
          submenu.classList.remove("active");
          accordionBtns[index].classList.remove("active");
        });
      });
      const closeMobileMenu = () => {
        mobileMenus.forEach((menu) => {
          menu.classList.remove("active");
        });

        if (overlay) {
          overlay.classList.remove("active");
        }
      };

      // Add click event listeners to links that trigger navigation
      const pageLinks = document.querySelectorAll("[data-page-link]");
      pageLinks.forEach((link) => {
        link.addEventListener("click", () => {
          closeMobileMenu();
        });
      });
    });
  }, []);

  ////show modal in navbar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header>
      <div class="header-main" data-aos="zoom-in-down">
        <div class="container">
          <a class="header-logo">
            <img src={logo} alt="Anon's logo" width="100" height="90" />
          </a>

          {/*  Search bar  */}
          <div className="col-12 col-md-6 mt-2 mt-md-0">
            <Route render={() => <Search />} />
          </div>

          <div class="header-user-actions">
            {authUser ? (
              <>
                <div className="ml-4 d-inline">
                  <Link to="/profile2" className="btn btn-link text-white mr-2">
                    Profile
                  </Link>

                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>
                  <NavLink to="/signup" className="Navlink">
                    Create Account
                  </NavLink>
                </span>
                <NavLink to="/login" className="Navlink">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <nav class="desktop-navigation-menu">
        <div class="container">
          <ul class="desktop-menu-category-list">
            <li class="menu-category"></li>
            <li class="menu-category">
              <a className="menu-title">
                <NavLink to="/Home"> </NavLink>
              </a>
            </li>

            <li class="menu-category">
              <a class="menu-title">
                {" "}
                <NavLink to="/Psychologist" className="Navlink">
                  {" "}
                  Psychics Reading<span className="down-arrow">&darr;</span>
                </NavLink>{" "}
              </a>

              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <NavLink to="/AuraReading" className="Reading">
                    {" "}
                    Aura Reading
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/crystal_reading" className="Reading">
                    Crystal Reading
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/pet_psychics" className="">
                    Pet Psychics
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="money-psychics" className="Reading">
                    Money Psychics{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/past_life" className="Reading">
                    Past Life Psychics{" "}
                  </NavLink>
                </li>{" "}
                <li class="dropdown-item">
                  <NavLink to="/miss_person" className="Reading">
                    Missing Person Psychics{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/astrology" className="Reading">
                    Astrology Psychics{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/numerology" className="Reading">
                    Numerology Psychics{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/career_advice" className="Reading">
                    Career Advice Psychics{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/runes_psychics" className="Reading">
                    Runes Psychics{" "}
                  </NavLink>
                </li>
              </ul>
            </li>

            <li class="menu-category">
              <a class="menu-title">
                {" "}
                <NavLink to="/Love" className="Navlink">
                  Love Psychics <span className="down-arrow">&darr;</span>
                </NavLink>{" "}
              </a>

              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <NavLink to="/break_up" className="Reading">
                    Break_up Psychcis
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/cheating" className="Reading">
                    Cheating Affairs{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/family" className="Reading">
                    Family Affairs{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/maritial_life" className="Reading">
                    Maritial Life{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/parent_children" className="Reading">
                    {" "}
                    Parent & Children{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/empath_psychics" className="Reading">
                    {" "}
                    Empath Psychics
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/medium_psychics" className="Reading">
                    {" "}
                    Medium Psychics{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/dream_analysis" className="Reading">
                    {" "}
                    Dream Analysis Psychics{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/clarivoyant_psychics" className="Reading">
                    {" "}
                    Clarivoyant Psychics{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/clair_sentient_psychics" className="Reading">
                    {" "}
                    Clairsentient Psychics{" "}
                  </NavLink>
                </li>
              </ul>
            </li>

            <li class="menu-category">
              <a class="menu-title">
                {" "}
                <NavLink to="/Psychicvop" className="Navlink">
                  Horoscopes <span className="down-arrow">&darr;</span>
                </NavLink>{" "}
              </a>

              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <NavLink to="/horoscope/capricorn" className="Reading">
                    Capricorn Insight
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/horoscope/goal_analysis" className="Reading">
                    Goal Analysis
                  </NavLink>
                </li>

                {/* <li class="dropdown-item">
                  <NavLink to="/star_horoscopes" className="Reading">
                    Star Horoscopes
                  </NavLink>
                </li> */}

                <li class="dropdown-item">
                  <NavLink to="/horoscope/life" className="Reading">
                    Life Horocopes{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/horoscope/financial" className="Reading">
                    Financial Mastery Horocopes{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/horoscope/wisdom" className="Reading">
                    Practical Wisdom
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/horoscope/saturn" className="Reading">
                    Saturn Horocopes
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/horoscope/wisdom" className="Reading">
                    Practical Wisdom
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/horoscope/ambition" className="Reading">
                    Ambition Focus
                  </NavLink>
                </li>
              </ul>
            </li>

            <li class="menu-category">
              <a class="menu-title">
                {" "}
                <NavLink to="/Blogs" className="Navlink">
                  Blogs <span className="down-arrow">&darr;</span>
                </NavLink>{" "}
              </a>

              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <NavLink to="/life" className="Reading">
                    Life Cycle{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/study" className="Reading">
                    Study Blogs{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/nature" className="Reading">
                    Nature Blogs{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/blog_astrology" className="Reading">
                    Astrology Blogs{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/blog_tarot" className="Reading">
                    Tarot Blogs{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/blog_horoscope" className="Reading">
                    Horocopes Blogs{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/blog_couple" className="Reading">
                    Love Blogs{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/blog_relationship" className="Reading">
                    Relationship Blogs{" "}
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/blog_soulmate" className="Reading">
                    Soulmate Blogs
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/blog_mind" className="Reading">
                    Mind, Body, Spirit
                  </NavLink>
                </li>
                <li class="dropdown-item">
                  <NavLink to="/blog_career" className="Reading">
                    Career, Money{" "}
                  </NavLink>
                </li>
              </ul>
            </li>

            <li class="menu-category">
              <a class="menu-title">
                {" "}
                <NavLink to="/About" className="Navlink">
                  About <span className="down-arrow">&darr;</span>
                </NavLink>{" "}
              </a>

              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <NavLink to="/howitworks" className="Reading">
                    How it Works{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/help" className="Reading">
                    How we Help{" "}
                  </NavLink>
                </li>

                <li class="dropdown-item">
                  <NavLink to="/reviews" className="Reading">
                    Customer Reviews{" "}
                  </NavLink>
                </li>
              </ul>
            </li>

            <NavLink to="/Pricing" className="Navlink">
              <li class="menu-category">
                <a class="menu-title">Pricing</a>
              </li>
            </NavLink>

            <NavLink to="/contact" className="Navlink">
              <li class="menu-category">
                <a class="menu-title">Contact us </a>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>

      <div class="mobile-bottom-navigation">
        <button class="action-btn" data-mobile-menu-open-btn>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 20 20"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <NavLink to="/login">
          <button class="action-btn">
            <ion-icon name="home-outline">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
                <path d="M11.234 8l0.766-0.555-2.083-3.221c-0.092-0.14-0.249-0.225-0.417-0.225h-4c-0.168 0-0.325 0.084-0.417 0.225l-2.083 3.221 0.766 0.555 1.729-2.244 0.601 1.402-2.095 3.841h1.917l0.333 5h1v-5h0.5v5h1l0.333-5h1.917l-2.095-3.842 0.601-1.402 1.729 2.244z"></path>
              </svg>
            </ion-icon>
          </button>
        </NavLink>

        <NavLink to="/signup">
          <button class="action-btn" data-mobile-menu-open-btn>
            <ion-icon name="grid-outline">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 11.5c0-2.363 1.498-4.383 3.594-5.159 0.254-0.571 0.406-1.206 0.406-1.841 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h6.208c-0.135-0.477-0.208-0.98-0.208-1.5z"></path>
                <path d="M11.5 7c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5zM14 12h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"></path>
              </svg>
            </ion-icon>
          </button>
        </NavLink>
      </div>

      <nav class="mobile-navigation-menu  has-scrollbar" data-mobile-menu>
        <div class="menu-top">
          <h2 class="menu-title"></h2>

          <button class="menu-close-btn" data-mobile-menu-close-btn>
            <ion-icon name="close-outline">X</ion-icon>
          </button>
        </div>

        <ul class="mobile-menu-category-list">
          <li class="menu-category">
            <button class="accordion-menu" data-accordion-btn>
              <p
                class="menu-title"
                name="removeicon"
                data-mobile-menu-close-btn
              >
                {" "}
                <NavLink to="/Psychics" className="text-gray">
                  {" "}
                  Psychics Reading
                </NavLink>
              </p>

              <div>
                <ion-icon
                  name="add-outline"
                  class="add-icon"
                  style={{ fontSize: "30px" }}
                >
                  {" "}
                  +
                </ion-icon>
                <ion-icon
                  name="remove-outline"
                  class="remove-icon "
                  style={{ fontSize: "40px" }}
                >
                  -
                </ion-icon>
              </div>
            </button>

            <ul class="submenu-category-list" data-accordion>
              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/AuraReading"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Aura Reading
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/crystal_reading"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Crystal Reading
                  </NavLink>
                </a>
              </li>
              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/pet_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Pet Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/money-psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Money Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/past_life"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Past Life Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/miss_person"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Missing Person Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/astrology"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Astrology Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/numerology"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Numerology Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/career_advice"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Career Advice Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/runes_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Runes Psychics
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>

          <li class="menu-category">
            <button class="accordion-menu" data-accordion-btn>
              <p
                class="menu-title"
                name="removeicon"
                data-mobile-menu-close-btn
              >
                {" "}
                <NavLink to="/love" className="text-gray">
                  {" "}
                  Love Psychcis
                </NavLink>
              </p>

              <div>
                <ion-icon
                  name="add-outline"
                  class="add-icon"
                  style={{ fontSize: "30px" }}
                >
                  {" "}
                  +
                </ion-icon>
                <ion-icon
                  name="remove-outline"
                  class="remove-icon "
                  style={{ fontSize: "40px" }}
                >
                  -
                </ion-icon>
              </div>
            </button>

            <ul class="submenu-category-list" data-accordion>
              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/break_up"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Break_up Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/cheating"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Cheating Affairs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/family"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Family Affairs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/maritial_life"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Maritial Life
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/parent_children"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Parent Children
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/empath_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Empath Psychcis
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/medium_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Medium Psychcis
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/dream_analysis"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Dream Analysis
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/clarivoyant_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Clarivoyant Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/clair_sentient_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Clairsentient Psychics
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/clair_sentient_psychics"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Clairsentient Psychics
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>

          {/* horoscope */}

          <li class="menu-category">
            <button class="accordion-menu" data-accordion-btn>
              <p
                class="menu-title"
                name="removeicon"
                data-mobile-menu-close-btn
              >
                {" "}
                <NavLink to="/Psychicvop" className="text-gray">
                  {" "}
                  Horocopes
                </NavLink>
              </p>

              <div>
                <ion-icon
                  name="add-outline"
                  class="add-icon"
                  style={{ fontSize: "30px" }}
                >
                  {" "}
                  +
                </ion-icon>
                <ion-icon
                  name="remove-outline"
                  class="remove-icon "
                  style={{ fontSize: "40px" }}
                >
                  -
                </ion-icon>
              </div>
            </button>

            <ul class="submenu-category-list" data-accordion>
              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/capricorn"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Capricorn Insight
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/goal_analysis"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Goal Analysis
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/star_horoscopes"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Star Horocopes
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/life"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Life Horoscope
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/financial"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Financial Mastery
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/wisdom"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Practical wisdom
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/saturn"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Saturn Horocopes
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/wisdom"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Practical Wisdom
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/horoscope/ambition"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Ambition Focus
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>

          {/* Blogs */}

          <li class="menu-category">
            <button class="accordion-menu" data-accordion-btn>
              <p
                class="menu-title"
                name="removeicon"
                data-mobile-menu-close-btn
              >
                {" "}
                <NavLink to="/Blogs" className="text-gray">
                  {" "}
                  Blogs
                </NavLink>
              </p>

              <div>
                <ion-icon
                  name="add-outline"
                  class="add-icon"
                  style={{ fontSize: "30px" }}
                >
                  {" "}
                  +
                </ion-icon>
                <ion-icon
                  name="remove-outline"
                  class="remove-icon "
                  style={{ fontSize: "40px" }}
                >
                  -
                </ion-icon>
              </div>
            </button>

            <ul class="submenu-category-list" data-accordion>
              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/life"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Life Cycle
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/study"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Study Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/nature"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Nature Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_astrology"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Astrology Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_tarot"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Tarot Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_horoscope"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Horocopes Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_couple"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Love Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_relationship"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Relationship Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_soulmate"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Soulmate Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_mind"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Mind Body Blogs
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/blog_career"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    Career Blogs
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>

          {/* about contact */}

          <li class="menu-category">
            <button class="accordion-menu" data-accordion-btn>
              <p
                class="menu-title"
                name="removeicon"
                data-mobile-menu-close-btn
              >
                {" "}
                <NavLink to="/About" className="text-gray">
                  {" "}
                  About
                </NavLink>
              </p>

              <div>
                <ion-icon
                  name="add-outline"
                  class="add-icon"
                  style={{ fontSize: "30px" }}
                >
                  {" "}
                  +
                </ion-icon>
                <ion-icon
                  name="remove-outline"
                  class="remove-icon "
                  style={{ fontSize: "40px" }}
                >
                  -
                </ion-icon>
              </div>
            </button>

            <ul class="submenu-category-list" data-accordion>
              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/howitworks"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    How it Works
                  </NavLink>
                </a>
              </li>

              <li class="submenu-category">
                <a class="submenu-title">
                  <NavLink
                    to="/help"
                    name="removeicon"
                    data-mobile-menu-close-btn
                    style={{ fontWeight: 400, color: "gray" }}
                  >
                    How we help
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>

          <p class="menu-title" name="removeicon" data-mobile-menu-close-btn>
            {" "}
            <NavLink to="/pricing" className="text-gray">
              {" "}
              Pricing
            </NavLink>
          </p>

          <p class="menu-title" name="removeicon" data-mobile-menu-close-btn>
            {" "}
            <NavLink to="/contact" className="text-gray">
              {" "}
              Contact us
            </NavLink>
          </p>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
