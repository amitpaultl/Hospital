import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Load from './Load';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [load, setLoad] = useState(false)
    // usenavigate
    const navigate = useNavigate()

    // react query data fatch
    const url = `https://server-amitpaultl.vercel.app/getpresent`;
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

    // Delete
    const deleteHandel = (id) => {
        fetch(`https://server-amitpaultl.vercel.app/getpresent/${id}`, {
            method: 'DELETE',
            headers: {
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)

                refetch()
            })
    }



    // loading
    if (isLoading) {
        return <Load></Load>
    }



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
        fetch(`https://server-amitpaultl.vercel.app/present`, {
            method: 'PUT',
            headers: {

                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)
                refetch()
                setLoad(false)
                navigate('/')
            })
    }

    if (load) {
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
                                <button type='submit' className='submit mb-5'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mb-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Details</th>
                            <th>Address</th>
                            <th>Pin Code</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            patient?.data?.map(pat => <tr key={pat._id}>
                                <td>{pat?.name}</td>
                                <td>{pat?.contact}</td>
                                <td>{pat?.address}</td>
                                <td>{pat?.pincode}</td>
                                <td><Link to={`/update/${pat?._id}`} className='Update'>Update</Link></td>
                                <td><button onClick={() => deleteHandel(pat?._id)} className='Delete'>Delete</button></td>
                            </tr>)
                        }


                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Home;