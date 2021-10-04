import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Banner() {
  const url = 'https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174';
  return (
    <div className="h-12 mt-5 pt-5 sm:h-16 md:h-16 lg:h-16 xl:h-16 bd-white border-t border-gray-primary mb-2">
      <div>
        <span className="align-">
          © Copyright 2020 Lucian Boatright-Roberts. All Rights Reserved.
        </span>
      </div>
      <div>
        <a herf="https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174">Privacy</a>
        <Link to={ROUTES.CONTACT}>Contact Us</Link>
      </div>
    </div>
  );
}
