import React from 'react';
import loading from '../imge/Homeloading.gif'
const Load = () => {
    return (
        <div>
            <div className="loading text-center">
                <img src={loading} alt="" />
            </div>
        </div>
    );
};

export default Load;