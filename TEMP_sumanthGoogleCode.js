const SignIn =(props)=>{

    const responseGoogle = (response) => {
        // console.log(response);
        let profile = response.getBasicProfile();
        console.log('Name: ' + profile.getName());
        console.log("Email: " + profile.getEmail());
        let id_token = response.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        props.SignInUpdate(true);
    }
    if(props.SignedIn===false){
    return(
        <div className = "SignIn">
            
            <h2>Temporary Sign In pagge</h2>
            {/* below is an alternate way, to implement google sign in. */}
            {/* <div class="g-signin2" data-onsuccess= {responseGoogle}></div> */}
            <GoogleLogin
            buttonText="Sign In"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            />
