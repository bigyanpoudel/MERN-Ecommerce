import React from 'react'
import Helmet from 'react-helmet'; 
const UseMeta = ({title,descContent,keyword,descKeyword}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta
            name='descriptions'
            content={descContent}
            />
            <meta
            name='keyword'
            content={descKeyword}
            />
        </Helmet>
    )
}

export default UseMeta
