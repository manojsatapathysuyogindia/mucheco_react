import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Firstcome from '../components/Firstcome';

function Footer() {
    const date = new Date().getFullYear();
    const[isScroll,setIsScroll]=useState(false);
    window.addEventListener("scroll", (event) => {
        let scroll = window.scrollY;
        if(scroll>0){
            setIsScroll(true);
        }
        else{
            setIsScroll(false);
        }
    });
    
    
    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        }
 
 
  return (
    <>
    
    {/* <!--====== Start Footer ======--> */}
    <footer className="footer-area footer-default black-bg footer-map">
        {/*     <!--====== Start Newsletter Section ======--> */}
    <section className="newsletter-area newsletter-style-one">
        <div className="container">
            <div className="newsletter-wrapper bg_cover wow fadeInDown" data-aos="fade-down" data-aos-duration="1000">
                <div className="newsletter-inn">
                    <div className="">
                        <div className="newsletter-content-box">
                         
                            <div className="content">
                                <h2>Schedule Your Free Consultation</h2>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="newsletter-form">
                            <form>
                                <div className="form_group">
                                    <Link to='/contact' className="main-btn btn-black">Get a quote <i
                                            className="fas fa-arrow-right"></i></Link>
                                    <Link to='tel:+442030049800' className="main-btn btn-black transparent_btn">Book a call <i
                                            className="fas fa-arrow-right"></i></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--====== End Newsletter Section ======--> */}
        <div className="container">
            <div className="footer-widget pt-140 pb-20">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="widget about-widge wow fadeInUp" data-aos="fade-up" data-aos-duration="300">
                            <div className="logo mb-35">
                            <NavLink to='/'>
                            <img src={require("../image/logo-1.png")}
                                        alt="Theme Logo" />
                            </NavLink>
                            </div>
                            <div className="about-content">
                                <p>Empowering Your Digital Success with Decades of IT Excellence in Web & Mobile Apps Design and Development, Digital Marketing, and Comprehensive Solutions for Marketplaces like eBay, Amazon, Rakuten, Sears, and more.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="widget footer-nav-widget wow fadeInUp" data-aos="fade-up" data-aos-duration="500">
                            <h4 className="widget-title">About Us</h4>
                            <ul className="footer-nav list-style-dot">
                                <li><NavLink to="/why-choose-us"> Why Choose Us</NavLink></li>
                                        <li><NavLink to="/our-delivery-process"> Our Delivery Process</NavLink></li>
                                        <li><NavLink to="/portfolio"> Some of Our Work</NavLink></li>
                                        <li><NavLink to="/case-study"> Case Study</NavLink></li>
                                        <li><NavLink to="/career"> Career</NavLink></li>
                                        <li><NavLink to="/faq"> FAQ</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="widget footer-nav-widget wow fadeInUp" data-aos="fade-up" data-aos-duration="700">
                            <h4 className="widget-title">Contact</h4>
                            <div className="footer-nav list-style-dot">
                                <div className="address">
                                    <span>UK Address:</span>
                                    <p>Mucheco Limited<br/>Unit 2 Leavesden Lodge,1a Leavesden Road, Prohal, Watford, WD24 5FR, United Kingdom</p>
                                    <p>
                                        <span className="footer_phone"><i className="far fa-phone"></i></span>+44 20 3004 9800
                                    </p>
                                        <p><i className="far fa-envelope"></i><span><Link
                                            to="mailto:hotline@gmail.com">sales@mucheco.com</Link></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="widget footer-nav-widget wow fadeInUp" data-aos="fade-up" data-aos-duration="900">
                            <h4 className="widget-title">Contact 2</h4>
                            <div className="footer-nav list-style-dot">
                                <div className="address address2">
                                    <span>US  Address:</span>
                                    <p>SuyogComputechInc <br/>345 Plainfield Ave, Ste. 102, Edison, NJ 08817,USA</p>
                                    <p>
                                        <span className="footer_phone"><i className="far fa-phone"></i></span>+1 732 931 7070
                                    </p>
                                        <p><i className="far fa-envelope"></i><span><Link
                                            to="mailto:hotline@gmail.com">sales@mucheco.com</Link></span></p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="footer-copyright">
                <div className="row">
                    <div className="col-md-5">
                        <ul className="social-link">
                            <li><Link to="https://www.facebook.com/muchecoltd" target='_blank'><i className="fab fa-facebook-f"></i></Link></li>
                            <li><Link to="https://www.instagram.com/mucheco_ltd/"><i className="fab fa-instagram"></i></Link></li>
                            {/* <li><Link to="https://twitter.com/muchecodotcom" target='_blank'><svg viewBox="0 0 24 24" aria-hidden="true" class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg></Link></li> */}
                            <li><Link to="https://www.linkedin.com/company/mucheco" target='_blank'><i className="fab fa-linkedin"></i></Link></li>
                            <li><Link to="https://www.youtube.com/c/muchecodotcom" target='_blank'><i className='fab fa-youtube'></i></Link></li>
                            
                        </ul>
                    </div>
                    <div className="col-md-7">
                        <ul className="imp-link float-md-right float-sm-none">
                            
                            <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                            <li><NavLink to="/terms-of-use">Terms of Use</NavLink></li>
                            <li><NavLink to="/quality-policy">Quality Policy </NavLink></li>
                            <li><NavLink to="/disclaimer">Disclaimer </NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright footer-copyright-bottom">
               <p className='disclamer_footer'>DISCLAIMER: mucheco.com, nor its operators are affiliated with or funded by Amazon.com, Inc in any way.</p>
               <p className='copy_rgt'>Copyright © {date} mucheco</p>
            </div>
        </div>
        {isScroll?(<span className='scrollToTop' onClick={scrollToTop}>scroll to top</span>):(null)}
    
    </footer>
    {/* <!--====== End Footer ======--> */}

    </>
    );
}

export default Footer;