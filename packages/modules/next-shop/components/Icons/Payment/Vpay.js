import * as React from 'react';

function SvgVpay(props) {
  return (
    <svg
      viewBox="0 0 40 44"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={40}
      height={44}
      {...props}
    >
      <path fill="#2b1877" d="M0 0h39.92v43.247H0z" />
      <path fill="#fff" d="M1 .997h37.922v27.087H1z" />
      <path
        d="M29.55 5.913l-7.44 17.761h-4.86L13.587 9.498a1.962 1.962 0 00-1.089-1.562 19.453 19.453 0 00-4.536-1.509l.108-.514h7.818a2.144 2.144 0 012.121 1.809l1.936 10.275 4.781-12.084h4.824"
        fill="#2b1877"
        fillRule="nonzero"
      />
      <path
        d="M11.57 35.025c.229.051.465.073.7.064 1.08 0 1.739-.554 1.739-1.522 0-.917-.611-1.407-1.611-1.407a3.764 3.764 0 00-.833.073l.005 2.792zm-1.432-3.847c.73-.123 1.469-.18 2.208-.169a3.466 3.466 0 012.336.674c.514.465.797 1.132.777 1.825a2.573 2.573 0 01-.684 1.875 3.407 3.407 0 01-2.5.88 3.907 3.907 0 01-.7-.051v3.114h-1.432l-.005-8.148zM20.89 35.845l-.622-2.031c-.152-.5-.28-1.068-.399-1.545h-.023c-.117.477-.234 1.054-.375 1.545l-.609 2.031h2.028zm-2.266 1.139l-.68 2.341h-1.492l2.538-8.256h1.84l2.575 8.256h-1.552l-.718-2.341h-2.511zM26.45 39.325v-3.443l-2.5-4.813h1.641l.952 2.118c.268.614.469 1.077.681 1.643h.023c.199-.527.425-1.043.692-1.643l.953-2.118h1.632l-2.631 4.777v3.48l-1.443-.001z"
        fill="#fff"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgVpay;
