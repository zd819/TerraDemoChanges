import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/sleep.svg';
import EditMenu from '../EditMenu';
import localTime from '../../components/DataHandling/localTime.js';
import getDIffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function ImageSugg3(props) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-blue-50 rounded-sm">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {props.number==0 ? <img src={Icon} width="100" height="100" alt="Icon 01" />
        : (props.number==1 ? <img src={Icon} width="100" height="100" alt="Icon 01" /> :
                             <img src={Icon} width="100" height="100" alt="Icon 01" /> )}
        </header>
        <div className="flex items-start">
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div> */}
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">{props.sugg}</div>
      </div>
    </div>
  );
}

export default ImageSugg3;