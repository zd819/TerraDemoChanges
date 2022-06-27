import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon0 from '../../images/rest-nobg.svg';
import Icon1 from '../../images/meditation.svg';
import Icon2 from '../../images/calm.svg';
import Icon3 from '../../images/sleep.svg';
import Icon4 from '../../images/eat-more.svg';
import Icon5 from '../../images/goal-achieved.svg';
import EditMenu from '../EditMenu';
import localTime from '../../components/DataHandling/localTime.js';
import getDIffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function ImageSugg2(props) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-blue-50 rounded-sm">
      <div className="px-5 pt-5">
        <header className=" flex justify-between items-start mb-2 ">
          {/* Icon */}
          {props.number==0 ? <img src={Icon0} width="100" height="100" alt="Icon 0" />
        : (props.number==1 ? <img src={Icon1} width="100" height="100" alt="Icon 01" /> :
          (props.number==2 ? <img src={Icon2} width="100" height="100" alt="Icon 02" /> :
          (props.number==3 ? <img src={Icon3} width="100" height="100" alt="Icon 03" /> :
          (props.number==4 ? <img src={Icon4} width="100" height="100" alt="Icon 04" /> :
                             <img src={Icon5} width="100" height="100" alt="Icon 05" /> ))))}
        </header>
        <div className="flex items-start">
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div> */}
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">{props.sugg}</div>
      </div>
    </div>
  );
}

export default ImageSugg2;