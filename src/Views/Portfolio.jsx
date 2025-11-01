import React, { useState, useEffect } from 'react';
import Header from './Header';
import { getUniqueValues } from '../Utils/Utils';
import {useLocation,Link,useNavigate,useParams} from 'react-router-dom';
import { API, WB_URL } from '../Services/Apis';
import { Helmet } from "react-helmet";
import Loader from '../components/Loader';
import {helmet} from '../Utils/Utils';

function Portfolio(props) {
    const { state } = useLocation();
    // console.log(state.eachServicePOrtfolio,'each portfolio**************************');
    
        let location  = useLocation();
        const navigate = useNavigate();
        
       
    const [loading, setLoading] = useState(false);
    const [portfolio_lang, setportfolio_lang] = useState([]);
    const [allPortfolioData, setallPortfolioData] = useState();
    const [clickedLang, setClickedLang] = useState('All');
    const [servicePageLang, setServicePageLang] = useState('All');
    const[metaData,setMetaData]=useState('');
    
    const api_type = props.type;



    useEffect( () => {
        // if(state?.eachServicePOrtfolio){
        //     setClickedLang(state.eachServicePOrtfolio);
        // } 
        // if(state?.eachServicePOrtfolio==='Amazon'){
        //     setClickedLang('All');
        // }
        // console.log(state?.eachServicePOrtfolio)
        console.log(portfolio_lang,"portfolio_lang--",state?.eachServicePOrtfolio)

        portfolio_lang?.map(item=>{
            console.log(item.toLowerCase()==state?.eachServicePOrtfolio.toLowerCase(),"Hey Lingaraj")
            console.log(item,state?.eachServicePOrtfolio)
            if(item.toLowerCase()==state?.eachServicePOrtfolio.toLowerCase()){
                setClickedLang(state.eachServicePOrtfolio);
                
            }
        })
    }, [portfolio_lang])
    
    // useEffect( () => {
    //     portfolio_lang?.map((each) => console.log(each))
      
    // }, [servicePageLang])

//    console.log(state.eachServicePOrtfolio)
    useEffect( () => {
        helmet(api_type,setMetaData);
        fetchPortfolio();
    }, [api_type])

    const fetchPortfolio = () => {
        
        
        var formdata = new FormData();
        formdata.append("request_type", "portfolio");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        setLoading(true)

        fetch(API.PORTFOLIO, requestOptions)
        
            .then(response => response.text())
            .then(result => {
                setLoading(false)
                let res = JSON.parse(result)
                setallPortfolioData(res);
                window.scrollTo({top: 0, behavior: 'smooth'});


                let data = getUniqueValues(res)

                setportfolio_lang(data)
                // portfolio lang get
                // console.log(portfolio_lang,"portfolio_lang--")
                // portfolio_lang?.map(item=>{
                //     if(item===state?.eachServicePOrtfolio){
                //         setClickedLang(state.eachServicePOrtfolio);
                //     }else{
                //         setClickedLang('All');
                //     }
                // })
                
                

                // setPortfolioAllData(JSON.parse(result))
            }
            

            )
            
            .catch(() => {
                setLoading(true);
                setTimeout(() => {navigate("/");},5000);
            });
    }
    // var searchkey = portfolioFilterdData?.data[0]?.search_key;
    // console.log(portfolio_lang);
    // console.log(allPortfolioData);



    // const portfolio_lang = ['All', 'Magento', 'Wordpress', 'Mobile App', 'React', 'Angular', 'Shopify', 'bigcommerce'];
    const [fullImgUrl, setFullImgUrl] = useState('');
    const fullImgData = {};
    const showFullImageHandle = (url) => {
        setFullImgUrl(url)
    }
    const cancelFullImageHandle = () => {
        setFullImgUrl('');
    }

   
    // console.log(portfolio_lang);



    return (
        <>
            <div className="inner_pages_wrapper">
                <Header class_bg='black_bg'/>
                <Loader show={loading} />
                <Helmet>
                <title>{metaData?.data?.meta_title}</title>
                <meta name="description" content={metaData?.data?.meta_description} />
                <meta name="keywords" content={metaData?.data?.meta_keyword} />
                <meta property="og:title" content={ metaData?.data?.meta_title}/>
                    <meta property="og:description" content={metaData?.data?.meta_description}/>
                    <meta property="og:url" content={`${WB_URL}portfolio`}/>
                    <meta property="og:image" content=""/>
                    <meta property="twitter:title" content={ metaData?.data?.meta_title}/>
                    <meta property="twitter:description" content={metaData?.data?.meta_description}/>
                    <meta name="twitter:image" content=""/>
                    <meta name="twitter:url" content={`${WB_URL}portfolio`}/>
                    <meta name="twitter:card" content=""/>
            </Helmet>
                {/* <!--====== Start portfolio Section ======--> */}
                <section className="portfolio-area pt-80 pb-70" id="masonry-portfolio">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="section-title text-center mb-50">
                                    <span className="sub-title sub-title-bg blue-light-bg">OUR PORTFOLIO</span>
                                    <h2 className="">200+ Successful Projects<br />
                                        Explore Our Work</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="portfolio-filter-wrap">
                                <div className="portfolio-filter-button text-center wow" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                    <ul className="filter-btn">
                                        {Array.isArray(portfolio_lang) ? <>
                                            {portfolio_lang?.map((each,key) => <li key={key} onClick={() => setClickedLang(each)} className={each == clickedLang ? 'active' : null}>{each}</li>)}
                                        </> : null}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row masonry-row" style={{ position: 'relative' }}>
                            {Array.isArray(allPortfolioData?.data) ? <>
                                {allPortfolioData?.data.map((each,key) => {
                                    if(clickedLang===each?.search_key)
                                    {
                                        return (
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={key}>
                                                <div className="portfolio-block-five mb-50 wow fadeInUp">
                                                    <div className="portfolio-img">
                                                        <img src={each?.image} alt="project Image" />
                                                        <div className="portfolio-img-overlay" onClick={() => { showFullImageHandle(each?.image) }}>
                                                            <span><i className="far fa-search-plus"></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="portfolio-content">
                                                        <h3 className="title"><span className="">{each?.site_name}</span></h3>
                                                        <span className="cat-btn">{each?.language}</span>
                                                        <div><Link to={each?.site_link} className="view_project" target='_blank'>View Project <span><i className="far fa-long-arrow-right"></i></span></Link></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }else if(clickedLang==='All'){
                                        return (
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="portfolio-block-five mb-50 wow fadeInUp">
                                                    <div className="portfolio-img">
                                                        <img src={each?.image} alt="project Image" />
                                                        <div className="portfolio-img-overlay" onClick={() => { showFullImageHandle(each?.image) }}>
                                                            <span><i className="far fa-search-plus"></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="portfolio-content">
                                                        <h3 className="title"><span  className="">{each?.site_name}</span></h3>
                                                        <span className="cat-btn">{each?.language}</span>
                                                        <div><Link to={each?.site_link} className="view_project" target='_blank'>View Project <span><i className="far fa-long-arrow-right"></i></span></Link></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </> : null}
                            
                        </div>
                    </div>
                </section>
                {/* <!--====== End portfolio Section ======--> */}
            </div>
            {(fullImgUrl) ? (<div className="image-popup">
                <div className="image-popup-inner">
                <div className="cancel_img_popup" onClick={cancelFullImageHandle}><span></span></div>
                <img src={fullImgUrl} alt="" />
                </div>
                </div>
            ) : ''}
        </>
    );
}

export default Portfolio;