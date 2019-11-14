import React,{useContext,useEffect,useState} from 'react'
import { CustomerContext } from '../Contexts/Customer'
import { Table, Button, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from 'reactstrap';

function Customers() {
    const {customers, deleteCustomer, customer, getCustomer, updateCustomerx, createCustomerx} = useContext(CustomerContext)
    const [getCustomers, setGetCustomers] = useState([])
    const [getCustomerx, setGetCustomerx] = useState(null)
    const [viewCustomer, setviewCustomer] = useState(false)
    const [viewCustomerCreate, setviewCustomerCreate] = useState(false)
    const [updateCustomer, setupdateCustomer] = useState(null)

    // update
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [ic, setIc] = useState(0)

    useEffect(() => {
        const theCustomers = async () =>{
            setGetCustomers(customers)
        }
        theCustomers()
    }, [customers])

    useEffect(() => {
        const theCustomer = async () =>{
            if (customer !== []) {
                console.log(customer[0])
                setGetCustomerx(customer[0])
              
            }
        }
        theCustomer()
    }, [customer])

    useEffect(() => {
       if (getCustomerx) {
            setEmail(getCustomerx.email)
            setName(getCustomerx.name)
            setIc(getCustomerx.ic)
       }
    }, [getCustomerx])

    const deleteCustomerFn = (id) =>{
        deleteCustomer(id)
    }

    const viewCustomerFn = (id) => {
        setviewCustomer(!viewCustomer)
        getCustomer(id)
    }

    const updateCustomerFn = () => {
       
        setviewCustomer(!viewCustomer)
        setupdateCustomer(getCustomerx)
        setGetCustomerx(null)
    }

    const submitUpdateCustomerFn = (id) => {
        setupdateCustomer(null)
        setGetCustomerx(null)
        updateCustomerx(id,email,name,ic)
    }

    const submitCreateCustomerFn = () => {
        setupdateCustomer(null)
        setGetCustomerx(null)
        setviewCustomerCreate(!viewCustomerCreate)
        createCustomerx(email,name,ic)
    }
    return (
        <React.Fragment>
        {
            viewCustomerCreate === true ?
                <Form style={{margin:'10px'}}>
                    <h3>Create Customer</h3>
                    <ListGroupItem>
                        <FormGroup>
                            <Label style={{color:'#000000'}} for="email">Email</Label>
                            <Input type="email" onChange={(e)=>setEmail(e.target.value)} id="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{color:'#000000'}} for="name">Name</Label>
                            <Input type="name" onChange={(e)=>setName(e.target.value)} id="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{color:'#000000'}} for="IC">IC</Label>
                            <Input type="number" onChange={(e)=>setIc(e.target.value)} id="IC" />
                        </FormGroup>
                            <Button color="primary" onClick={()=>submitCreateCustomerFn()}>Submit</Button>
                    </ListGroupItem>
                </Form>
            :<Button style={{margin:'10px'}} color="primary" onClick={()=>setviewCustomerCreate(!viewCustomerCreate)}>Create Customer</Button>
        }
        {
            getCustomers && viewCustomer === false ?
                <Table bordered style={{backgroundColor:'#9b9b9b'}}>
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>IC</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getCustomers.map((val,ind) => {
                                return(
                                    <tr key={ind}>
                                        <th scope="row">{val.id}</th>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.ic}</td>
                                        <td>
                                            <Button color="danger" onClick={()=>deleteCustomerFn(val.id)}>Delete</Button>&nbsp;
                                            <Button color="primary" onClick={()=>viewCustomerFn(val.id)}>View</Button>
                                        </td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </Table>
            :<Button style={{margin:'10px'}} color="primary" onClick={()=>setviewCustomer(false)}>View Customers</Button>
        }
        {
            getCustomerx != null ?
                <ListGroup style={{margin:'10px'}}>
                    <ListGroupItem style={{color:'#000000'}} action>{getCustomerx.name}</ListGroupItem>
                    <ListGroupItem style={{color:'#000000'}}>{getCustomerx.email}</ListGroupItem>
                    <ListGroupItem style={{color:'#000000'}}>{getCustomerx.ic}</ListGroupItem>
                    <ListGroupItem style={{color:'#000000'}}>
                        <Button color="primary" onClick={()=>updateCustomerFn()}>Update</Button>
                    </ListGroupItem>
                </ListGroup>
            :''
        }
        {
            updateCustomer !== null ?
                <Form style={{margin:'10px'}}>
                    <h3>Update Customer</h3>
                    <ListGroupItem>
                        <FormGroup>
                            <Label style={{color:'#000000'}} for="email">Email</Label>
                            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{color:'#000000'}} for="name">Name</Label>
                            <Input type="name" value={name} onChange={(e)=>setName(e.target.value)} id="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{color:'#000000'}} for="IC">IC</Label>
                            <Input type="number" value={ic} onChange={(e)=>setIc(e.target.value)} id="IC" />
                        </FormGroup>
                            <Button color="primary" onClick={()=>submitUpdateCustomerFn(updateCustomer.id)}>Submit</Button>
                    </ListGroupItem>
                </Form>
            :''
        }
        </React.Fragment>
    )
}

export default Customers
