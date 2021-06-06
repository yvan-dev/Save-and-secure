import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_ncpf51d', 'template_ughw7vi', e.target, 'user_4u1tq0zcGaB6Zm0gRAzxK')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

    return (
    <div>
      <form onSubmit={sendEmail}>
      </form>
      <script src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js">
      (
        function() {
        emailjs.init("user_4u1tq0zcGaB6Zm0gRAzxK")
        }
      )();
      </script>
	</div> 
  ); 
}