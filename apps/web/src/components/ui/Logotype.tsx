import type { SVGAttributes } from 'react';

const firstPath = 'M463.8,28.6c-8.7-9.9-20.7-14.7-35.6-14.7s-27,4.8-35.6,14.8c-8.3,9.4-12.3,21.6-12.3,36.8s4,27.2,12.3,36.6 c8.6,9.7,20.5,14.7,35.6,14.7s26.9-4.8,35.6-14.6c8.3-9.4,12.5-21.6,12.5-36.7S472.1,37.9,463.8,28.6L463.8,28.6z M452.6,93.2 c-5.7,6.8-13.9,10.3-24.4,10.3s-18.7-3.6-24.5-10.5c-5.5-6.8-8.3-15.9-8.3-27.5s2.8-20.8,8.3-27.6c5.8-7.2,14-10.7,24.5-10.7 s18.7,3.3,24.4,10.3c5.5,6.8,8.5,16.1,8.5,28S458.1,86.6,452.6,93.2z';
const secondPath = 'M545.8,13.2h-43.3v13.7h16v-0.1h26c7.8,0,13.5,1.5,17.1,4.4c3.7,2.6,5.6,7.3,5.6,13.8s-1.9,11.1-5.4,14 c-3.7,2.9-9.4,4.4-17.3,4.4h-26v-0.1h-16v54.4h16V76.9h27.1c25,0,37.6-10.7,37.6-32S570.7,13.1,545.8,13.2L545.8,13.2z';

export function Logotype(props: SVGAttributes<SVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 753 127.3" {...props}>
      <g>
        <path
          fill="#131B23"
          d={firstPath}
        />

        <rect fill="#131B23" x="420.7" y="55.9" width="15.1" height="15.1" />
      </g>

      <path fill="#131B23" d="M625.4,14.1v102.5h-15.5V14.1H625.4z" />

      <path
        fill="#131B23"
        d="M354,14.1v13.3h-34.1v89.1h-15.5V27.5H270V14.1H354L354,14.1z"
      />

      <path
        fill="#131B23"
        d={secondPath}
      />

      <g>
        <polygon
          fill="#131B23"
          points="712,12.1 695.8,12.1 735.5,118.6 753,118.6"
        />
        <polygon
          fill="#131B23"
          points="697.7,63.3 690,63.3 690,63.3 673.8,63.3 652.5,118.6 669.8,118.6 685,77.1 703.1,77.1"
        />
      </g>

      <path
        fill="#131B23"
        d="M174.7,12.5V77c0,9.3,2,16.1,6.4,20.6c4.4,4.5,11.2,6.8,20.6,6.8s16.1-2.3,20.5-6.8c4.2-4.5,6.4-11.3,6.4-20.6 V12.5h15.8v64.2c0,13.5-3.8,23.8-11.2,30.9c-7.4,7-17.9,10.6-31.5,10.6s-24.3-3.5-31.5-10.5c-7.6-7.3-11.3-17.6-11.3-31.1V12.5 H174.7L174.7,12.5z"
      />

      <g transform="translate(-15.060204,-14.510246)">
        <path
          fill="none"
          stroke="#131B23"
          strokeWidth={12}
          d="M136.7,79.9c0,31.8-25.8,57.7-57.7,57.7s-57.7-25.8-57.7-57.7c0-31.9,25.8-57.7,57.7-57.7l0,0
          C110.9,22.2,136.8,48,136.7,79.9L136.7,79.9z"
        />
        <path
          fill="none"
          stroke="#131B23"
          strokeWidth={12}
          d="M79.1,113.2c3.5,0,28.2-57.9,26.7-57.3c0,0-20.8,12.1-27.3,12C70.7,67.9,53.9,54,51.9,56
          C50,57.9,75.1,113.2,79.1,113.2C79.1,113.2,79.1,113.2,79.1,113.2z"
        />
      </g>
    </svg>
  );
}
