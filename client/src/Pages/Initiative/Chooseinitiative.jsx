import React from 'react';
import { Link } from 'react-router-dom';

function Chooseinitiative() {
  return (
    
    <div className="flex justify-center">
      <div style={{ marginTop: '50px' , padding:'30px'}}>
        <div className="relative h-[600px] w-[400px] rounded-md">
        
          <button className='h-[600px] w-[400px] hover:scale-105 transition-transform duration-300 hover:opacity-70' >
          <img
            src="/images/third.jpg"
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-4xl font-semibold text-white">Tree Planting</h1>
            <p className="mt-2 text-sm text-gray-300">
              Wanna initiate a tree planting initiative?
            </p>
            
          </div>
          </button>  
         
        </div>
        
      </div>

      <div style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px', padding:'30px' }}>
        <div className="relative h-[600px] w-[400px] rounded-md">
          <button className='h-[600px] w-[400px] hover:scale-105 transition-transform duration-300 hoover:opacity-70'>
          <img
            src="/images/first.jpg"
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-4xl font-semibold text-white">Clean Up</h1>
            <p className="mt-2 text-sm text-gray-300">
              Clean your nearest beach and other public places
            </p>
          </div>
      </button>

        </div>
        
      </div>

      <div style={{ marginTop: '50px' , padding:'30px'}}>
        <div className="relative h-[600px] w-[400px] rounded-md">
          <button className='h-[600px] w-[400px] hover:scale-105 transition-transform duration-300 hoover:opacity-70 '>
          <img
            src="/images/second.jpg"
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-4xl font-semibold text-white">Others</h1>
            <p className="mt-2 text-sm text-gray-300">
              Interested in other environment saving community programs? Create one
            </p>
            
          </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chooseinitiative;
