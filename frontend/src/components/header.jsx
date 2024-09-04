import React from 'react'
import { Link} from 'react-router-dom';


const Header = () => {


  return (
    <div className="flex items-center justify-between p-4 bg-blue-400 text-white">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold mr-4">Accounting Website</Link>
      </div>

      <div className="flex items-center">
        
      </div>
    </div>
  );
};

export default Header