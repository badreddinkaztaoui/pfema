'use client';

import { useEffect } from 'react';
import emailjs from 'emailjs-com';

export default function EmailJsProvider({ children }) {
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
  }, []);

  return <>{children}</>;
}
