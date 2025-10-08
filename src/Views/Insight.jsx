import React, { useState } from 'react';
import Header from './Header';
import blogBanner from "../image/blog/banner-1.jpg";
import { useEffect } from 'react';
import UploadBlog from '../components/UploadBlog';
import Loader from '../components/Loader';
import { CallApi_Without_Token } from '../Services/Client';
import { API, WB_URL } from '../Services/Apis';
import { Helmet } from "react-helmet";
import { useNavigate, Link, } from "react-router-dom";
import { helmet } from '../Utils/Utils';
import ReactPaginate from "react-paginate";

function Insight(props) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [insightData, setInsightData] = useState([]);
    const [recentNewsData, setRecentNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAbsolute, setIsAbsolute] = useState(false);
    const compairDataString = localStorage.getItem("credential");
    const compairData = JSON.parse(compairDataString);
    const [metaData, setMetaData] = useState('');
    const api_type = props.type;

    // pagination code start
    var totalData=insightData.total_data;
    var totalPage=insightData.total_page;
    const [pageSelect, SetPageSelect] = useState();

    const handlePageClick = async (data) => {
        SetPageSelect(data.selected + 1)
    };
    // console.log(pageSelect);
    // pagination code end


    useEffect(() => {
        onpaginationClick();
    }, [pageSelect])
    useEffect(() => {
        helmet(api_type, setMetaData);
        getLoginStatus();
        fetchInfo();
        fetchInfo2();
    }, [api_type])

    const getLoginStatus = () => {
        setIsLogin(compairData);
    }
    const onpaginationClick = async () => {
        if(pageSelect){
        try {
            setLoading(true);
            setIsAbsolute(true)
            var formdata = new FormData();
            formdata.append("request_type", 'get_blog_list');
            formdata.append("page", pageSelect);
            const data = await CallApi_Without_Token('POST', API.INSIGHT_PAGE, formdata)
            // setLoading(true);
            if (data.status === 1) {
                setInsightData(data)
                setLoading(false)
                setIsAbsolute(false)
                // window.scrollTo({ top: 0, behavior: 'smooth' });

            } 
            else {
                setLoading(true);
                setIsAbsolute(true)
            }
        }
        catch (e) {
            setLoading(true);
            setTimeout(() => { navigate("/"); }, 5000);
        }
    }
    }

    const fetchInfo = async () => {
        try {
            setLoading(true)
            var formdata = new FormData();
            formdata.append("request_type", 'get_blog_list');
            formdata.append("page", pageSelect);
            const data = await CallApi_Without_Token('POST', API.INSIGHT_PAGE, formdata)
            setLoading(false)
            // console.log(data ,'insight data')
            if (data.status === 1) {
             
                setInsightData(data)
                setLoading(false)
                window.scrollTo({ top: 0, behavior: 'smooth' });
               
            } else {
                setLoading(true);
            }
            
        }
        catch (e) {
            // console.log(e,'insight error')
            setLoading(true);
            setTimeout(() => { navigate("/"); }, 5000);
        }
      
    }

    const fetchInfo2 = async () => {
        var formdata = new FormData();
        formdata.append("request_type", 'recent_news');
        const data = await CallApi_Without_Token('POST', API.INSIGHT_PAGE, formdata)
        setLoading(false)
        if (data.status === 1) {
            setRecentNewsData(data)
        }
    }




    const readmoreHandler = (each) => {
        const slug = each.slug;
        navigate(`/${slug}`);
    }





    return (
        <>
            <Helmet>
                <title>{metaData?.data?.meta_title}</title>
                <meta name="description" content={metaData?.data?.meta_description} />
                <meta name="keywords" content={metaData?.data?.meta_keyword} />
                <meta property="og:title" content={metaData?.data?.meta_title} />
                <meta property="og:description" content={metaData?.data?.meta_description} />
                <meta property="og:url" content={`${WB_URL}insight`} />
                <meta property="og:image" content="" />
                <meta property="twitter:title" content={metaData?.data?.meta_title} />
                <meta property="twitter:description" content={metaData?.data?.meta_description} />
                <meta name="twitter:image" content="" />
                <meta name="twitter:url" content={`${WB_URL}insight`} />
                <meta name="twitter:card" content="" />
            </Helmet>
            <div className="inner_pages_wrapper">
                <Header class_bg='black_bg' />
                
                {/* <!--====== Start insight Section ======--> */}
                <section className="blog-area blog-standard-style pt-60 pb-95">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-7">
                                <div className="blog-standard-wrapper">
                                <Loader show={loading} positionClass={isAbsolute}/>
                                    {Array.isArray(insightData?.data) ? <>
                                        {insightData?.data.map((each, key) => {

                                            return (
                                                <div className="blog-post-item mb-50 wow fadeInUp" data-wow-delay=".2s" key={key} id={each.id}>
                                                    {(each.media == '') ? (<div className="post-thumbnail">
                                                        {each?.media ? <img src={each.media} alt="blog image" /> : null}
                                                        <div className="play-content">
                                                            <a href={each.media_link} className="video-popup"><i className="fas fa-play"></i></a>
                                                        </div>
                                                    </div>) : (<div className="post-thumbnail">
                                                        {each?.media ? <img src={each.media} alt="" /> : null}
                                                    </div>)}

                                                    <div className="entry-content">

                                                        <div className="post-meta">
                                                            <ul>
                                                                <li><span><i className="far fa-calendar-alt"></i><a href="#">{each.created_at}</a></span></li>

                                                            </ul>
                                                        </div>
                                                        {each?.title ? <h3 className="title"><Link to="" dangerouslySetInnerHTML={{ __html: each.title }}></Link></h3> : null}
                                                        {each?.short_description ? <p dangerouslySetInnerHTML={{ __html: each.short_description }}></p> : null}
                                                        <span onClick={() => readmoreHandler(each)} id={each.id} className="main-btn filled-btn">Read More</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </> : null}

                                </div>
                                {/* pagination start */}
                                {totalPage>1?<ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    pageCount={totalPage}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination justify-content-center pagination_wrapper"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />:null}
                                
                                {/* pagination end */}
                            </div>
                            <div className="col-xl-4 col-lg-5">
                                <div className="sidebar-widget-area">
                                    {(isLogin == 1) ? (<UploadBlog />) : (null)}


                                    <div className="widget recent-post-widget mb-35 wow fadeInUp" >
                                        <h4 className="widget-title">Recent News <span className="line"></span></h4>
                                        <ul className="recent-post-list">
                                            {Array.isArray(recentNewsData?.data) ? <>
                                                {recentNewsData?.data.map((each, key) => {

                                                    return (
                                                        <li className="post-thumbnail-content" id={each.id}>
                                                            <img src={each.media} alt="post image" />
                                                            <div className="post-title-date">
                                                                <h6><span onClick={() => readmoreHandler(each)} id={each.id}>{each.title}</span></h6>
                                                                <span className="posted-on"><i className="far fa-calendar-alt"></i><Link to="#">{each.created_at}</Link></span>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </> : null}

                                        </ul>
                                    </div>
                                    <div className="widget widget-banner mb-35 wow fadeInUp">
                                        <div className="banner-content bg_cover" style={{ backgroundImage: `url(${blogBanner})` }}>
                                            <h3>Ready To Get our Expert IT Services?</h3>
                                            <Link to="/contact" className="main-btn main-btn-sm main-btn-blue">CONTACT US</Link>
                                        </div>
                                    </div>
                                    <div className="widget widget-tag-cloud mb-35 wow fadeInUp">
                                        <h4 className="widget-title">Best Tags<span className="line"></span></h4>
                                        <span>Technology</span>
                                        <span>service</span>
                                        <span>team</span>
                                        <span>solutions</span>
                                        <span>consultancy</span>
                                        <span>It Company</span>
                                        <span>agency</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!--====== End insight Section ======--> */}
            </div>

        </>
    );
}

export default Insight;