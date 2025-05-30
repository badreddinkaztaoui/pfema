import emailjs from 'emailjs-com';

export const initEmailJS = () => {
  emailjs.init(process.env.EMAILJS_USER_ID);
};
