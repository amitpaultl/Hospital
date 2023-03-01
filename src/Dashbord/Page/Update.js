import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Load from './Load';

const Update = () => {
    const [load, setLoad] = useState(false)
    // usenavigate
    const navigate = useNavigate()

    const { id } = useParams()
    const url = `http://localhost:5000/getpresent/${id}`;
    const { data: patient, isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const res = await fetch(url, {


                })
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })

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
        console.log(product);
        fetch(`http://localhost:5000/getpresent/${id}`, {
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


    if(isLoading){
        return <Load></Load>
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
                            <h2 className='text-center mb-3'> Edit  </h2>
                            <form onSubmit={handel}>
                                <div className="input-file">
                                    <input type="text" name='name' defaultValue={patient.name} placeholder='Name' />
                                </div>
                                <div className="input-file">
                                    <input type="text" name='contact' defaultValue={patient.contact} placeholder='contact' />
                                </div>
                                <div className="input-file" >
                                    <input type="text" name='address' defaultValue={patient.address} placeholder='Address' />
                                </div>
                                <div className="input-file">
                                    <input type="text" name='pincode' defaultValue={patient.pincode} placeholder='Pin Code' />
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

export default Update;