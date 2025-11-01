import Header from './Header';
import React, { useEffect, useState } from 'react';
import { CallApi_Without_Token } from '../Services/Client';
import { API, WB_URL } from '../Services/Apis';
import { Helmet } from 'react-helmet';
import { helmet } from '../Utils/Utils';
function Quality_policy(props) {
    const [privacypolicy, privacypolicyData] = useState([]);
    const[metaData,setMetaData]=useState('');
    const api_type = props.type;
    useEffect(()=>{
        helmet(api_type,setMetaData);
    },[api_type])
    useEffect(() => {

        fetchInfo();
    }, [])

    const fetchInfo = async () => {
        var formdata = new FormData();
        formdata.append("request_type", 'policy');
        formdata.append("slug", 'quality-policy');
        const data = await CallApi_Without_Token('POST', API.PRIVACY_POLICY, formdata)
        if (data.status === 1) {
            privacypolicyData(data)
            window.scrollTo({ top: 0, behavior: 'smooth' });

        }
    }
    return (
        <>
            <div className="inner_pages_wrapper">
                <Header class_bg='black_bg' />
                <Helmet>
                    <title>{metaData?.data?.meta_title}</title>
                    <meta name="description" content={metaData?.data?.meta_description} />
                    <meta name="keywords" content={metaData?.data?.meta_keyword} />
                    <meta property="og:title" content={ metaData?.data?.meta_title}/>
                    <meta property="og:description" content={metaData?.data?.meta_description}/>
                    <meta property="og:url" content={`${WB_URL}quality-policy`}/>
                    <meta property="og:image" content=""/>
                    <meta property="twitter:title" content={ metaData?.data?.meta_title}/>
                    <meta property="twitter:description" content={metaData?.data?.meta_description}/>
                    <meta name="twitter:image" content=""/>
                    <meta name="twitter:url" content={`${WB_URL}quality-policy`}/>
                    <meta name="twitter:card" content=""/>
                </Helmet>
                <section>
                    <div className="container">
                        <div className="std">
                            <div className='some_policys'>
                                <div dangerouslySetInnerHTML={{ __html: privacypolicy?.data?.description }} />
                                {/* {privacypolicy?.data?.description} */}

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Quality_policy;