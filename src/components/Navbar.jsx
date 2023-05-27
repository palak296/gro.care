import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 py-3">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-white text-2xl font-bold">YouTube Clone</h1>
                <div className="flex items-center mt-3 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        className="px-4 py-2 rounded-md mr-2 focus:outline-none bg-gray-800 text-gray-200"
                    />
                    <button className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold">
                        Search
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
