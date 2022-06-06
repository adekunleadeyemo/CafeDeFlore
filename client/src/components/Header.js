import React from 'react';


function Header(props) {
    return (
        <div className='relative'>
            <div className=" fixed top-0 left-0 right-0  h-20 w-full bg-[#60a5fa] z-10">
            <h1 className="text-center py-5 px-5 text-2xl font-[sans]">Cafe de Flore</h1>
            </div>
        </div>
    );
}

export default Header;