import emailjs from 'emailjs-com';

export const initEmailJS = () => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
};
