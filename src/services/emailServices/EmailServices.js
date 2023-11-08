import emailjs from 'emailjs-com';

const EmailServices = (formData) => {
  const serviceID = 'service_5taob1n';
  const templateID = 'template_z4p98pc'; 
  const userID = 'WtnhdTHsR98LwEjeM'; 

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