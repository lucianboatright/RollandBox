import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Banner() {
  const url = 'https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174';
  return (
    <div className="h-12 mt-5 pt-5 pl-2 pr-2 sm:h-16 md:h-16 lg:h-16 xl:h-16 sm:text-base md:text-base lg:text-base xl:text-base bd-white border-t border-gray-primary mb-2">
      <div style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}>
        <span className="flex justify-center">
          © Copyright 2020 Lucian Boatright-Roberts. All Rights Reserved. &nbsp;
          <span />
          <span className="no-underline"> &nbsp;</span>
          <a
            className="underline"
            href="https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>
          <span className="no-underline">. & &nbsp;</span>
          <Link className="underline" to={ROUTES.CONTACT}>
            <span>Contact Us.</span>
          </Link>
        </span>
      </div>
    </div>
  );
}