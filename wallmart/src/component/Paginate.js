import React from 'react'
import {Pagination} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {
    console.log(isAdmin);
    return (
        pages > 1 ? <Pagination className='justify-center'>
          { page > 1 ? <LinkContainer  to={ !isAdmin ? (keyword ? `/search/${keyword}/page/${page-1}`: `/page/${page - 1}`):
             `/admin/products/${page-1}`}>

                <Pagination.Prev className="font-weight-bold"></Pagination.Prev>
               
            </LinkContainer> : null
            }
            {[...Array(pages).keys()].map((x)=>{
                return(
            <LinkContainer key={x+1} to={ !isAdmin ? (keyword ? `/search/${keyword}/page/${x+1}`: `/page/${x+1}`) :(
                `/admin/products/${x+1}`) }>

                <Pagination.Item  active={x+1 === page}>{x+1}</Pagination.Item>
               
            </LinkContainer>
            )}
            )}
            {
                page !== pages && <LinkContainer  to={ !isAdmin ? (keyword ? `/search/${keyword}/page/${page+1}`: `/page/${page + 1}`)
                    :`/admin/products/${page+1}` }>

                <Pagination.Next style={{fontSize:'12px'}}/>
               
            </LinkContainer> 
            }
        </Pagination> : null
    
    )
    
}

export default Paginate;
