import type { CSSProperties, SVGProps } from 'react';
import clsx from 'clsx';

export function OnboardingGoalsImage({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="onboarding-start-image"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 162.87 185.3"
      className={clsx(className, 'overflow-visible')}
      {...props}
    >
      <defs>
        <linearGradient
          id="linear-gradient-3"
          x1={82.19}
          y1={98.77}
          x2={70.03}
          y2={112.96}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#86cdd9" />
          <stop offset={1} stopColor="#24a6b3" />
        </linearGradient>

        <linearGradient
          id="linear-gradient-4"
          x1={72.79}
          y1={99.86}
          x2={96.5}
          y2={108.57}
          xlinkHref="#linear-gradient-3"
        />

        <linearGradient
          id="linear-gradient-5"
          x1={45.38}
          y1={154.6}
          x2={89.16}
          y2={117.58}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#010101" />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>

        <style>
          {
            '.cls-2{fill:#fff}.cls-3{fill:#f0932c}.cls-6{fill:#f9b03d}.cls-9{fill:#f6e58d}.cls-11{fill:#f9ca24}.cls-15{fill:#30336b}'
          }
        </style>
      </defs>

      <g id="Capa_1-2">
        <path
          className="cls-15"
          d="M58.05 135.88c-.02.12-.02.25-.02.37v-.37h.02Z"
        />

        <path
          className={clsx('cls-11', 'AnimationTwinkling')}
          d="M139.62 150.16s.1-7.76 7.76-7.76c0 0-7.76-.1-7.76-7.76 0 0-.1 7.76-7.76 7.76 0 0 7.76.1 7.76 7.76ZM44.63 185.3s.1-7.76 7.76-7.76c0 0-7.76-.1-7.76-7.76 0 0-.1 7.76-7.76 7.76 0 0 7.76.1 7.76 7.76ZM91.67 59.17s.1-7.76 7.76-7.76c0 0-7.76-.1-7.76-7.76 0 0-.1 7.76-7.76 7.76 0 0 7.76.1 7.76 7.76ZM120.7 173.54s.06-4.56 4.56-4.56c0 0-4.56-.06-4.56-4.56 0 0-.06 4.56-4.56 4.56 0 0 4.56.06 4.56 4.56ZM21.85 174.34s.06-4.56 4.56-4.56c0 0-4.56-.06-4.56-4.56 0 0-.06 4.56-4.56 4.56 0 0 4.56.06 4.56 4.56Z"
        />

        <g
          id="coin-right"
          className={clsx('AnimationFloat')}
          style={
            {
              '--animation-float-y': '-0.5rem',
            } as CSSProperties
          }
        >
          <circle
            className="cls-3"
            cx={143.96}
            cy={112.94}
            r={8.44}
            transform="rotate(-83.42 143.946 112.945)"
          />

          <path
            className="cls-11"
            d="M149.95 106.92c2.89 3.66 2.26 8.96-1.39 11.85s-8.96 2.26-11.85-1.39c-2.89-3.66-2.26-8.96 1.39-11.85 3.66-2.89 8.96-2.26 11.85 1.39Z"
          />

          <path
            className="cls-3"
            d="M148.96 107.71a7.16 7.16 0 0 1-1.18 10.07 7.16 7.16 0 0 1-10.07-1.18 7.16 7.16 0 0 1 1.18-10.07 7.16 7.16 0 0 1 10.07 1.18Z"
          />

          <path
            className="cls-11"
            d="M145.71 110.89c-.38-.07-.76-.05-1.13.07a11.082 11.082 0 0 0-1.34.54c-.34.15-.62.28-.85.36l-.09.03c-.24.09-.46.12-.67.11s-.38-.1-.51-.27c-.19-.24-.24-.52-.14-.84.05-.16.14-.32.27-.48.13-.17.31-.34.53-.51.1-.08.2-.15.31-.22.19-.12.39-.22.61-.32.35-.14.71-.24 1.09-.3l-.33-1.14c-.39.03-.8.14-1.22.33-.31.14-.61.3-.89.49l-.69-.88-.87.69.72.91c-.25.26-.44.52-.58.78-.23.44-.34.87-.3 1.28.03.41.18.78.44 1.11.31.39.66.62 1.04.69.38.07.76.05 1.12-.07.28-.09.61-.21.98-.38.12-.05.25-.11.37-.17.26-.12.49-.22.68-.29.09-.04.18-.07.26-.1.24-.08.46-.12.67-.11a.7.7 0 0 1 .52.28c.18.23.22.51.12.82-.06.19-.19.39-.38.6-.12.13-.27.26-.44.4-.14.11-.28.2-.43.29-.24.15-.51.27-.79.37-.45.16-.87.24-1.27.24l.3 1.16c.42.02.9-.08 1.43-.28.37-.15.73-.33 1.07-.55l.7.89.87-.69-.71-.89c.3-.29.53-.59.69-.89.24-.45.34-.87.31-1.28-.03-.41-.18-.78-.44-1.11-.3-.39-.65-.61-1.03-.68Z"
          />
        </g>

        <g
          id="coin-left"
          className={clsx('AnimationFloat')}
          style={
            {
              '--animation-float-y': '0.5rem',
            } as CSSProperties
          }
        >
          <path
            className="cls-3"
            d="M33.04 144.31a8.436 8.436 0 0 1-10.57 5.54 8.436 8.436 0 0 1-5.54-10.57c1.39-4.45 6.12-6.93 10.57-5.54s6.93 6.12 5.54 10.57Z"
          />

          <path
            className="cls-11"
            d="M33.34 143.34a8.436 8.436 0 0 1-10.57 5.54 8.436 8.436 0 0 1-5.54-10.57 8.436 8.436 0 0 1 10.57-5.54 8.436 8.436 0 0 1 5.54 10.57Z"
          />

          <path
            className="cls-3"
            d="M32.13 142.97a7.17 7.17 0 1 1-13.69-4.27 7.17 7.17 0 0 1 13.69 4.27Z"
          />

          <path
            className="cls-11"
            d="M27.67 142.07c-.16-.35-.39-.65-.69-.89-.26-.21-.6-.44-1.01-.68-.06-.04-.13-.08-.2-.12-.32-.19-.58-.36-.78-.49-.03-.02-.05-.04-.08-.06-.2-.15-.36-.31-.47-.49a.656.656 0 0 1-.06-.58c.09-.3.3-.49.61-.59.16-.05.34-.07.55-.05a3.866 3.866 0 0 1 1.07.28c.2.09.41.2.61.33.32.2.6.45.86.74l.75-.91c-.25-.3-.57-.58-.96-.82-.29-.18-.59-.33-.91-.45l.33-1.07-1.06-.33-.35 1.11a3.66 3.66 0 0 0-.98-.04c-.5.06-.91.21-1.23.47-.32.26-.54.59-.67.99-.15.48-.14.89.01 1.25.16.36.39.65.69.89.23.18.52.38.87.6.11.07.23.14.35.21.24.15.45.28.62.39.08.06.16.11.23.16.2.15.36.31.47.49.11.18.13.38.06.58-.09.28-.29.47-.61.56-.2.05-.43.06-.71.02-.18-.03-.37-.07-.58-.14a2.82 2.82 0 0 1-.48-.19c-.26-.12-.51-.27-.75-.44-.38-.28-.69-.59-.91-.92l-.79.9c.22.36.57.7 1.04 1.02.33.23.68.41 1.06.57l-.34 1.08 1.06.33.34-1.09c.41.08.79.11 1.13.07.5-.06.91-.21 1.23-.47.32-.26.54-.58.67-.99.15-.47.14-.88-.02-1.23Z"
          />
        </g>

        <path
          className="cls-15"
          d="M104.75 90.82v8.51H51.56c-2.35 0-4.26-1.91-4.26-4.25 0-.1 0-.2.02-.3a4.254 4.254 0 0 1 4.25-3.96h53.19Z"
        />

        <path
          style={{
            fill: 'url(#linear-gradient-3)',
          }}
          d="M52.2 93.7h56v14.79h-56z"
        />

        <path
          className="cls-11"
          d="m95.51 67.44 27.53 4.51c2.85.47 4.81 2.95 4.39 5.53L119 128.97c-.42 2.59-3.07 4.31-5.92 3.85l-27.53-4.51c-2.84-.47-4.8-2.94-4.38-5.53l8.43-51.49c.42-2.59 3.07-4.31 5.92-3.85Z"
        />

        <path
          className="cls-3"
          transform="rotate(-80.7 93.062 98.285)"
          d="M62.22 95.85h61.68v4.87H62.22z"
        />

        <path
          className="cls-2"
          transform="rotate(-80.7 94.212 123.136)"
          d="M90.98 122.34h6.47v1.59h-6.47z"
        />

        <path
          className="cls-2"
          transform="rotate(-80.7 95.787 113.53)"
          d="M92.55 112.74h6.47v1.59h-6.47z"
        />

        <path
          className="cls-2"
          transform="rotate(-80.7 97.361 103.923)"
          d="M94.12 103.13h6.47v1.59h-6.47z"
        />

        <path
          className="cls-2"
          transform="rotate(-80.7 98.93 94.312)"
          d="M95.69 93.52h6.47v1.59h-6.47z"
        />

        <path
          className="cls-2"
          transform="rotate(-80.7 100.504 84.706)"
          d="M97.27 83.92h6.47v1.59h-6.47z"
        />

        <path
          className="cls-2"
          transform="rotate(-80.7 102.079 75.1)"
          d="M98.84 74.31h6.47v1.59h-6.47z"
        />

        <path
          className="cls-9"
          transform="rotate(-80.7 116.683 81.275)"
          d="M110.67 77.2h12.01v8.15h-12.01z"
        />

        <path
          style={{
            fill: 'url(#linear-gradient-4)',
          }}
          d="M55.03 96.47h57.32v14.79H55.03z"
        />

        <path
          d="M56.52 99.33s2.3-5.91-4.66-5.91v11.48h4.46l.2-5.58Z"
          style={{
            fill: '#24a6b3',
          }}
        />

        <path
          d="M116.41 99.33v53.1H51.56c-2.35 0-4.26-1.91-4.26-4.25v-53.1c0 2.34 1.91 4.25 4.26 4.25h64.85Z"
          style={{
            fill: '#3d4483',
          }}
        />

        <path
          d="M116.41 99.33v53.1H51.56c-2.35 0-4.26-1.91-4.26-4.25v-53.1c0 2.34 1.91 4.25 4.26 4.25h64.85Z"
          style={{
            fill: 'url(#linear-gradient-5)',
            opacity: 0.2,
          }}
        />

        <g id="cash-right">
          <path
            className="cls-6"
            transform="rotate(-45.06 120.699 33.286)"
            d="M103.6 3.3h34.2v59.97h-34.2z"
          />

          <path
            className="cls-9"
            d="m149.73 44.14-18.11 18.15a4.645 4.645 0 0 0-3.55 0l-36.4-36.31c.47-1.13.47-2.42 0-3.55l18.11-18.15c1.13.47 2.42.47 3.55 0l36.39 36.32a4.645 4.645 0 0 0 0 3.55Z"
          />

          <path
            className="cls-3"
            d="M129.96 42.53c-5.1 5.12-13.39 5.12-18.51.02-5.12-5.1-5.12-13.39-.02-18.51 5.1-5.12 13.39-5.12 18.51-.02 5.12 5.1 5.12 13.39.02 18.51Z"
          />

          <path
            className="cls-9"
            d="M123.41 37.21c.04-.68-.07-1.34-.35-1.97-.24-.54-.57-1.18-1.01-1.9-.07-.11-.14-.23-.21-.35-.34-.57-.61-1.04-.8-1.41-.03-.05-.05-.1-.07-.15-.2-.4-.31-.78-.33-1.15-.02-.37.1-.68.38-.96.39-.39.87-.53 1.45-.42.29.05.58.18.9.37.32.2.65.48 1 .83.16.16.3.32.45.5.24.31.47.64.68 1.01.32.58.57 1.2.74 1.86l1.93-.81c-.13-.68-.41-1.37-.82-2.08-.31-.52-.65-1.01-1.04-1.46l1.41-1.4-1.39-1.39-1.45 1.44c-.5-.38-1-.67-1.49-.86-.83-.32-1.6-.42-2.31-.27-.71.14-1.33.48-1.86 1-.62.62-.96 1.28-1.01 1.96-.05.69.07 1.34.34 1.96.21.47.49 1.02.86 1.65.11.2.24.41.37.62.26.43.48.81.65 1.13.09.16.16.3.23.43.2.4.3.78.32 1.15.02.37-.11.69-.38.96-.37.37-.85.49-1.42.37-.35-.08-.73-.26-1.13-.55-.25-.19-.52-.42-.79-.69a7.8 7.8 0 0 1-.6-.69c-.31-.4-.57-.84-.8-1.31-.37-.76-.59-1.49-.67-2.19l-1.98.75c.05.74.31 1.56.78 2.45.33.63.73 1.21 1.19 1.76l-1.42 1.41 1.39 1.39 1.43-1.42c.57.47 1.14.81 1.71 1.04.83.33 1.6.42 2.31.28.71-.14 1.33-.47 1.85-.99.62-.61.95-1.26.99-1.94Z"
          />
        </g>

        <g id="cash-left">
          <path
            className="cls-6"
            transform="rotate(-63.6 27.205 92.339)"
            d="M-1.27 76.1h56.94v32.47H-1.27z"
          />

          <path
            className="cls-9"
            d="m28.21 62.92 21.8 10.82c-.08 1.16.3 2.32 1.08 3.2l-21.7 43.72c-1.16-.08-2.32.3-3.2 1.08l-21.8-10.82c.08-1.16-.3-2.32-1.08-3.2L25.01 64c1.16.08 2.32-.3 3.2-1.08Z"
          />

          <circle className="cls-3" cx={27.2} cy={92.33} r={12.42} />

          <path
            className="cls-9"
            d="M29.92 88.71c-.63.17-1.18.47-1.67.91-.42.38-.89.87-1.4 1.48-.08.1-.17.19-.25.3-.41.48-.75.86-1.03 1.15l-.11.11c-.3.3-.61.51-.93.64-.32.13-.65.11-.97-.05-.46-.23-.74-.63-.82-1.17-.04-.27-.02-.58.07-.92.08-.35.23-.73.45-1.16.09-.19.2-.37.31-.55.2-.31.44-.62.71-.91.42-.47.91-.88 1.45-1.23l-1.31-1.49c-.57.33-1.11.78-1.62 1.37-.38.43-.71.89-1 1.38l-1.68-.84-.84 1.67 1.74.87c-.19.56-.3 1.1-.33 1.61-.04.84.11 1.56.45 2.16.34.6.83 1.06 1.46 1.37.75.37 1.44.48 2.07.32.63-.17 1.19-.46 1.66-.9.36-.33.77-.75 1.23-1.27.15-.16.3-.34.45-.52.31-.37.58-.67.82-.93.11-.13.22-.24.32-.33.3-.3.61-.51.94-.64.33-.13.66-.11.98.05.45.22.7.61.76 1.17.04.34-.01.73-.16 1.18a6.676 6.676 0 0 1-.82 1.67c-.27.4-.58.77-.94 1.12-.57.56-1.16.98-1.77 1.26l1.28 1.56c.65-.27 1.31-.75 1.97-1.45.46-.49.87-1.02 1.23-1.6l1.7.85.84-1.67-1.71-.86c.25-.65.39-1.27.42-1.85.04-.85-.1-1.57-.44-2.17a3.37 3.37 0 0 0-1.45-1.37c-.74-.37-1.42-.47-2.05-.3Z"
          />
        </g>

        <path
          d="M78.59 30.84c0-14.58-11.82-26.4-26.4-26.4s-26.4 11.82-26.4 26.4 11.82 26.4 26.4 26.4c.47 0 .94-.01 1.4-.04l10.7 11.21V54.3c8.49-4.39 14.29-13.24 14.29-23.46Z"
          style={{
            fill: '#00ce62',
          }}
        />

        <path
          className="cls-2"
          d="M71.15 22.12 48.77 44.5 33.24 28.97l4.93-4.93 10.6 10.6 17.45-17.45 4.93 4.93z"
        />
      </g>
    </svg>
  );
}