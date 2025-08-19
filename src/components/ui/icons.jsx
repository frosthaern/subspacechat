import * as React from "react"

export const Icons = {
  logo: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  spinner: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  gitHub: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  google: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.8 10.5c.2 1.1.2 2.3 0 3.4 0 .1 0 .1 0 0-1.7-7.4-11-7.4-11 0 0 0 0 .1 0 0 .2 1.1.2 2.3 0 3.4 0 0 0 .1 0 0 1.7 7.4 11 7.4 11 0 0 0 0-.1c0 0 0-.1 0-.1z" />
      <path d="M12 15.2c3.1 0 5.7-2.6 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7-3.1 0-5.7 2.6-5.7 5.7 0 3.1 2.6 5.7 5.7 5.7z" />
      <path d="M12 15.2c-1.2 0-2.3-.4-3.2-1.1-.9-.7-1.5-1.7-1.8-2.8-.4-1.1-.3-2.3.1-3.3.4-1 1.1-1.9 2-2.5.9-.6 1.9-.9 3-.9 1.2 0 2.3.4 3.2 1.1" />
      <path d="M12 15.2c1.2 0 2.3-.4 3.2-1.1.9-.7 1.5-1.7 1.8-2.8.4-1.1.3-2.3-.1-3.3-.4-1-1.1-1.9-2-2.5" />
    </svg>
  ),
  // Add more icons as needed
};
