async function signupFormHandler(event) {
    event.preventDefault();

    // getting data from the form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({
            userName:username,
            password:password,
            email:email
          }),
          headers: { 'Content-Type': 'application/json' }
        }); 
    // check the response status
   
    if (response.ok) {
        console.log('success');

        // loginHandler();
        document.location.replace('/feed');

      } else {
        alert(response.statusText);
      }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler); 