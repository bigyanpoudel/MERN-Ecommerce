import React,{useEffect,useLayoutEffect} from 'react'
import {Row,Col,Container,Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {getProfile} from '../store/action/actionCreator';
import Loader from '../component/Loader'; 
import {RESET_PROFILE} from '../store/action/actionTypes';
const Profile = ({history}) => {
    const {auth,userProfile} = useSelector(state=>{
        return{
            auth:state.auth,
            userProfile:state.userProfile
        }
    });
    const {profile,loading} = userProfile;
    const dispatch = useDispatch()
    useLayoutEffect(() => {
       dispatch({type:RESET_PROFILE});
    }, [dispatch])
    useEffect(()=>{
        if(!auth.isAuthenticated)
        {
            history.push('/signin');
        }else{
            if(!profile.name)
            {
                dispatch(getProfile());
            }
           
        }
    },[auth,history,dispatch,profile])
    return (
        <Container>
            {
                loading ? <Loader/> :
                <Row className="justify-content-md-center">
                <Col xs={12} md={6} className="Border">
                <h1>Your profile</h1>
                    <Col md={7} sm={12}>
                        <Row>
                            <Col>Name</Col>
                            <Col>{profile.name}</Col>
                        </Row>
                        <Row>
                            <Col>email</Col>
                            <Col>{profile.email}</Col>
                        </Row>
                        <Row>
                            <Button className="btn btn-light">Update Profile</Button>
                        </Row>
                    </Col>
                </Col>
            </Row>
                
            }
            
        </Container>
    )
}

export default Profile
