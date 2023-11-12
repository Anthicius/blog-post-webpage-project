import emailjs from 'emailjs-com';

const EmailServices = (formData) => {
  const serviceID = 'x';
  const templateID = 'x'; 
  const userID = 'X'; 

  const sendEmail = () => {
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((error) => {
        console.error('FAILED...', error);
      });
  };

  return sendEmail;
};

export default EmailServices;