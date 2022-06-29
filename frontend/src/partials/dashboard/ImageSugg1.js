import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon1 from '../../images/healthy-eating.svg';
import Icon0 from '../../images/portion-control.svg';
import Icon2 from '../../images/alcohol-balance.svg';
import Icon3 from '../../images/goal-achieved.svg';
import EditMenu from '../EditMenu';
import localTime from '../../components/DataHandling/localTime.js';
import getDIffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function ImageSugg1(props) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-2 xl:col-span-4 bg-blue-50 rounded-sm">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {props.number==0 ? <img src={Icon0} width="100" height="100" alt="Icon 0" />
        : (props.number==1 ? <img src={Icon1} width="100" height="100" alt="Icon 01" /> :
          (props.number==2 ? <img src={Icon2} width="100" height="100" alt="Icon 02" /> :
                             <img src={Icon3} width="100" height="100" alt="Icon 03" /> ))}
        </header>
        <div className="flex items-start">
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div> */}
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">{props.sugg == undefined ? null : props.sugg}</div>
      </div>
    </div>
  );
}

export default ImageSugg1;