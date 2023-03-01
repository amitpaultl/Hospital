import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Add.css'
import Load from './Load';
const Add = () => {
    const [load, setLoad] = useState(false)
    // usenavigate
    const navigate = useNavigate()

    const handel = (e) => {

        e.preventDefault()
        setLoad(true)
        const name = e.target.name.value;
        const contact = e.target.contact.value;
        const address = e.target.address.value;
        const pincode = e.target.pincode.value;

        console.log(name, contact, address, pincode);
        const product = {
            name, contact, address, pincode
        }
        fetch(`http://localhost:5000/present`, {
            method: 'PUT',
            headers: {

                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)
                setLoad(false)
                navigate('/')
            })
    }

    if(load){
        return <Load></Load>
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-area">
                            <form onSubmit={handel}>
                                <div className="input-file">
                                    <input type="text" name='name' placeholder='Name' />
                                </div>
                                <div className="input-file">
                                    <input type="text" name='contact' placeholder='contact' />
                                </div>
                                <div className="input-file" >
                                    <input type="text" name='address' placeholder='Address' />
                                </div>
                                <div className="input-file">
                                    <input type="text" name='pincode' placeholder='Pin Code' />
                                </div>
                                <button type='submit' className='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;